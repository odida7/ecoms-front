//import Categories from "@/lib/models/Categories";
import Products from "@/lib/models/Products";
//import User from "@/lib/models/User";
import { connectDB } from "@/lib/mongoose"



export async function GET(){  
    try{
        await connectDB();
        const allProducts = await Products.find();
          return new Response(JSON.stringify(allProducts), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    }catch(error){
        console.log(error.message)
        return new Response(error.message, {
          status: 500,
        });
    }
}