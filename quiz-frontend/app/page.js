'use client';
import React, { useContext } from 'react';
import Link from 'next/link';


const Page = () => {
return (
    <>
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='h-[60vh] w-[40vw] rounded-xl bg-zinc-200 relative'>
            <h1 className='text-7xl font-bold capitalize absolute top-56 text-center left-1/2 w-full -translate-x-1/2 -translate-y-1/2'>the <span className='text-red-500'>Quiz</span>  App</h1>
          <Link href="/questions">
            <h1 className='text-3xl font-semibold px-6 py-3 bg-blue-500 rounded-lg text-white absolute -translate-x-1/2 -translate-y-1/2 top-80 left-1/2'>Start Quiz</h1>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;
