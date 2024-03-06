'use client'

import { addToCart } from '@/lib/redux/slice/cartSlice';
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';


export default function AddProduct({product}) {
    const dispatch = useDispatch()
       

    function handleAddItemtoCart(){
        //const { _id, name, price, image, qty: '' } = product;
        dispatch(addToCart( product ))
        toast.success('Added successfully');
   }


  return (
    <div>
      <button
        onClick={() =>
          handleAddItemtoCart(product) 
        }
        className='p-1 bg-blue-400 hover:bg-gray-400 w-full flex justify-center rounded text-gray-100'>
        Add to cart
      </button>
      
    </div>
    
  )
}
