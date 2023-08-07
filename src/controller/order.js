import CategoryModel from "../model/category.js";
import OrderModel from "../model/order.js";
import ProductModel from "../model/product.js";
import UserModel from "../model/user.js";

export const getAllOrders = async (req, res) => {
    try {
      const orders = await OrderModel.find();
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error retrieving orders:', error);
      res.status(500).send('Error retrieving orders');
    }
  };
  
  export const getOrder = async (req, res) => {
    const { orderId } = req.params;
  
    try {
      const order = await OrderModel.findById(orderId);
      if (!order) {
        return res.status(404).send('Order not found');
      }
      res.status(200).json(order);
    } catch (error) {
      console.error('Error retrieving order:', error);
      res.status(500).send('Error retrieving order');
    }
  };
  
  export const createOrder = async (req, res) => {
    const { productid, sale, price, category, users } = req.body;
  
    try {
      const existingUser = new UserModel.findOne({users});
      const existingCategory = new CategoryModel.findOne({users});
      const existingProduct = new ProductModel.findOne({productid});
      if(!existingUser) return res.status(404).json('User Not Found');
      if(!existingProduct) return res.status(404).json('Product Not Found');
      if(!existingCategory) return res.status(404).json('User Not Found');

      const newOrder = new OrderModel({ productid, sale, price, category, users });
      await newOrder.save();
      res.status(201).send('Order created successfully');
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).send('Error creating order');
    }
  };
  
  export const updateOrder = async (req, res) => {
    const { orderId } = req.params;
    const { productid, sale, price, category, users } = req.body;
  
    try {
      const order = await OrderModel.findByIdAndUpdate(
        orderId,
        { productid, sale, price, category, users },
        { new: true }
      );
      if (!order) {
        return res.status(404).send('Order not found');
      }
      res.status(200).json(order);
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).send('Error updating order');
    }
  };
   
  export const deleteOrder = async (req, res) => {
    const { orderId } = req.params;
  
    try {
      const order = await OrderModel.findByIdAndDelete(orderId);
      if (!order) {
        return res.status(404).send('Order not found');
      }
      res.status(200).send('Order deleted successfully');
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).send('Error deleting order');
    }
  };