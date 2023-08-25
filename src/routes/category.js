import express from 'express';

import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory,upload } from '../controller/category.js';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.post('/',upload.single("categoryimage"), createCategory);
router.put('/:id',upload.single("categoryimage"), updateCategory);
router.delete('/:id', deleteCategory);

export default router;

