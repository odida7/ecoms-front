import Products from "@/lib/models/Products";
import { connectDB } from "@/lib/mongoose";
/*
export default async function handle(req, res) {
  await connectDB();
  const ids = req.body.ids;
  
  try {
    const products = await Products.find({ _id: { $in: ids } });
    res.json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
*/



export async function GET(req) {
  await connectDB();
  const ids = req.body.ids;
  
  try {
    const products = await Products.find({ _id: { $in: ids } });
    return new Response(JSON.stringify(products), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
  } catch (error) {
      console.log(error.message)
      return new Response(error.message, {
        status: 500,
      });
  }
}

