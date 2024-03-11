'use client'

import Success from '@/components/Success';
import { removeFromCart, decrementQty, incrementQty, clearCart } from '@/lib/redux/slice/cartSlice';
import { useSession } from 'next-auth/react';

//import { current } from '@reduxjs/toolkit';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

export default function page() {
  const {data: session} = useSession()
  const user = session?.user?._doc
 
  const router = useRouter();

  //const [products, setProducts] = useState([]);
  const [address, setAddress] = useState('');
  //const [email, setEmail] = useState('');
  //const [name, setName] = useState(''); 
  const [city, setCity] = useState('');   
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
 // const [loading, setLoading] = useState(true);
 
  const [isSuccess, setIsSuccess] = useState(false)

  const dispatch = useDispatch();


  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);


   const cartItems = useSelector((state) => state.cart);
    

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

     function handleClear(){
       dispatch(clearCart())
       toast.success('Cart cleared successfully')
     }

     //////////////////checkout



     async function stripeCheckout() {
      const cartProducts = {
        email: user?.email,
        username: user?.username,
        address,
        state,
        zip,
        city,
        cartItems: cartItems?.map(item => ({
          // Map each item to include necessary properties
          _id: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.qty // Assuming quantity is stored in 'qty' property
        }))
      };
    
      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cartProducts),
        });
    
        
          const responseData = await response.json(); // Parse JSON response
         
            window.location.href = responseData.url; // Redirect to checkout URL
        
      
      } catch (error) {
        // Handle any errors that occur during the fetch operation
        console.error('Error:', error.message);
        toast.error('An error occurred!!');
      }

    
    }
      if (isSuccess) {
        return <>
         <Success />
        </>
       } 

    
  
  
  return (
    <div className=' flex flex-row items-center justify-center'>

      {/********************* left */}

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

      {/********************* right */}


      <div className='h-screen py-2'>

      {/********************* total */}


        <div className="bg-white col-span-4 sm:block border border-gray-300 rounded-lg  dark:bg-gray-700 dark:border-gray-700 text-slate-800 overflow-hidden hidden p-5 dark:text-slate-100 font-bold">
          
          <p className="border-b border-slate-500 pb-6 text-slate-400 font-normal">
            We only charge for shipping when you have over 2kg items
          </p>
          <div className="flex items-center justify-between py-4 font-bold">
            <span>Total </span>
            <span>$ {totalPrice}</span>
          </div>

          <div className='w-full flex flex-row items-center justify-between'>
            <button                                        
             onClick={()=> handleClear()} 
             className='bg-red-500 hover:bg-slate-500 text-white p-1 rounded'
            >
              Clear-Cart
            </button>
            
            <Link
              href="/"  
            >
              <button 
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 rounded p-1 flex items-center"
              >
                Continue to Payment
              </button>
              
            </Link>
          </div>

       </div>

       {/********************* check out */}
        <div className='mt-4 bg-white col-span-4 sm:block border border-gray-300 rounded-lg  dark:bg-gray-700 dark:border-gray-700 text-slate-800 overflow-hidden hidden p-5 dark:text-slate-100 font-bold'>
      
        <div className="md:1/3 mt-16 md:mt-6">
            <header className="text-start flex flex-col w-full">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Shipping details</h1>
              <p className="mt-2 text-text text-lg">We use your account details for shipping.</p>
            </header>
            <div class="mx-auto max-w-xl p-4 border shadow-xl h-[400px] my-3">
              <div class="space-y-5">
                <div class="grid grid-cols-12 gap-5">
                  <div class="col-span-6">
                    <label class="mb-1 block text-sm font-medium text-text">Email</label>
                    <input type="email" name="email" class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" value={user?.email}
                      placeholder='Email'
                    />

                  </div>
                  <div class="col-span-6">
                    <label class="mb-1 block text-sm font-medium text-text">Full Name</label>
                    <input type="text" name="name" class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" value={user?.username}
                      placeholder='name'
                    />
                  </div>
                  <div class="col-span-12">
                    <label class="mb-1 block text-sm font-medium text-text">Address</label>
                    <input type="text" name="address" class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="1864 Main Street"
                      value={address}
                      onChange={ev => setAddress(ev.target.value)}
                      required
                    />

                  </div>
                  <div class="col-span-6">   
                    <label class="mb-1 block text-sm font-medium text-text">City</label>
                    <input type="text" name="city" class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder=""
                      value={city}
                      onChange={ev => setCity(ev.target.value)}
                      required
                    />
                  </div>
                  <div class="col-span-4">
                    <label class="mb-1 block text-sm font-medium text-text">State</label>
                    <input type="text" name="state" class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder=""
                      value={state}
                      onChange={ev => setState(ev.target.value)}
                      required
                    />
                  </div>
                  <div class="col-span-2">
                    <label class="mb-1 block text-sm font-medium text-text">Zip</label>
                    <input type="text" name="zip" class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder=""
                      value={zip}
                      onChange={ev => setZip(ev.target.value)}
                      required
                    />
                  </div>
                  <div class="col-span-12 text-center w-full">
                    <button
                      onClick={stripeCheckout}
                      className="block rounded bg-blue-500 py-2 text-md text-white transition hover:bg-blue-400 w-full"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
          
        </div>    

      </div>
         

    </div>
    
  )
}
