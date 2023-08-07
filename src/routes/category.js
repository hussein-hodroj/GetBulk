import express from 'express';

import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from '../controller/category.js';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;

