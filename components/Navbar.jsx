'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useContext } from 'react'

export default function Navbar() {

    const {data: session} = useSession()
  
    

  return (
    <div  className='flex flex-row items-center justify-between px-8 py-3 bg-blue-500 text-white'>

      <Link href='/'>
        <span className=''>
          <span className='text-4xl text-gray-900 font-medium'>e</span>
          <span className='text-2xl text-gray-700 font-bold'>.mark</span>
        </span> 
      </Link>
       
      <div className='flex flex-row items-center gap-3'>
        <span>{session?.user?._doc?.username}</span>

        <Link href='/cart' className='flex flex-row relative p-2'>
          <span>carts</span>
          <span className='bg-red-500 rounded-full absolute top-0 right-0 text-xs font-light w-auto h-auto'>0</span>
        </Link>

        <button onClick={signOut}>Logout</button>
      </div>
      
      
    </div>
  )
}
