<template>
    <div class="text-center space-y-4">
        <Icon name="ph:envelope-simple" class="w-16 h-16 mx-auto text-blue-500" />
        <p class="text-sm text-gray-600 pb-8">
            We've sent a login link to {{ email }}.
            Please check your inbox (including spam folder) and click the link to complete sign in.
        </p>
        <div class="space-y-2">
            <Button @click="signInWithMagicLink" :disabled="countdown > 0" variant="outline" class="w-full">
                <Icon name="ph:envelope-simple" class="mr-2 h-4 w-4" />
                {{ countdown > 0 ? `Resend email (${countdown}s)` : 'Resend email' }}
            </Button>
            <Button @click="switchToEmailLogin" variant="outline" class="w-full">
                <Icon name="ph:arrow-left" class="mr-2 h-4 w-4" />
                Use another email to login
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLogin } from '~/composables/useLogin'

const {
    email,
    countdown,
    signInWithMagicLink,
    switchToEmailLogin,
} = useLogin()
</script>