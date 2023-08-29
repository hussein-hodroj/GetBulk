import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        //type: mongoose.ObjectId,
        ref: 'category',
        required: true,
    },
   
    quantity:{
        type:Number, 
    },

    imagePath:{
        type: String,
    }
   
});

const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;

