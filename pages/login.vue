<script setup lang="ts">
import { definePageMeta } from '#imports'
import { useLogin } from '~/composables/useLogin'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/components/ui/card'
import LoginForm from '~/components/login/LoginForm.vue'
import MagicLinkSent from '~/components/login/MagicLinkSent.vue'
import LoggedInCard from '~/components/login/LoggedInCard.vue'

definePageMeta({
  layout: 'public',
})

const { user, isSent, currentState } = useLogin()
</script>

<template>
  <div class="flex min-h-screen w-full items-center justify-center bg-gradient-to-r bg-background p-4">
    <Card v-if="!user" class="w-full max-w-md rounded-lg shadow-md">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl font-bold text-center">NIMSHIP</CardTitle>
        <CardDescription class="text-center">
          {{ isSent ? 'Check your email' : 'Sign in to your account' }}
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <MagicLinkSent v-if="currentState == 'magic-link-sent' || isSent" />
        <!-- <MagicLinkSent v-if="currentState == 'magic-link-sent' || isSent" /> -->

        <LoginForm v-else />
      </CardContent>
    </Card>

    <LoggedInCard v-else />
  </div>
</template>