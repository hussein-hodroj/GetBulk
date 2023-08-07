import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import UserModel from '../model/user.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from bearer header
      token = req.headers.authorization.split(' ')[1]; // Change {} to []
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.findById(decoded.id).select('-password'); // Change Select() to select()

      if (req.user.role !== 'admin') {
        res.status(401);
        throw new Error('Not authorized');
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }
  
  if (!token) {
    res.status(401);
    return next(new Error('Not authorized, no token'));
  }
});

export default protect;
