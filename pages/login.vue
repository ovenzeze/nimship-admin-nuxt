<script setup lang="ts">
definePageMeta({
  layout: 'public',
  ssr: false
})

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useToast } from '~/components/ui/toast'

const supabase = useSupabaseClient()
const { toast } = useToast()
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const isSent = ref(false)
const countdown = ref(0)
const loginMethod = ref('password')
const agreedToTerms = ref(false)

const route = useRoute()

const loginMethods = [
  {
    id: 'magic-link',
    label: 'Sign in with Magic Link',
    altLabel: 'Sign in with Password',
    icon: 'ph:envelope-simple',
    altIcon: 'ph:lock-simple',
    action: signInWithMagicLink
  },
  {
    id: 'google',
    label: 'Sign in with Google',
    icon: 'ph:google-logo',
    action: signInWithGoogle
  },
  {
    id: 'github',
    label: 'Sign in with GitHub',
    icon: 'ph:github-logo',
    action: signInWithGithub
  }
]

const formSchema = toTypedSchema(z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
  agreedToTerms: z.boolean().refine(val => val === true, 'Please agree to the Terms of Service and Privacy Policy'),
}))

const { handleSubmit, values } = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    password: '',
    agreedToTerms: false,
  },
})

const onSubmit = handleSubmit(async (formValues) => {
  email.value = formValues.email || ''
  password.value = formValues.password || ''
  agreedToTerms.value = formValues.agreedToTerms
  await signIn()
})

async function signInWithPassword() {
  if (!password.value) {
    toast({ title: 'Error', description: 'Please enter your password', variant: 'destructive' })
    return
  }
  isLoading.value = true
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  handleSignInResult(error)
}

async function signInWithMagicLink() {
  isLoading.value = true
  const { error } = await supabase.auth.signInWithOtp({ 
    email: email.value, 
    options: { emailRedirectTo: '/confirm' }
  })
  handleSignInResult(error, true)
}

async function signInWithGoogle() {
  isLoading.value = true
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
  handleSignInResult(error)
}

async function signInWithGithub() {
  isLoading.value = true
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
  handleSignInResult(error)
}

function handleSignInResult(error: any, isMagicLink = false) {
  isLoading.value = false
  if (error) {
    toast({ title: 'Error', description: 'An error occurred during sign in. Please try again.', variant: 'destructive' })
    console.error(error)
  } else if (isMagicLink) {
    toast({ title: 'Email Sent', description: 'Please check your inbox and click the login link to complete sign in.' })
    isSent.value = true
    startCountdown()
  } else {
    toast({ title: 'Success', description: 'You have successfully signed in.' })
    navigateTo('/')
  }
}

const isLoginButtonDisabled = computed(() => {
  if (isLoading.value) return true
  if (!values.agreedToTerms) return true
  if (loginMethod.value === 'password' && !values.password) return true
  if (!values.email) return true
  return false
})

const signIn = async () => {
  if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    toast({ title: 'Error', description: 'Please enter a valid email address', variant: 'destructive' })
    return
  }

  if (!values.agreedToTerms) {
    toast({ title: 'Error', description: 'Please agree to the Terms of Service and Privacy Policy', variant: 'destructive' })
    return
  }

  const cookieName = useRuntimeConfig().public.supabase.cookieName
  useCookie(`${cookieName}-redirect-path`).value = route.query.redirect as string || '/'

  const method = loginMethods.find(m => m.id === loginMethod.value)
  if (method) {
    await method.action()
  }
}

const startCountdown = () => {
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value === 0) {
      clearInterval(timer)
    }
  }, 1000)
}

const resendEmail = () => {
  isSent.value = false
  signIn()
}

const navigateToTerms = () => {
  navigateTo('/terms')
}

const navigateToPrivacy = () => {
  navigateTo('/privacy')
}
</script>

<template>
  <div class="flex min-h-screen w-full items-center justify-center bg-gradient-to-r from-indigo-200 to-yellow-100 p-4">
    <Card class="w-full max-w-md bg-white rounded-lg shadow-md">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl font-bold text-center">NIMSHIP</CardTitle>
        <CardDescription class="text-center">
          {{ isSent ? 'Check your email' : 'Sign in to your account' }}
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <form @submit="onSubmit" class="space-y-4">
          <FormField v-slot="{ value, handleChange, errorMessage }" name="email">
            <FormItem>
              <FormControl>
                <div class="relative">
                  <Input :value="value" @input="handleChange" type="email" placeholder="Email" required />
                  <Icon name="ph:envelope-simple" class="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </FormControl>
              <FormMessage>{{ errorMessage }}</FormMessage>
            </FormItem>
          </FormField>

          <FormField v-if="!isSent && loginMethod === 'password'" v-slot="{ value, handleChange, errorMessage }" name="password">
            <FormItem>
              <FormControl>
                <div class="relative">
                  <Input :value="value" @input="handleChange" type="password" placeholder="Password" required />
                  <Icon name="ph:lock-simple" class="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </FormControl>
              <FormMessage>{{ errorMessage }}</FormMessage>
            </FormItem>
          </FormField>

          <div v-if="isSent" class="text-center text-sm text-gray-600">
            <p class="mb-2">We've sent a login link to {{ email }}.</p>
            <p>Please check your inbox (including spam folder) and click the link to complete sign in.</p>
          </div>

          <FormField v-slot="{ value, handleChange, errorMessage }" name="agreedToTerms">
            <FormItem class="flex flex-row items-center justify-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox @update:checked="handleChange" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel class="text-sm">
                  I agree to the 
                  <NuxtLink to="/terms" target="_blank" class="text-blue-600 hover:underline cursor-pointer">Terms of Service</NuxtLink> 
                  and 
                  <NuxtLink to="/privacy" target="_blank" class="text-blue-600 hover:underline cursor-pointer">Privacy Policy</NuxtLink>
                </FormLabel>
              </div>
            </FormItem>
          </FormField>

          <Button type="submit" :disabled="isLoginButtonDisabled" class="w-full">
            <Icon v-if="isLoading" name="ph:spinner" class="mr-2 h-4 w-4 animate-spin" />
            {{ isLoading ? 'Signing in...' : (loginMethod === 'password' ? 'Sign in' : 'Send Magic Link') }}
          </Button>
        </form>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t"></span>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-white px-2 text-gray-500">Or</span>
          </div>
        </div>

        <div class="grid gap-2">
          <Button 
            v-for="method in loginMethods" 
            :key="method.id"
            @click="method.id === 'password' || method.id === 'magic-link' ? loginMethod = loginMethod === 'password' ? 'magic-link' : 'password' : method.action()"
            variant="outline" 
            class="w-full"
          >
            <Icon :name="method.id === loginMethod ? (method.altIcon ?? '') : (method.icon ?? '')" class="mr-2 h-4 w-4" />
            {{ method.id === loginMethod ? method.altLabel : method.label }}
          </Button>
        </div>
      </CardContent>
      <CardFooter v-if="isSent" class="flex justify-center">
        <Button @click="resendEmail" :disabled="countdown > 0" variant="link">
          {{ countdown > 0 ? `Resend email (${countdown}s)` : 'Resend email' }}
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>