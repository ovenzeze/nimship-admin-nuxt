<template>
  <div class="flex items-center justify-center min-h-screen bg-background">
    <Card class="w-[350px] border-gray-100">
      <CardHeader>
        <CardTitle>Email Login</CardTitle>
        <CardDescription>Please check your inbox</CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="status === 'waiting'">
          <div class="flex justify-center mb-4">
            <LucideVoicemail class="h-12 w-12 text-primary" />
          </div>
          <Typography variant="h4" class="text-center mb-2">
            Email sent to {{ email }}
          </Typography>
          <Alert variant="default" class="mb-4">
            <AlertTitle>Tip</AlertTitle>
            <AlertDescription>
              If not received, please check your spam folder
            </AlertDescription>
          </Alert>
          <Button class="w-full" :disabled="countdown > 0" @click="resendEmail">
            Resend {{ countdown > 0 ? `(${countdown}s)` : '' }}
          </Button>
        </div>
        <div v-else-if="status === 'confirm'">
          <div class="flex justify-center mb-4">
            <LucideCheckCircle class="h-12 w-12 text-success" />
          </div>
          <Typography variant="h4" class="text-center mb-2">
            Verification Successful
          </Typography>
          <Alert variant="success" class="mb-4">
            <AlertDescription>
              Redirecting to homepage in {{ redirectCountdown }}s
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'nuxt/app'
import { useToast } from '@/components/ui/toast/use-toast'

definePageMeta({ layout: 'public' })


const router = useRouter()
const status = ref('waiting')
const countdown = ref(60)
const redirectCountdown = ref(3)
const email = ref('user@example.com') // Replace with actual email
const user = useSupabaseUser()


// Get redirect path from cookies
const cookieName = useRuntimeConfig().public.supabase.cookieName
const redirectPath = useCookie(`${cookieName}-redirect-path`).value

watch(user, () => {
  if (user.value) {
      // Clear cookie
      useCookie(`${cookieName}-redirect-path`).value = null
      // Redirect to path
      return navigateTo(redirectPath || '/'); 
  }
}, { immediate: true })

let countdownTimer: NodeJS.Timeout
let redirectTimer: NodeJS.Timeout

const startCountdown = () => {
  countdown.value = 60
  countdownTimer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(countdownTimer)
    }
  }, 1000)
}

const resendEmail = () => {
  // Logic to resend email
  startCountdown()
}

const startRedirectCountdown = () => {
  redirectTimer = setInterval(() => {
    if (redirectCountdown.value > 0) {
      redirectCountdown.value--
    } else {
      clearInterval(redirectTimer)
      router.push('/') // Redirect to homepage
    }
  }, 1000)
}

const simulateConfirmation = () => {
  setTimeout(() => {
    status.value = 'confirm'
    startRedirectCountdown()
  }, 5000) // Simulate confirmation after 5 seconds
}

onMounted(() => {
  startCountdown()
  simulateConfirmation() // For demonstration purposes
})

onUnmounted(() => {
  clearInterval(countdownTimer)
  clearInterval(redirectTimer)
})
</script>

