// useLogin.ts

import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useToast } from '~/components/ui/toast'
import { useRoute, useRouter, useRuntimeConfig, useCookie } from '#app'
import { useSupabaseClient } from '#imports'
import type { User } from '@supabase/supabase-js'

interface LoginFormValues {
    email: string;
    password?: string;
    agreedToTerms: boolean;
}

export const useLogin = () => {
    const { toast } = useToast()

    const email = ref('')
    const password = ref('')
    const isLoading = ref(false)
    const isSent = ref(false)
    const countdown = ref(0)
    const loginMethod = ref('magic-link')
    const agreedToTerms = ref(false)
    const currentState = ref('default')
    const magicLinkSentMessage = ref('')

    const route = useRoute()
    const router = useRouter()

    const user = ref<User | null>(null)
    const client = useSupabaseClient()

    const getAuthenticatedUser = async () => {
        try {
            const { data: { user }, error } = await client.auth.getUser()
            if (error) throw error
            return user
        } catch (error) {
            console.error('Error getting authenticated user:', error)
            return null
        }
    }

    const refreshUser = async () => {
        user.value = await getAuthenticatedUser()
    }

    const userInfo = computed(() => {
        if (!user.value) return 'Not logged in'
        return `ID: ${user.value.id}\nEmail: ${user.value.email}`
    })

    const isAuthenticated = computed(() => !!user.value)

    const getUserDisplayInfo = computed(() => {
        if (!user.value) return null
        return {
            name: user.value.user_metadata?.full_name || user.value.email?.split('@')[0] || 'User',
            id: user.value.id,
            avatar: user.value.user_metadata?.avatar_url || `https://api.dicebear.com/6.x/initials/svg?seed=${user.value.email}`
        }
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

    const formSchema = computed(() => {
        return toTypedSchema(z.object({
            email: z.string().email('Please enter a valid email address'),
            password: loginMethod.value === 'password'
                ? z.string().min(6, 'Password must be at least 6 characters long')
                : z.string().optional(),
            agreedToTerms: z.boolean().refine(val => val === true, 'Please agree to the Terms of Service and Privacy Policy'),
        }))
    })

    const { values, errors, validate, resetForm, meta } = useForm<LoginFormValues>({
        validationSchema: formSchema,
        initialValues: {
            email: '',
            password: '',
            agreedToTerms: false,
        },
    })

    const onSubmit = async () => {
        console.log('login onSubmit', values)
        const result = await validate()
        console.log('validate result', result)
        if (!result.valid) {
            // Display all validation errors
            Object.entries(result.errors).forEach(([field, error]) => {
                toast({ title: 'Validation Error', description: error as string, variant: 'destructive' })
            })
            return
        }

        email.value = values.email
        password.value = values.password || ''
        agreedToTerms.value = values.agreedToTerms
        await signIn()
    }

    async function signInWithMagicLink() {
        isLoading.value = true;
        try {
            console.log('Attempting to send magic link to:', email.value);
            const { error } = await client.auth.signInWithOtp({
                email: email.value,
                options: { emailRedirectTo: `${window.location.origin}/confirm` },
            });
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
        try {
            const { error } = await client.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`
                }
            })
            handleSignInResult(error)
        } catch (error) {
            console.error('An error occurred during Google sign in:', error);
            handleSignInResult(error)
        } finally {
            isLoading.value = false
        }
    }

    async function signInWithGithub() {
        isLoading.value = true
        try {
            const { error } = await client.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`
                }
            })
            handleSignInResult(error)
        } catch (error) {
            console.error('An error occurred during GitHub sign in:', error);
            handleSignInResult(error)
        } finally {
            isLoading.value = false
        }
    }

    function handleSignInResult(error: any, isMagicLink = false) {
        if (error) {
            console.error('Sign in error details:', error);
            toast({ title: 'Error', description: error.message || 'An error occurred during sign in. Please try again.', variant: 'destructive' })
            currentState.value = 'error'
        } else if (isMagicLink) {
            console.log('Magic link process completed successfully');
            magicLinkSentMessage.value = 'Please check your inbox and click the login link to complete sign in.'
            toast({ title: 'Email Sent', description: magicLinkSentMessage.value })
            isSent.value = true
            startCountdown()
            currentState.value = 'magic-link-sent'
        } else {
            toast({ title: 'Success', description: 'You have successfully signed in.' })
            currentState.value = 'success'
            refreshUser()
            router.push('/')
        }
    }

    const signIn = async () => {
        if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            toast({ title: 'Error', description: 'Please enter a valid email address', variant: 'destructive' })
            return
        }

        if (!values.agreedToTerms) {
            toast({ title: 'Error', description: 'Please agree to the Terms of Service and Privacy Policy', variant: 'destructive' })
            return
        }

        if (loginMethod.value === 'password' && !values.password) {
            toast({ title: 'Error', description: 'Please enter your password', variant: 'destructive' })
            return
        }

        const config = useRuntimeConfig()
        const cookieName = (config.public as any).supabase?.cookieName
        if (cookieName) {
            const redirectPath = route.query.redirect as string || '/'
            useCookie(cookieName + '-redirect-path').value = redirectPath
        }

        if (loginMethod.value === 'magic-link') {
            await signInWithMagicLink()
        } else if (loginMethod.value === 'password') {
            await signInWithPassword()
        } else {
            const method = loginMethods.find(m => m.id === loginMethod.value)
            if (method) {
                await method.action()
            }
        }
    }

    async function signInWithPassword() {
        if (!password.value) {
            toast({ title: 'Error', description: 'Please enter your password', variant: 'destructive' })
            return
        }
        isLoading.value = true
        try {
            const { error } = await client.auth.signInWithPassword({
                email: email.value,
                password: password.value,
            })
            handleSignInResult(error)
        } catch (error) {
            console.error('An error occurred during password sign in:', error);
            handleSignInResult(error)
        } finally {
            isLoading.value = false
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

    const switchLoginMethod = () => {
        loginMethod.value = loginMethod.value === 'magic-link' ? 'password' : 'magic-link'
        resetForm()
    }

    const validateField = (field: string) => {
        validate(field as any)
    }

    const isFieldTouched = (field: string): boolean => {
        return !!meta.value.touched[field as keyof typeof meta.value.touched]
    }

    const logout = async () => {
        try {
            await client.auth.signOut()
            user.value = null
            toast({ title: 'Success', description: 'You have been logged out.' })
            router.push('/login')
        } catch (error) {
            console.error('Error during logout:', error)
            toast({ title: 'Error', description: 'An error occurred during logout. Please try again.', variant: 'destructive' })
        }
    }

    // Initialize user on composable creation
    refreshUser()

    return {
        email,
        password,
        isLoading,
        isSent,
        countdown,
        loginMethod,
        agreedToTerms,
        currentState,
        user,
        userInfo,
        loginMethods,
        values,
        errors,
        onSubmit,
        signInWithMagicLink,
        signInWithGoogle,
        signInWithGithub,
        switchLoginMethod,
        validateField,
        isFieldTouched,
        magicLinkSentMessage,
        isAuthenticated,
        getAuthenticatedUser,
        refreshUser,
        getUserDisplayInfo,
        logout,
    }
}
