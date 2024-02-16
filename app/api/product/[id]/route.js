
import Products from "@/lib/models/Products";
import { connectDB } from "@/lib/mongoose";


//////////////get product

export async function GET(reqest, { params }) {
    const {id} = params;
    console.log('id:', id)
    try {
        await connectDB();
        const product = await Products.findById(id);
        
        if (!product) {
            // Category not found, return 404 response
            return new Response(JSON.stringify({ error: 'product not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
                
            });
        }

        // Category found, return 200 response with category data
        return new Response(JSON.stringify(product), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            
        });
    } catch (error) {
        // Handle errors and return 500 response with error message
        console.error(error.message);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
            
        });
    }
}
