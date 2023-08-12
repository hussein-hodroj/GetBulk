import express from 'express';
import { editPassword } from '../controller/EditPasswordController.js';

const router = express.Router();

router.post('/editPassword', editPassword);

export default router;
