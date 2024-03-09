import Products from "@/lib/models/Products";
import { connectDB } from "@/lib/mongoose";

// Connect to the database
connectDB();

// Define your GET route handler
export async function GET(req, res) {
  const ids = req.body.ids;

  try {
    // Fetch products from the database based on the provided IDs
    const products = await Products.find({ _id: { $in: ids } });
    console.log('cartproducts', products)
    // Respond with the fetched products
    res.status(200).json(products);
  } catch (error) {
    // If an error occurs, handle it gracefully
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
