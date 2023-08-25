import ProductModel from "../model/product.js";
import CategoryModel from "../model/category.js";
import multer from 'multer';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      cb(null,"public/uploads/usersImages/")
    } catch (error) {
      console.error('Error:', error.message);
    }
  },
  filename: (req, file, cb) => {
    try {
      cb(null,file.originalname);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
});

 export const upload = multer({ storage: storage });



 export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();

    if (!products) return res.status(404).json('Products not found');

    // Create an array to hold category names for each product
    const categoryNames = await Promise.all(
      products.map(async (product) => {
        const category = await CategoryModel.findById(product.category);
        return category ? category.name : 'Unknown Category';
      })
    );

    // Combine each product with its corresponding category name
    const productsWithCategoryNames = products.map((product, index) => ({
      ...product._doc,
      cname: categoryNames[index],
    }));

    res.status(200).json(productsWithCategoryNames);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).send('Error retrieving products');
  }
};


  export const getProduct = async (req, res) => {
    try {
        const id = req.params.id
      const product = await ProductModel.findById(id);

      if(!product) return res.status(404).json('Product Not Found');
      res.status(200).json(product);
    } catch (error) {
      console.error('Error retrieving products:', error);
      res.status(500).send('Error retrieving products');
    }
  };
  
  export const createProduct = async (req, res) => {
    try {
      // Extract data from the request body
      const { name, price, description, category, imagePath } = req.body;
  
      // Create the product
      const newProduct = await ProductModel.create({
        name,
        price,
        description,
        category,
        imagePath: req.file.originalname,
      });
  
      // Find the category using the category ID
      const categoryObj = await CategoryModel.findById(category);
  
      // Get the category name from the found category object
      const cname = categoryObj.name;
  
      res.status(200).json({
        name,
        price,
        description,
        cname,
        imagePath,
      });
        } catch (error) {
      res.status(500).json({ message: "Failed to create the product." });
    }
  };
  
  export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, category, imagePath } = req.body;
  
    try {

      const product = await ProductModel.findByIdAndUpdate(
        id,
        { name, price, description, category, imagePath: req.file.originalname},
        { new: true }
      );

      if(!product) return res.status(404).json('Product Not Found');
      res.status(201).json(product);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).send('Error updating product');
    }
  };

  
  
  export const deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    try {

     const category =  await ProductModel.findByIdAndDelete(id);

     if(!category) return res.status(404).json('Product Not Found');

      res.status(200).send('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).send('Error deleting product');
    }
  };