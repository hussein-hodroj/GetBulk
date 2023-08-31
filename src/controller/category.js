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
        if (file) {
          cb(null, file.originalname);
        } else {
          cb(null, null); 
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  });
  export const upload = multer({ storage: storage });

export const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error retrieving categories:', error);
        res.status(500).send('Error retrieving categories');
    }
};

export const getCategory = async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id);

        if (!category) return res.status(404).json('Category Not Found');

        res.status(200).json(category);
    } catch (error) {
        console.error('Error retrieving category:', error);
        res.status(500).send('Error retrieving category');
    }
};

export const createCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const newCategory = new CategoryModel({ 
            name,
            categoryimage: req?.file?.originalname
        });

        await newCategory.save();
        
        res.status(200).json({
            _id: newCategory._id,
            name: newCategory.name,
            categoryimage: newCategory.categoryimage ? newCategory.categoryimage : null
        });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).send('Error creating category');
    }
};

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    let categoryimage = null;

    if (req.file) {
        categoryimage = req.file.originalname;
    } else {
       
        const existingCategory = await CategoryModel.findById(id);
        if (existingCategory) {
            categoryimage = existingCategory.categoryimage;
        }
    }

    try {
        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            id,
            { name, categoryimage },
            { new: true }
        );

        if (!updatedCategory) return res.status(404).json('Category Not Found');

        res.status(201).json(updatedCategory);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).send('Error updating category');
    }
};


export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await CategoryModel.findByIdAndDelete(id);

        if (!category) return res.status(404).json('Category Not Found');

        res.status(200).send('Category deleted successfully');
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).send('Error deleting category');
    }
};
