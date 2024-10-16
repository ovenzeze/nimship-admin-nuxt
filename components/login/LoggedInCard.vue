<template>
    <Card class="w-full max-w-md rounded-lg shadow-md">
        <CardContent class="space-y-4 text-center">
            <Icon name="ph:check-circle" class="w-16 h-16 mx-auto text-green-500" />
            <CardTitle>Logged In</CardTitle>
            <CardDescription>You are already logged in. Redirecting...</CardDescription>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardTitle, CardDescription } from '~/components/ui/card'
</script>