'use client'

import Image from 'next/image';
import React from 'react'
import { useSelector } from 'react-redux';

export default function page() {
   const cartItems = useSelector((state) => state.cart);
     console.log(cartItems)
  return (
    <div>
      {cartItems.map((item, i)=>(
        <div key={i} className='flex flex-row m-4 justify-between w-1/2'>
          <div className='flex flex-row p-2 items-center gap-3'>

           <Image src={item.image} width={249} height={249} alt='img' className='rounded w-20 h-20'/>
           
            <div className='flex flex-col p-2'>
            <span>{item.name}</span>
            <span>{item.price}</span>  
          </div>
          </div>
          

          <div className='flex flex-row p-2 items-center gap-3'>
            <button>-</button>
            <span>{item.qty}</span>
            <button>+</button>
          </div>
          
        </div>
      ))}
      
    </div>
  )
}
