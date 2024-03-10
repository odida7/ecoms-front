//import Products from '@/lib/models/Products';
import Orders from '@/lib/models/order';
import { connectDB } from '@/lib/mongoose';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY);

export async function POST(request) {
  const {username, email, address, city, state, zip } = await request.json();
  

  await connectDB();
/*
  const line_items = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        images: [item.image],
        metadata: { productId: item.product },
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));
*/
  try {
    // Create an order document in your database
    const orders = await Orders.create({
      username,
      email, 
      address, 
      city, 
      state, 
      zip
    });

    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: {
          'Content-Type': 'application/json'
      }
  }) 

    // Create a Stripe checkout session
   /* const session = await stripe.checkout.sessions.create({
      line_items,
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: shippingInfo.email, // Assuming email is in shippingInfo
      success_url: `${process.env.SUCCESS_URL}/cart?success=1`,
      cancel_url: `${process.env.SUCCESS_URL}/cart?canceled=1`,
      metadata: { orderId: orderDoc._id.toString(), shippingInfo },
    });

    // Return the URL of the checkout session to the client
    res.json({ url: session.url });

    */
  } catch (error) {
    console.log(error.message)
    return new Response(error.message, {
        status: 500
    })
  }
  
}