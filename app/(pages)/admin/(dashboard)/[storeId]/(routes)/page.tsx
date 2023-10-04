'use client';
import { useParams } from 'next/navigation';
import React from 'react'

interface StorePageProps {
  
}

const StorePage: React.FC<StorePageProps> = () => {
  const params = useParams();
  console.log(params.storeId)
  return (
    <div>DashBoardPage : {params.storeId}</div>
  )
}

export default StorePage