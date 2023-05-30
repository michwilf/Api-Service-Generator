"use client"

import { FC, useState } from 'react'
import Button from './ui/Button'
import { signOut } from 'next-auth/react'
import { toast } from '@/ui/Toast'
import { redirect } from 'next/navigation'

interface SignOutButtonProps {
  
}

const SignOutButton: FC<SignOutButtonProps> = ({ }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const signInWithGoogle = async () => {
        setIsLoading(true)
        try {
            await signOut()
            
        } catch (error) {
            toast({
                title: 'Error',
                message: 'An error occurred while signing out',
                type: 'error',
            })
        }
    }

    return (
        <Button isLoading={isLoading} onClick={signInWithGoogle}>
            Sign Out
        </Button>
  )
}

export default SignOutButton