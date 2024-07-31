<script setup lang="ts">
// import { useToast } from '@/components/ui/toast/use-toast'
definePageMeta({ layout: 'public' })

const supabase = useSupabaseClient()
const toast = useToast()
const email = ref('')

const signInWithOtp = async () => {
  console.info('[signInWithOtp]', email.value)
  const { error } = await supabase.auth.signInWithOtp({ email: email.value, options: { emailRedirectTo: 'http://localhost:3000/confirm' }})
  if (error) {
    toast.toast({ title: 'Uh oh! Something went wrong.', description: 'There was a problem with your request.', variant: 'destructive' })
    console.log(error)
  }
}

</script>

<template>
  <div class="flex h-lvh w-full items-center flex-col justify-center content-center fixed bg-gradient-to-r from-indigo-200 to-yellow-100">
  <Card class="min-w-[400px] px-3 py-6 bg-white rounded-lg shadow-md">
    <CardHeader class="mb-4">
      <CardTitle class="text-2xl text-center mb-6">
        NIMSHIP
      </CardTitle>
      <CardDescription class="text-center">
        Enter your email below to login to your account.
      </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-4 mb-4">
      <div class="grid gap-2">
        <!-- <Label for="email">Email</Label> -->
        <Input v-model="email" id="email" type="email" placeholder="Email" required class="shadow-2xl"/>
      </div>
      <!-- <div class="grid gap-2">
        <Label for="password">Password</Label>
        <Input id="password" type="password" required />
      </div> -->
    </CardContent>
    <CardFooter>
      <Button @click="signInWithOtp" class="w-full cursor-pointer button-27">
       <!-- <Icon name="i-heroicons:arrow-right-circle" class="w-6 h-6 mr-2 text-red-500" /> -->
       <!-- <LucideVoicemail /> -->
        Sign in with email
      </Button>
    </CardFooter>
  </Card>
</div>
</template>
