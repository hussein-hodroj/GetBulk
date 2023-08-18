import express from 'express';
import multer from 'multer';
import {
  createTransforms,
  deleteTransform,
  getAllTransforms,
  getTransforms,
  updateTransform
} from '../controller/transform.js';

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/usersImages/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get('/transforms', getAllTransforms);
router.get('/:id/transform', getTransforms);
router.post('/createtransform', upload.fields([
    { name: 'imageBefore', maxCount: 1 },
    { name: 'imageAfter', maxCount: 1 }
  ]), createTransforms);
  
  router.put('/:id/updateTransform', upload.fields([
    { name: 'imageBefore', maxCount: 1 },
    { name: 'imageAfter', maxCount: 1 }
  ]), updateTransform);
router.delete('/:id/deletetransform', deleteTransform);

export default router;
