'use client'

import { decrementQty, incrementQty, removeFromCart } from '@/app/redux/slice/cartSlice';
import { current } from '@reduxjs/toolkit';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

export default function page() {

  const dispatch = useDispatch();

   const cartItems = useSelector((state) => state.cart);
     console.log(cartItems)

     const totalPrice = cartItems.reduce((acc, currentItem) =>{
      return acc + (currentItem.price * currentItem.qty);
     }, 0);

     function handleDelete(cartId){
       dispatch(removeFromCart(cartId))
       toast.success('Item deleted successfully')
     }

     function handleInc(cartId){
       dispatch(incrementQty(cartId))
      
     }

     function handleDec(cartId){
       dispatch(decrementQty(cartId))
       
     }

  return (
    <div className=' flex flex-row items-center justify-center'>
      <div className='w-1/2 h-screen'>
         <h1 className='w-full p-2 flex justify-center text-xl text-gray-700 font-semibold'>Cart</h1>
          {cartItems.map((item, i)=>(
            <div key={i} className='flex flex-row m-4 justify-between'>
              <div className='flex flex-row p-2 items-center gap-3'>

              <Image src={item.image} width={249} height={249} alt='img' className='rounded w-20 h-20'/>
              
                <div className='flex flex-col p-2'>
                <span>{item.name}</span>
                <span>$ {item.price}</span>  
              </div>
              </div>
              

              <div className='flex flex-row items-center gap-3'>
                <button 
                 onClick={()=> handleDec(item._id)}
                 className='bg-gray-400 hover:bg-gray-100 rounded-md p-2'
                >
                  -
                </button>

                <span>{item.qty}</span>

                <button
                 onClick={()=> handleInc(item._id)}
                 className='bg-gray-400 hover:bg-gray-100 rounded-md p-2'
                 >
                  +
                </button>

                <button 
                className='px-4 bg-yellow-400 text-white hover:bg-red-500 rounded-md p-1'
                onClick={()=> handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
              
            </div>
              ))}           
      </div>

      <div className='h-screen py-8'>
        <div className="bg-white col-span-4 sm:block border border-gray-300 rounded-lg  dark:bg-gray-700 dark:border-gray-700 text-slate-800 overflow-hidden hidden p-5 dark:text-slate-100 font-bold">
          <h2 className="text-2xl pb-3">Cart total</h2>
          <div className="flex items-center justify-between border-b border-slate-500 pb-6">
            <span>Subtotal </span>
            <span>$ {totalPrice}</span>
          </div>
          <div className="flex items-center justify-between pb-4 mt-2">
            <span>Tax </span>
            <span>$0</span>
          </div>
          <div className="flex items-center justify-between pb-4">
            <span>Shipping </span>
            <span>$ 10</span>
          </div>
          <p className="border-b border-slate-500 pb-6 text-slate-400 font-normal">
            We only charge for shipping when you have over 2kg items
          </p>
          <div className="flex items-center justify-between py-4 font-bold">
            <span>Total </span>
            <span>$ {totalPrice}</span>
          </div>
          <Link
            href="/"
            className="bg-slate-200 text-slate-900 rounded-lg py-2 px-4 font-normal"
          >
            Continue to Payment
          </Link>
       </div>
      </div>
      

    </div>
    
  )
}
