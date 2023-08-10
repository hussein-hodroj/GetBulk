import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    customerPhoneNumber: {
        type: String,
        required: true,
    },
    customerEmail: {
        type: String,
        required: true,
    },
    customerAddress: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'inprogress',
    },
});

const OrderModel = mongoose.model('Order', orderSchema);
export default OrderModel;
