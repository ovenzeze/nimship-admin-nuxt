<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'
import { ref, computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useToast } from '~/components/ui/toast'
import { useRouter, useRoute } from 'vue-router'

definePageMeta({
  layout: 'public',
})

const config = useRuntimeConfig()
const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey)
const { toast } = useToast()
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const isSent = ref(false)
const countdown = ref(0)
const loginMethod = ref('password')
const agreedToTerms = ref(false)

const route = useRoute()
const router = useRouter()

const user = ref(null)
const fetchUser = async () => {
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  user.value = currentUser
}
fetchUser()

const userInfo = computed(() => {
  if (!user.value) return 'Not logged in'
  return `ID: ${user.value.id}\nEmail: ${user.value.email}`
})

console.log(user.value)

watch(user, (newValue) => {
  console.log(newValue)
})

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

const onSubmit = handleSubmit(async (formValues: { email: string; password?: string; agreedToTerms: boolean }) => {
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
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  handleSignInResult(error)
}

async function signInWithMagicLink() {
  isLoading.value = true;

  try {
    // Add logs
    console.log('Attempting to send magic link to:', email.value);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: { emailRedirectTo: `${window.location.origin}/confirm` },
    });

    // Add more logs
    if (error) {
      console.error('Error sending magic link:', error);
    } else {
      console.log('Magic link sent successfully');
    }

    handleSignInResult(error, true);
  } catch (error) {
    console.error('An error occurred during sign in:', error);
    handleSignInResult(error, true);
  } finally {
    isLoading.value = false;
  }
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
  if (devMode.value) {
    return
  }
  
  isLoading.value = false
  if (error) {
    // Add more detailed error logs
    console.error('Sign in error details:', error);
    toast({ title: 'Error', description: error.message || 'An error occurred during sign in. Please try again.', variant: 'destructive' })
    currentState.value = 'error'
  } else if (isMagicLink) {
    // Add success logs
    console.log('Magic link process completed successfully');
    toast({ title: 'Email Sent', description: 'Please check your inbox and click the login link to complete sign in.' })
    isSent.value = true
    startCountdown()
    currentState.value = 'magic-link-sent'
  } else {
    toast({ title: 'Success', description: 'You have successfully signed in.' })
    currentState.value = 'success'
    navigateTo('/')
  }
}

const signIn = async () => {
  if (devMode.value) {
    currentState.value = 'loading'
    setTimeout(() => {
      if (loginMethod.value === 'password') {
        currentState.value = 'success'
      } else {
        currentState.value = 'magic-link-sent'
      }
    }, 1000)
    return
  }

  // Validate email
  if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    toast({ title: 'Error', description: 'Please enter a valid email address', variant: 'destructive' })
    return
  }

  // Validate terms agreement
  if (!values.agreedToTerms) {
    toast({ title: 'Error', description: 'Please agree to the Terms of Service and Privacy Policy', variant: 'destructive' })
    return
  }

  // If password login, validate password
  if (loginMethod.value === 'password' && !values.password) {
    toast({ title: 'Error', description: 'Please enter your password', variant: 'destructive' })
    return
  }

  const cookieName = useRuntimeConfig().public.supabase.cookieName
  const redirectPath = route.query.redirect as string || '/'
  useCookie<string>(`${cookieName}-redirect-path`).value = redirectPath

  const method = loginMethods.find(m => m.id === loginMethod.value)
  
  if (method) {
    if (method.id === 'password') {
      await signInWithPassword()
    } else {
      await method.action()
    }
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

const devMode = ref(process.env.NODE_ENV === 'development') 
const currentState = ref('default')

const states = [
  { value: 'default', label: 'Default login state', icon: 'ph:user' },
  { value: 'loading', label: 'Loading', icon: 'ph:spinner' },
  { value: 'magic-link-sent', label: 'Magic link sent', icon: 'ph:envelope-simple' },
  { value: 'password', label: 'Password login', icon: 'ph:lock-simple' },
  { value: 'error', label: 'Error state', icon: 'ph:x-circle' },
  { value: 'success', label: 'Login successful', icon: 'ph:check-circle' },
]

watch(currentState, (newState: string) => {
  switch (newState) {
    case 'loading':
      isLoading.value = true
      isSent.value = false
      break
    case 'magic-link-sent':
      isLoading.value = false
      isSent.value = true
      email.value = values.email || ''
      startCountdown()
      toast({ title: 'Email Sent', description: 'Please check your inbox and click the login link to complete sign in.' })
      break
    case 'password':
      loginMethod.value = 'password'
      isLoading.value = false
      isSent.value = false
      break
    case 'error':
      isLoading.value = false
      isSent.value = false
      toast({ title: 'Error', description: 'An error occurred during sign in. Please try again.', variant: 'destructive' })
      break
    case 'success':
      isLoading.value = false
      isSent.value = false
      toast({ title: 'Success', description: 'You have successfully signed in.' })
      break
    default:
      isLoading.value = false
      isSent.value = false
      loginMethod.value = 'password'
      break
  }
})

const switchToEmailLogin = () => {
  currentState.value = 'default'
  loginMethod.value = 'magic-link'
  isSent.value = false
}

watch(user, (newUser) => {
  if (newUser) {
    const redirectPath = route.query.redirect as string || '/'
    router.push(redirectPath)
  }
}, { immediate: true })

supabase.auth.onAuthStateChange((event, session) => {
  user.value = session?.user || null
})
</script>

<template>
  <ClientOnly> 
  <div class="flex min-h-screen w-full items-center justify-center bg-gradient-to-r from-indigo-200 to-yellow-100 p-4">

    <Card v-if="devMode" class="absolute top-4 right-4 z-10 w-64 scale-90 opacity-80">
      <CardHeader class="space-y-1">
        <CardTitle class="text-sm flex items-center text-gray-500">
          <Icon name="ph:code" class="w-4 h-4 mr-2" />  
          Development Mode
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select v-model="currentState">
          <SelectTrigger>
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="state in states" :key="state.value" :value="state.value">
              {{ state.label }}
            </SelectItem>
          </SelectContent>
        </Select>
        <pre class="text-xs mt-4 bg-gray-100 px-4 py-2 rounded overflow-auto max-h-32">{{ userInfo }}</pre>

      </CardContent>
    </Card>

    <Card v-if="!user || devMode" class="w-full max-w-md bg-white rounded-lg shadow-md">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl font-bold text-center">NIMSHIP</CardTitle>
        <CardDescription class="text-center">
          {{ isSent ? 'Check your email' : 'Sign in to your account' }}
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div v-if="currentState === 'magic-link-sent' || isSent" class="text-center space-y-4">
          <Icon name="ph:envelope-simple" class="w-16 h-16 mx-auto text-blue-500" />
          <p class="text-sm text-gray-600 pb-8">
            We've sent a login link to {{ email }}.
            Please check your inbox (including spam folder) and click the link to complete sign in.
          </p>
          <div class="space-y-2">
            <Button @click="resendEmail" :disabled="countdown > 0" variant="outline" class="w-full">
              <Icon name="ph:envelope-simple" class="mr-2 h-4 w-4" />
              {{ countdown > 0 ? `Resend email (${countdown}s)` : 'Resend email' }}
            </Button>
            <Button @click="switchToEmailLogin" variant="outline" class="w-full">
              <Icon name="ph:arrow-left" class="mr-2 h-4 w-4" />
              Use another email to login
            </Button>
          </div>
        </div>

        <form v-else @submit="onSubmit" class="space-y-4">
          <FormField v-slot="{ value, handleChange, errorMessage }" name="email">
            <FormItem>
              <FormControl>
                <div class="relative">
                  <Input :value="value" @input="handleChange" type="email" placeholder="Email" required autocomplete="email" />
                  <Icon name="ph:envelope-simple" class="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </FormControl>
              <FormMessage>{{ errorMessage }}</FormMessage>
            </FormItem>
          </FormField>

          <FormField v-if="!isSent && (loginMethod === 'password' || currentState === 'password')" v-slot="{ value, handleChange, errorMessage }" name="password">
            <FormItem>
              <FormControl>
                <div class="relative">
                  <Input :value="value" @input="handleChange" type="password" placeholder="Password" required autocomplete="current-password" />
                  <Icon name="ph:lock-simple" class="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </FormControl>
              <FormMessage>{{ errorMessage }}</FormMessage>
            </FormItem>
          </FormField>

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

          <Button type="submit" variant="outline" class="w-full" @click="signIn">
            <Icon v-if="isLoading || currentState === 'loading'" name="ph:spinner" class="mr-2 h-4 w-4 animate-spin" />
            <Icon v-else :name="loginMethod === 'password' ? 'ph:sign-in' : 'ph:envelope-simple'" class="mr-2 h-4 w-4" />
            {{ (isLoading || currentState === 'loading') ? 'Signing in...' : (loginMethod === 'password' ? 'Sign in' : 'Send Magic Link') }}
          </Button>
        </form>

        <div class="relative my-10" v-if="!isSent">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t"></span>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-white px-2 text-gray-500">Or</span>
          </div>
        </div>

        <div class="grid gap-2" v-if="!isSent">
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
    </Card>

    <Card v-else class="w-full max-w-md bg-white rounded-lg shadow-md">
      <CardContent class="space-y-4 text-center">
        <Icon name="ph:check-circle" class="w-16 h-16 mx-auto text-green-500" />
        <CardTitle>Logged In</CardTitle>
        <CardDescription>You are already logged in. Redirecting...</CardDescription>
      </CardContent>
    </Card>
  </div>
</ClientOnly>
</template>