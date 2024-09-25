<template>
    <form @submit.prevent="onSubmit" class="space-y-4">
        <FormField v-slot="{ errorMessage }" name="email">
            <FormItem>
                <FormControl>
                    <div class="relative">
                        <Input v-model="values.email" @blur="validateField('email')" type="email" placeholder="Email"
                            required autocomplete="email" />
                        <Icon name="ph:envelope-simple" class="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                </FormControl>
                <FormMessage v-if="errors.email && isFieldTouched('email')">{{ errors.email }}</FormMessage>
            </FormItem>
        </FormField>

        <FormField v-if="loginMethod === 'password' || currentState === 'password'" v-slot="{ errorMessage }"
            name="password">
            <FormItem>
                <FormControl>
                    <div class="relative">
                        <Input v-model="values.password" @blur="validateField('password')" type="password"
                            placeholder="Password" required autocomplete="current-password" />
                        <Icon name="ph:lock-simple" class="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                </FormControl>
                <FormMessage v-if="errors.password && isFieldTouched('password')">{{ errors.password }}</FormMessage>
            </FormItem>
        </FormField>

        <FormField v-slot="{ errorMessage }" name="agreedToTerms">
            <FormItem class="flex flex-row items-center justify-start space-x-2 space-y-0">
                <FormControl>
                    <Checkbox v-model="values.agreedToTerms" @update:modelValue="validateField('agreedToTerms')" />
                </FormControl>
                <div class="space-y-1 leading-none">
                    <FormLabel class="text-sm">
                        I agree to the
                        <NuxtLink to="/terms" target="_blank" class="text-blue-600 hover:underline cursor-pointer">Terms
                            of
                            Service</NuxtLink>
                        and
                        <NuxtLink to="/privacy" target="_blank" class="text-blue-600 hover:underline cursor-pointer">
                            Privacy
                            Policy</NuxtLink>
                    </FormLabel>
                </div>
            </FormItem>
            <FormMessage v-if="errors.agreedToTerms && isFieldTouched('agreedToTerms')">{{ errors.agreedToTerms }}
            </FormMessage>
        </FormField>

        <Button type="submit" variant="outline" class="w-full">
            <Icon v-if="isLoading" name="ph:spinner" class="mr-2 h-4 w-4 animate-spin" />
            <Icon v-else :name="loginMethod === 'password' ? 'ph:sign-in' : 'ph:envelope-simple'"
                class="mr-2 h-4 w-4" />
            {{ isLoading ? 'Signing in...' : (loginMethod === 'password' ? 'Sign in' : 'Send Magic Link') }}
        </Button>
    </form>

    <div class="relative my-10">
        <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t"></span>
        </div>
        <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-white px-2 text-gray-500">Or</span>
        </div>
    </div>

    <div class="grid gap-2">
        <Button v-for="method in loginMethods" :key="method.id"
            @click="method.id === 'password' || method.id === 'magic-link' ? loginMethod = loginMethod === 'password' ? 'magic-link' : 'password' : method.action()"
            variant="outline" class="w-full">
            <Icon :name="method.id === loginMethod ? (method.altIcon ?? '') : (method.icon ?? '')"
                class="mr-2 h-4 w-4" />
            {{ method.id === loginMethod ? method.altLabel : method.label }}
        </Button>
    </div>
</template>

<script setup lang="ts">
import { useLogin } from '~/composables/useLogin'

const {
    isLoading,
    loginMethod,
    currentState,
    values,
    errors,
    onSubmit,
    loginMethods,
    validateField,
    isFieldTouched,
} = useLogin()
</script>