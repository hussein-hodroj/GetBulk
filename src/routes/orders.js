import express from 'express';

import { createOrder, deleteOrder, getAllOrders, getOrder, updateOrder, updateOrderStatus, getAllOrdersStatus } from '../controller/order.js';

const router = express.Router();

router.get('/', getAllOrders);
router.get('/status', getAllOrdersStatus);
router.get('/:id', getOrder);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);
router.put('/status/:id', updateOrderStatus);


export default router;

