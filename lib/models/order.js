import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
  line_items:Object,
  name:String,
  email:String,
  city:String,
  zip:String,
  address:String,
  country:String,
  paid:Boolean,

},  
   {timestamps: true},
)

const Orders = mongoose.models.Orders || mongoose.model('Orders', orderSchema);

export default Orders;