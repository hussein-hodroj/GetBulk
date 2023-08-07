import CategoryModel from "../model/category.js";


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


      if(!category) return res.status(404).json('Category Not Found');

      res.status(200).json(category);
    } catch (error) {
      console.error('Error retrieving categories:', error);
      res.status(500).send('Error retrieving categories');
    }
  };
  
  export const createCategory = async (req, res) => {
    const { name } = req.body;
  
    try {
      const newCategory = new CategoryModel({ name });

      await newCategory.save();
      res.status(200).send('Category created successfully');
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).send('Error creating category');
    }
  };
  
  export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    try {

      const Updatecategory = await CategoryModel.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );

      if(!Updatecategory) return res.status(404).json('Category Not Found');

      res.status(201).json(Updatecategory);
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).send('Error updating category');
    }
  };
  
  export const deleteCategory = async (req, res) => {
    const { id } = req.params;
  
    try {
     

      const category =  await CategoryModel.findByIdAndDelete(id);

    if(!category) return res.status(404).json('Category Not Found');
      res.status(200).send('Category deleted successfully');
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).send('Error deleting category');
    }
  };