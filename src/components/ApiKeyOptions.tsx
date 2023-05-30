"use client"

import { FC, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/ui/DropdownMenu'
import Button from '@/ui/Button'
import { Loader2 } from 'lucide-react'
import { toast } from '@/ui/Toast'
import { useRouter } from 'next/navigation'
import { createApiKey } from '@/helpers/create-api-key'
import { revokeApiKey } from '@/helpers/revoke-api-key'

interface ApiKeyOptionsProps {
    apiKeyId: string
    apiKeyKey: string
}

const ApiKeyOptions: FC<ApiKeyOptionsProps> = ({apiKeyId, apiKeyKey }) => {
    const [isCreatingNewKey, setIsCreatingNewKey] = useState(false)
    const [isRevoking, setIsRevoking] = useState(false)
    const router = useRouter()

    const createNewApiKey = async () => {
        setIsCreatingNewKey(true)

        try {
            await revokeApiKey({ keyId: apiKeyId })
            await createApiKey()
            router.refresh()
        } catch (error) {
            toast({
                title: 'Error',
                message: 'An error occurred while creating a new API key',
                type: 'error',
                })
        } finally {
            setIsCreatingNewKey(false)
        }
    }

    const revokeCurrentApiKey = async () => {
        setIsRevoking(true)

        try {
            await revokeApiKey({ keyId: apiKeyId })
            router.refresh()
        } catch (error) {
            toast({
                title: 'Error revoking api ket',
                message: 'An error occurred while revoking the API key',
                type: 'error',
                })
        } finally {
            setIsCreatingNewKey(false)
        }
    }

    return <DropdownMenu>
        <DropdownMenuTrigger disabled={isRevoking || isCreatingNewKey} asChild>
            <Button variant='ghost' className="flex gap-2 items-center">
                <p>
                    {isCreatingNewKey ? 'Creating new key' : isRevoking ? 'Revoking key' : 'Options'}
                </p>
                {isCreatingNewKey || isRevoking ? <Loader2 /> : null}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem onClick={() => {
                navigator.clipboard.writeText(apiKeyKey)

                toast({
                    title: 'Copied to clipboard',
                    message: 'API key copied to clipboard',
                    type: 'success',
                })
            }}>
                Copy 
            </DropdownMenuItem>
            <DropdownMenuItem onClick={createNewApiKey}> Create new key </DropdownMenuItem>
            <DropdownMenuItem onClick={revokeCurrentApiKey}>Revoke Key</DropdownMenuItem>
        </DropdownMenuContent>
  </DropdownMenu>
}

export default ApiKeyOptions