import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    category:{
        // type: mongoose.Schema.Types.ObjectId,
        type: mongoose.ObjectId,
        ref: 'category',
        required: true,
    },
   
    imagePath:{
        type: String,
    }
   
});

const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;

