'use client';
import Link from 'next/link';
import {  useSearchParams } from 'next/navigation';
import React from 'react';


const Unauthorized = () => {
  const search = useSearchParams();

  const message = search.get("message");
  return (
    <div className='flex flex-col gap-4 items-center justify-center h-full'>
      <h1 className="text-5xl">Access Denied</h1>
      {message && <div className="mb-4 text-red-500 text-md">
        {message} <Link href={"/"} className="underline text-black">Go to home page</Link>

      </div>}
    </div>
  );
};

export default Unauthorized;