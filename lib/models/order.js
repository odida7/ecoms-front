import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
  line_items:Object,
  username:String,
  email:String,
  city:String,
  state:String,
  zip:String,
  address:String,
  state:String,   
  paid:Boolean,

},   
   {timestamps: true},
)

const Orders = mongoose.models.Orders || mongoose.model('Orders', orderSchema);

export default Orders;