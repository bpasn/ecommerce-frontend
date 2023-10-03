'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

type Props = {};

const Unauthorized = (props: Props) => {
  const search = useSearchParams()

  const message = search.get("message");
  return (
    <>
      <h1 className="text-xl">Access Denied</h1>
      {message && <div className="mb-4 text-red-500">{message}</div>}
    </>
  );
};

export default Unauthorized;