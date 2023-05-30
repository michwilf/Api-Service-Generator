"use client"

import { FC, useState } from 'react'
import Button from './ui/Button'
import { signIn } from 'next-auth/react'
import { toast } from '@/ui/Toast'

interface SignInButtonProps {
  
}

const SignInButton: FC<SignInButtonProps> = ({ }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const signOutUser = async () => {
        setIsLoading(true)
        try {
            await signIn('google')
        } catch (error) {
            toast({
                title: 'Error',
                message: 'An error occurred while signing in',
                type: 'error',
            })
        }
    }

    return (
        <Button isLoading={isLoading} onClick={signOutUser}>
            Sign In
        </Button>
  )
}

export default SignInButton