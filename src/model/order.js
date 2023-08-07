import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({

    productid: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'product', 
        required: true
    },
    sale: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'category',
        required: true,
    },
    users: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true
    },


});

const OrderModel = mongoose.model('Order', orderSchema);
export default OrderModel;
