import OrderModel from "../model/order.js";

export const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).send('Error retrieving orders');
    }
};

export const getAllOrdersStatus = async (req, res) => {
   try {
        const orders = await OrderModel.find({ status: 'inprogress' });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error retrieving in-progress orders:', error);
        res.status(500).send('Error retrieving in-progress orders');
    }
};

export const getOrder = async (req, res) => {
    const { id } = req.params;

    try {
        console.log('Attempting to retrieve order with ID:', id);
        const order = await OrderModel.findById(id);
        
        if (!order) {
            console.log('Order not found:', id);
            return res.status(404).send('Order not found');
        }

        console.log('Order found:', order);
        res.status(200).json(order);
    } catch (error) {
        console.error('Error retrieving order:', error);
        res.status(500).send('Error retrieving order');
    }
};


export const createOrder = async (req, res) => {
    const { productName, total, customerName, customerPhoneNumber, customerEmail, customerAddress } = req.body;

    try {

        const newOrder = new OrderModel({
            productName,
            total,
            customerName,
            customerPhoneNumber,
            customerEmail,
            customerAddress
        });
        await newOrder.save();
        res.status(201).send('Order created successfully');
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send('Error creating order');
    }
};


export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { productName, total, customerName, customerPhoneNumber, customerEmail, customerAddress } = req.body;
  
    try {

      const order = await OrderModel.findByIdAndUpdate(
        id,
        { productName, total, customerName, customerPhoneNumber, customerEmail, customerAddress },
        { new: true }
      );
      
      if(!order) return res.status(404).json('order Not Found');
      const allOrders= await OrderModel.find({ status: 'inprogress' });
      res.status(201).json(allOrders);
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).send('Error updating order');
    }
};

export const deleteOrder = async (req, res) => {
    const { id } = req.params;

  try {

   const order =  await OrderModel.findByIdAndDelete(id);

   if(!order) return res.status(404).json('Order Not Found');

    res.status(200).send('Order deleted successfully');
  } catch (error) {
    console.error('Error deleting Order:', error);
    res.status(500).send('Error deleting Order');
  }
};

export const updateOrderStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await OrderModel.findByIdAndUpdate(
            id,
            {
                status: 'delivered'
            },
            { new: true }
        );

        if (!order) {
            return res.status(404).send('Order not found');
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).send('Error updating order status');
    }
};

