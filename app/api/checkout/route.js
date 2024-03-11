import Orders from '@/lib/models/order';
import { connectDB } from '@/lib/mongoose';
import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_KEY);

export async function POST(request) {
  try {
    // Parse the request body to extract necessary data
    const { username, email, address, city, state, zip, cartItems } = await request.json();

    // Connect to the database
    await connectDB();

    // Prepare line items for the Stripe checkout session
    const line_items = cartItems.map((item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image], // Corrected property name from 'image' to 'images'
            metadata: { productId: item.product },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });

    // Create an order document in your database
    const order = await Orders.create({
      line_items,
      username,
      email,
      address,
      city,
      state,
      zip,
    });

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email, // Use the provided email for the customer
      success_url: `${process.env.SUCCESS_URL}/cart?success=1`,
      cancel_url: `${process.env.SUCCESS_URL}/cart?canceled=1`,
      metadata: { orderId: order._id.toString() }, // Use order._id directly
    });

    // Return the URL of the checkout session to the client
    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Handle errors
    console.error(error.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
