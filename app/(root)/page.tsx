'use client';
import { useStoreModal } from '@/hooks/use-store-modal';
import React, { useEffect } from 'react'

export default function MyApp(){
  const onOpen:() => void = useStoreModal(state => state.onOpen);
  const isOpen: boolean = useStoreModal(state => state.isOpen);
  
  useEffect(() => {
    if(!isOpen){
      onOpen()
    }
  },[onOpen,isOpen])
  
  return (
    <div>
     root page
    </div>
  );
}