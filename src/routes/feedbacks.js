import { Router } from 'express';
import FeedbackModel from '../model/feedback.js';
import { getFeedback, createfeedback, updatefeedback, deletefeedback, getAllFeedback } from '../controller/feedback.js';

const router = Router();

router.get('/', getAllFeedback);
router.get('/:id', getFeedback);
router.post('/createfeedback', createfeedback);
router.post('/updatefeedback', updatefeedback);
router.delete('/delete/:id', deletefeedback);

export default router;
