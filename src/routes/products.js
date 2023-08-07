import express from 'express';

import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct, upload } from '../controller/products.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/',upload.single("imagePath"), createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);


export default router;


