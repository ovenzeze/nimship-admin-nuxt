<template>
  <div class="background-container">
    <div class="flex items-center justify-center min-h-screen bg-background">
      <Card class="w-full max-w-[370px] bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90">
        <CardHeader class="text-center">
          <CardTitle>Login Confirmation</CardTitle>
          <CardDescription>{{ status === 'success' ? 'Login Successful' : 'Verification Failed' }}</CardDescription>
        </CardHeader>
        <CardContent class="text-center">
          <div v-if="status === 'success'">
            <div class="flex justify-center mb-4">
              <LucideCheckCircle class="h-12 w-12 text-success animate-bounce" />
            </div>
            <Typography variant="h4" class="mb-2">
              Logged in as {{ email }}
            </Typography>
            <Alert variant="success" class="mb-4">
              <AlertDescription>
                Redirecting to homepage in {{ redirectCountdown }} seconds
              </AlertDescription>
            </Alert>
            <Button class="w-full animate-pulse" @click="redirectToHome">Redirect Now</Button>
          </div>
          <div v-else>
            <div class="flex justify-center items-center mb-4">
              <LucideAlertTriangle class="h-12 w-12 text-destructive animate-pulse" />
            </div>
            <!-- <Alert variant="destructive" class="mb-6"> -->
            <h5  class="text-gray-500">
                Invalid url. Please check your email link.
            </h5>
            <!-- </Alert> -->
            <Button class="w-full mt-6" @click="redirectToHome">Return to Homepage</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'nuxt/app'
import { useToast } from '@/components/ui/toast/use-toast'
import { LucideCheckCircle, LucideAlertTriangle } from 'lucide-vue-next'

definePageMeta({ layout: 'public' })

const router = useRouter()
const route = useRoute()
const status = ref('error')
const redirectCountdown = ref(5)
const email = ref('')
const user = useSupabaseUser()

// 获取重定向路径
const cookieName = useRuntimeConfig().public.supabase.cookieName
const redirectPath = useCookie(`${cookieName}-redirect-path`).value

// 验证 URL 参数
onMounted(async () => {
  const token = route.query.token as string
  if (token) {
    try {
      // 这里应该调用 Supabase 或者您的后端 API 来验证 token
      // 以下是一个模拟的验证过程
      const { data, error } = await useAsyncData('verifyToken', () => 
        Promise.resolve({ user: { email: 'user@example.com' } })
      )
      
      if (data.value && data.value.user) {
        status.value = 'success'
        email.value = data.value.user.email
        startRedirectCountdown()
      } else {
        status.value = 'error'
      }
    } catch (error) {
      status.value = 'error'
    }
  } else {
    status.value = 'error'
  }
})

let redirectTimer: NodeJS.Timeout

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
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
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

/* 确保内容在背景之上 */
.flex {
  position: relative;
  z-index: 1;
}
</style>