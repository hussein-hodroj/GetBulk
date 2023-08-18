import express from 'express';
import { createTransforms , deleteTransform, getAllTransforms, getTransforms,upload, updateTransform } from '../controller/transform.js';

const router = express.Router();

router.get('/transforms', getAllTransforms);
router.get('/:id/transform', getTransforms);
// router.post('/createtransform', upload.single("imageBeforeWork"), upload.single("imageAfterWork"),createTransforms );

router.post('/createtransform', upload.array(['imageBeforeWork', 'imageAfterWork'], 2), createTransforms);




    
router.put('/:id/updateTransform', updateTransform);
router.delete('/:id/deletetransform', deleteTransform);

export default router;