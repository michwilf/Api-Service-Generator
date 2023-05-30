import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { formatDistance } from 'date-fns'
import LargeHeading from '@/ui/LargeHeading'
import Paragraph from './ui/Paragraph'
import { Input } from './ui/Input'
import Table from '@/ui/Table'
import ApiKeyOptions from '@/components/ApiKeyOptions'

const ApiDashboard = async () => {
  const user = await getServerSession(authOptions)
  
  if (!user) notFound()
  
  const apiKeys = await db.apiKey.findMany({
    where: { userId: user.user.id },
  })

  const activeApiKey = apiKeys.find((apiKey: { enabled: any }) => apiKey.enabled)

  if (!activeApiKey) notFound()

  const userRequests = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: apiKeys.map((key: { id: any }) => key.id),
      }
    },
  })

  const serializableRequests = userRequests.map((req: any) => ({
    ...req,
    timestamp: formatDistance(new Date(req.timestamp), new Date()),
  })
  )

  return <div className='container flex flex-col gap-6'>
    <LargeHeading>Welcome back,{' '}{user.user.name}</LargeHeading>
    <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
      <Paragraph>Your API key:</Paragraph>
      <Input className="w-fit truncate" readOnly value={activeApiKey.key} />
      {/* add options to create new / revoke  */}
      <ApiKeyOptions apiKeyId={activeApiKey.id} apiKeyKey={activeApiKey.key} />
    </div>
    <Paragraph className="text-center md:text-left mt-4 mb-4">Your API history:</Paragraph>
    <Table userRequests={serializableRequests}/>
  </div>
}

export default ApiDashboard