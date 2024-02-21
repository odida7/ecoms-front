'use client'

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { GiEmptyHourglass } from "react-icons/gi";


export default function page({params}) {
    const id = params?.id;
    const { data: session, status } = useSession();
    const router = useRouter();
    const [products, setProducts] = useState();

    if (status === 'unauthenticated') {
    router.push('/login');
    }

    
   useEffect(()=>{
        const fetchProducts= async()=>{
            try{
                const res = await fetch(`/api/product/${id}`)
                const data = await res.json();
                console.log('product:',data)
                setProducts(data)
            }catch (error) {
                console.error('Error fetching products:', error.message);
            } 
            
        }
        fetchProducts();
    }, [])


  return (
    <div className='p-4 flex flex-row items-center justify-center'>
     
        <div className='flex flex-col w-1/2 items-center justify-center'>
                <div>
                    {products?.image 
                    ? <Image src={products?.image} alt='img' width={200} height={200} className='object-cover rounded-t w-auto h-auto'/>
                    : <GiEmptyHourglass className='bg-slate-300 text-gray-600 text-sm rounded w-56 h-64'/>
                    }
                    
                </div>
  
                <div className='flex flex-col'>
                    <span className='p-1 text-gray-900 text-lg font-semibold'>{products?.name}</span>
                    <span className='p-1 text-gray-700 text-lg font-semibold'>$ {' '} {products?.price}</span>
                    <span className='p-1 text-gray-700 text-lg font-semibold'>{products?.desc}</span>
                </div>
        
        </div>

        <div className='flex flex-col w-1/2 items-center justify-center gap-4 p-2'>
            <button className='p-2 border border-blue-400 hover:border-none hover:bg-gray-200 w-1/2 rounded text-gray-700'>Add to cart</button>

            <Link href={'/'} className='w-full flex items-center justify-center'>
            <button className='p-2 bg-blue-400 hover:bg-gray-200 w-1/2 rounded text-white hover:text-gray-700'>
                Continue shopping
            </button>
            </Link>
        </div>
    </div>
  )
}
