<template>
  <div class="background-container">
    <div class="flex items-center justify-center min-h-screen bg-background">
      <Card class="w-full max-w-[370px] bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90">
        <CardHeader class="text-center">
          <CardTitle>Login Confirmation</CardTitle>
          <CardDescription>
            <template v-if="status === 'success'">
              Welcome, {{ email }}
            </template>
            <template v-else-if="status === 'error'">
              Verification failed
            </template>
            <template v-else>
              Verifying
            </template>
          </CardDescription>
          
        </CardHeader>

        <CardContent class="text-center">
          <div v-if="status === 'success'">
            <div class="flex justify-center mb-4">
              <LucideCheckCircle class="h-12 w-12 text-success animate-pulse" />
            </div>
            <p class="text-gray-500 mb-6">
              Redirecting to home in {{ redirectCountdown }} seconds
            </p>
            <Button class="w-full" @click="redirectToHome">
              Go to Home
              <LucideHome class="h-4 w-4 ml-2" />
            </Button>
          </div>
          <div v-else-if="status === 'error'">
            <div class="flex justify-center items-center mb-4">
              <LucideAlertTriangle class="h-12 w-12 text-destructive animate-pulse" />
            </div>
            <h5 class="text-gray-500">
              Verification failed. Please check your email link.
            </h5>
            <Button class="w-full mt-6" @click="redirectToHome">
              <LucideArrowLeft class="h-4 w-4 mr-2" />
              Return to Home
            </Button>
          </div>
          <div v-else>
            <div class="flex justify-center items-center mb-4">
              <LucideLoader class="h-8 w-8 text-primary animate-spin" />
            </div>
            <p class="text-gray-500 animate-pulse mt-4">Verifying login information</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast'

definePageMeta({ layout: 'public' })

const router = useRouter()
const route = useRoute()
const status = ref('pending')
const redirectCountdown = ref(5)
const email = ref('')
const user = useSupabaseUser()
const { toast } = useToast()
const supabase = useSupabaseClient()

// Get redirect path
const cookieName = useRuntimeConfig().public.supabase.cookieName
const redirectPath = useCookie(`${cookieName}-redirect-path`).value

// Verify user login status
const verifyLoginStatus = () => {
  if (user.value) {
    status.value = 'success'
    email.value = user.value.email || ''
    startRedirectCountdown()
    // Clear cookie
    useCookie(`${cookieName}-redirect-path`).value = null
    // Show success toast
    toast({ title: 'Login Successful', description: 'Welcome back!' })
  } else {
    status.value = 'error'
  }
}

let initialVerificationTimer: NodeJS.Timeout
let redirectTimer: NodeJS.Timeout

onMounted(async () => {
  // Listen for auth state changes
  const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      verifyLoginStatus()
    }
  })

  // Initial verification timer
  initialVerificationTimer = setTimeout(() => {
    if (status.value === 'pending') {
      status.value = 'error'
    }
  }, 3000)

  // Clean up the listener when the component is unmounted
  onUnmounted(() => {
    authListener.subscription.unsubscribe()
  })
})

const startRedirectCountdown = () => {
  redirectTimer = setInterval(() => {
    if (redirectCountdown.value > 0) {
      redirectCountdown.value--
    } else {
      clearInterval(redirectTimer)
      redirectToHome()
    }
  }, 1000)
}

const redirectToHome = () => {
  clearInterval(redirectTimer)
  router.push(redirectPath || '/')
}

onUnmounted(() => {
  clearInterval(redirectTimer)
  clearTimeout(initialVerificationTimer)
})
</script>

<style scoped>
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(-45deg, #f3e7e9, #e3eeff, #e3eeff, #f3e7e9);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Ensure content is above the background */
.flex {
  position: relative;
  z-index: 1;
}
</style>