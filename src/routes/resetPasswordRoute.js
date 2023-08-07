import express from 'express';
import { resetPassword } from '../controller/resetPasswordController.js';

const router = express.Router();

router.post('/reset-password/:userId/:token', resetPassword);

export default router;
