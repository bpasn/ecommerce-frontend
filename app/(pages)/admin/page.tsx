'use client';
import { useStoreModal } from '@/hooks/useStoreModel'
import React, { useEffect } from 'react'

type Props = {}

const AdminRootPage = (props: Props) => {

  // const onOpen = useStoreModal((state) => state.onOpen);
  // const isOpen = useStoreModal(s => s.isOpen);

  // useEffect(() => {
  //   if (!isOpen) onOpen();
  // }, []);

  return (
    <div>This will be the Admin Page</div>
  )
}

export default AdminRootPage