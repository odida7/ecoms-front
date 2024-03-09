import Products from '@/lib/models/Products';
import Orders from '@/lib/models/order';
import { connectDB } from '@/lib/mongoose';

const stripe = require('stripe')(process.env.STRIPE_KEY);

export async function POST(req, res) {
 

  const { email, username, address, city, state, zip, cartItems, totalPrice } = req.body;

  await connectDB();
/*
  const productIds = cartItems;
  const uniqueIds = [... new Set(productIds)];
  const productsInfo = await Products.find({ _id: uniqueIds });

  let line_items = [];

  for (const productId of uniqueIds) {
    const productInfo = productsInfo.find(p => p._id.toString() === productId);

    const quantity = productIds.filter(id => id === productId)?.length || 0;

    if (quantity > 0 && productInfo) {
      line_items.push(
        {
          quantity,
          price_data: {
            currency: 'KES',
            product_data: { username: productInfo.title },
            unit_amount: quantity * productInfo.price * 100 ,
          },

        }
      )
    }
  }
*/
  const orderDoc = await Orders.create({
     email, username, address, city, state, zip, cartItems, totalPrice, paid: false
  })

  const session = await stripe.checkout.sessions.create({
    email, username, address, city, state, zip, cartItems, totalPrice,
    mode: 'payment',
    customer_email: email,
    success_url: process.env.SUCCESS_URL + '/cart?success=1',
    cancel_url: process.env.SUCCESS_URL + '/cart?canceled=1',
    metadata: { orderId: orderDoc._id.toString(), test: 'ok' }
  })

  res.json({
    url: session.url,
  })

}