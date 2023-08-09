import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer'; 
import dotenv from 'dotenv';
// Routes
import usersRoutes from './src/routes/users.js';
import feedbackRoutes from './src/routes/feedbacks.js';
import bookingRouter from './src/routes/bookings.js';
import categoryRoutes from './src/routes/category.js';
import orderRouter from './src/routes/orders.js';
import productRouter from './src/routes/products.js';
import publicWorkoutRouter from './src/routes/publics.js';
import scheduleRouter from './src/routes/schedules.js';
import workoutTypeRouter from './src/routes/workouts.js';
import forgotPasswordRouter from './src/routes/forgotPasswordRoute.js';
import resetPasswordRouter from './src/routes/resetPasswordRoute.js';
import { getAllProducts } from './src/controller/products.js';

dotenv.config();

const app = express();
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(cors());
app.use(express.json());
app.use('/user',usersRoutes);
app.use('/feedback',feedbackRoutes);
app.use('/category',categoryRoutes);
app.use('/product',productRouter);
app.use('/order',orderRouter);
app.use('/booking',bookingRouter);
app.use('/schedule',scheduleRouter);
app.use('/public',publicWorkoutRouter);
app.use('/workout', workoutTypeRouter);
app.use('/',forgotPasswordRouter);
app.use('/',resetPasswordRouter);

// MongoDB Connection
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.MONGODB_URL, connectionOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));



  // Image Upload Route


app.post('/upload', upload.single('profileImage'), (req, res) => {
  const imageUrl = req.file.path; // You might want to store this URL in a database
  res.json({ imageUrl });
});


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
