import React from 'react'
import Link from 'next/link'

const nav = () => {
  return (
    <nav className=' w-full origin-center fixed  flex items-center justify-center'>
      <div className='flex gap-5 h-12 w-[99vw] items-center justify-start px-5 border-b-[1px] border-black'>
        <Link className='text-xl font-semibold' href={'/'} >Home</Link>
        <Link className='text-xl font-semibold' href={'/questions'}>Quiz</Link>
      </div>
    </nav> 
  )
}

export default nav