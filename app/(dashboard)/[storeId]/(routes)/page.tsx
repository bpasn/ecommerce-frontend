import prismadb from '@/lib/prismadb.util'
import React from 'react'

interface DashboardPageProps {
  params: { storeId: string }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  })
  return (
    <div>
      dashboard
    </div>
  )
}

export default DashboardPage