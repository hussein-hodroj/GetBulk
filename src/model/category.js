import mongoose from "mongoose";


const CategorySchema = new mongoose.Schema({

    name: {
        type: String,
    },
    categoryimage: {
        type: String, 
    },


});

const CategoryModel = mongoose.model('Category', CategorySchema);
export default CategoryModel;