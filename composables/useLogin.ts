import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useToast } from '~/components/ui/toast'
import { useRoute, useRouter, useRuntimeConfig, useCookie } from '#app'
import { useSupabaseUser, useSupabaseClient } from '#imports'

export const useLogin = () => {
    const { toast } = useToast()
    const email = ref('')
    const password = ref('')
    const isLoading = ref(false)
    const isSent = ref(false)
    const countdown = ref(0)
    const loginMethod = ref('password')
    const agreedToTerms = ref(false)
    const currentState = ref('default')

    const route = useRoute()
    const router = useRouter()

    const user = useSupabaseUser()
    const client = useSupabaseClient()

    const userInfo = computed(() => {
        if (!user.value) return 'Not logged in'
        return `ID: ${user.value.id}\nEmail: ${user.value.email}`
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

    const { handleSubmit, values, errors, validate, resetForm, meta } = useForm({
        validationSchema: formSchema,
        initialValues: {
            email: '',
            password: '',
            agreedToTerms: false,
        },
    })

    const debounce = (fn: Function, delay: number) => {
        let timeoutId: NodeJS.Timeout
        return (...args: any[]) => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => fn(...args), delay)
        }
    }

    const debouncedValidate = debounce(validate, 300)

    const onSubmit = handleSubmit(async (formValues: { email: string; password?: string; agreedToTerms: boolean }) => {
        const result = await validate()
        if (!result.valid) {
            // Display all validation errors
            Object.entries(result.errors).forEach(([field, error]) => {
                toast({ title: 'Validation Error', description: error as string, variant: 'destructive' })
            })
            return
        }

        email.value = formValues.email || ''
        password.value = formValues.password || ''
        agreedToTerms.value = formValues.agreedToTerms
        await signIn()
    })

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
        const { error } = await client.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })
        handleSignInResult(error)
    }

    async function signInWithGithub() {
        isLoading.value = true
        const { error } = await client.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })
        handleSignInResult(error)
    }

    function handleSignInResult(error: any, isMagicLink = false) {
        isLoading.value = false
        if (error) {
            console.error('Sign in error details:', error);
            toast({ title: 'Error', description: error.message || 'An error occurred during sign in. Please try again.', variant: 'destructive' })
            currentState.value = 'error'
        } else if (isMagicLink) {
            console.log('Magic link process completed successfully');
            toast({ title: 'Email Sent', description: 'Please check your inbox and click the login link to complete sign in.' })
            isSent.value = true
            startCountdown()
            currentState.value = 'magic-link-sent'
        } else {
            toast({ title: 'Success', description: 'You have successfully signed in.' })
            currentState.value = 'success'
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
        const { error } = await client.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        })
        handleSignInResult(error)
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

    const switchToEmailLogin = () => {
        currentState.value = 'default'
        loginMethod.value = 'magic-link'
        isSent.value = false
    }

    const validateField = (field: string) => {
        validate(field as any)
    }

    const isFieldTouched = (field: string): boolean => {
        return !!meta.value.touched[field as keyof typeof meta.value.touched]
    }

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
        switchToEmailLogin,
        validateField,
        isFieldTouched,
    }
}