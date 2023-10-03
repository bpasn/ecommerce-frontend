import React from 'react'
import BillboardClient from './componentx/client'

type Props = {}

const BillboardPage = (props: Props) => {
  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BillboardClient />
        </div>
    </div>
  )
}

export default BillboardPage