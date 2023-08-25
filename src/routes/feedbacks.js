import { Router } from 'express';
import { getFeedback, createfeedback, updatefeedback, deletefeedback, getAllFeedback,FeedackUser } from '../controller/feedback.js';

const router = Router();

router.get('/', getAllFeedback);
router.get('/:id', getFeedback);
router.post('/createfeedback', createfeedback);
router.put('/updatefeedback/:id', updatefeedback);
router.delete('/delete/:id', deletefeedback);
router.get('/user/:id',FeedackUser);
   

export default router;
