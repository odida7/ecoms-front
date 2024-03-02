'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { GiEmptyHourglass } from "react-icons/gi";
import AddProduct from './AddProduct';


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
            
                <div className='flex flex-col w-fit h-96 bg-gray-200 hover:shadow-md hover:shadow-gray-400 rounded'>
                <Link href={`/product/${product?._id}`} className='w-full h-72'>
                    <div className='w-full h-72'>
                        {product.image 
                        ? <Image src={product.image} alt='img' width={200} height={200} className='object-cover rounded w-auto h-auto'/>
                        : <GiEmptyHourglass className='bg-slate-300 text-gray-600 text-sm rounded w-56 h-64'/>
                        }
                        
                    </div>
                </Link>
                    <div className='flex flex-col w-full h-24 rounded-b bg-gray-300 p-1 px-2'>
                        <span className='text-gray-900 text-md'>{product.name}</span>

                        <span className='text-gray-700 text-md'>$ {' '} {product.price}</span>

                        <AddProduct product={product}/>
                    </div>
                    
                </div>
           
            

        </div>
      ))}
    </div>
  )
 

}
