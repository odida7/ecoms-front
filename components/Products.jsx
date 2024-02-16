'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { GiEmptyHourglass } from "react-icons/gi";

export default function Products() {

    const [products, setProducts] = useState([]);

    
    useEffect(()=>{
        const fetchProducts= async()=>{
            try{
                const res = await fetch('/api/product')
                const data = await res.json();
                console.log(data)
                setProducts(data)
            }catch (error) {
                console.error('Error fetching products:', error.message);
            } 
            
        }
        fetchProducts();
    }, [])

  

  return (
    <div className='grid grid-flow-row grid-cols-4 gap-6 py-4 px-12'>
      {products.map((product)=>(
        <div key={product.id} className='flex flex-col items-center justify-center'>
            <Link href={`/product/${product?._id}`}>
                <div className='flex flex-col justify-between w-fit h-96 bg-gray-200 hover:shadow-md hover:shadow-gray-400 rounded'>
                    <div className='w-full h-72'>
                        {product.image 
                        ? <Image src={product.image} alt='img' width={200} height={200} className='object-cover rounded w-auto h-auto'/>
                        : <GiEmptyHourglass className='bg-slate-300 text-gray-600 text-sm rounded w-56 h-64'/>
                        }
                        
                    </div>

                    <div className='flex flex-col bg-gray-200'>
                    <span className='p-1 text-gray-900 text-lg font-semibold'>{product.name}</span>
                    <span className='p-1 text-gray-700 text-lg font-semibold'>$ {' '} {product.price}</span>
                    </div>
                    
                </div>
            </Link>
            

        </div>
      ))}
    </div>
  )
}
