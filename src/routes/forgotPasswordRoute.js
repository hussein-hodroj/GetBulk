import express from 'express';
import { forgotPassword } from '../controller/forgotPasswordController.js';
const router = express.Router();


router.post('/forgot-password', forgotPassword);

export default router;