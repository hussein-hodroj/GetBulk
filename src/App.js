import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Register from './pages/register.js';
import Login from './pages/login.js';
import Dashboard from './pages/dashboard.js';
import Products from './pages/products.js';
import ForgotPassword from './pages/ForgotPassword.js';
import ResetPassword from './pages/ResetPassword.js';
import Hero from './pages/Hero.jsx';



import Home from './pages/Home.js';
import ProductDetails from './pages/ProductDetails.js';
import { ProductProvider } from './pages/ProductContext.js'; 
import { CartProvider } from './pages/CartContext.js';
import SidebarProvider from './pages/SidebarContext.js';
import Sidebar from './pages/Sidebar.js';
import UpdateAdmin from './pages/updateAdmin.js';

 

import FeedbackAdmin from './pages/adminFeedback.jsx';
import Trainers from './pages/Trainers.js';
import AdminOrder from './pages/adminOrder.js';
import EditPassword from './pages/EditPassword.js';
import Workout from './pages/Workout.js';

import TrainerDashboard from './pages/TrainerDashboard.js'
import UpdateTrainer from './pages/UpdateTrainer.js';
import EditPasswordTrainer from './pages/EditPasswordTrainer.js';
import UserDashboard from './pages/UserDashboard.js';
import UserUpdate from './pages/UserUpdate.js';

import Reservations from './pages/Reservations.jsx';
import UserFeedback from './pages/UserFeedback.js';



import EditPasswordUser from './pages/EditPasswordUser.js';
import Schedules from './pages/Schedules.js';
import TransformPage from './pages/transform.js';
import UserWorkout from './pages/UserWorkout.js';
import WorkoutSelection from './pages/WorkoutSelection.js';
import UserCalendar from './pages/UserCalendar.jsx';

import CarouselSlider from './pages/CarouselSlider.js';

import Heroprodu from './pages/Hero.js';
import WorkoutDescription from './pages/WorkoutDescription.jsx';


function Layout() {
  return (
    
      <>
        
        
        <Outlet />
        
        <BrowserRouter>
           <ProductProvider> 
            <SidebarProvider>
             <CartProvider>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route index element={<Hero />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/update-admin/:userId" component={<UpdateAdmin/>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
            <Route path="/Hero" element={<Hero />} />
            
            <Route path="/Homeprodu" element={<Home />} />
            <Route path="/produ" element={<Heroprodu />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path='/UpdateAdmin' element={<UpdateAdmin />} />
            <Route path='/UpdateTrainer' element={<UpdateTrainer />} />
            <Route path='/UserUpdate' element={<UserUpdate />}/>    



            <Route path="/adminFeedback" element={<FeedbackAdmin />} />
            <Route path="/AdminOrder" element={<AdminOrder />} />
            <Route path="/TrainerDashboard" element= {<TrainerDashboard />}/>

            <Route path='/edit-password-trainer' element={<EditPasswordTrainer />} />
            <Route path="/UserDashboard" element= {<UserDashboard />}/>
            <Route path="/Reservations" element= {<Reservations />}/>
            <Route path='/UserFeedback'element={<UserFeedback/>} />

            <Route path='/edit-password-user' element={<EditPasswordUser />}/>
            <Route path="/Workouts" element= {<Workout />}/>
            <Route path="/schedules" element= {<Schedules />}/>
            
            <Route path="/transforms" element= {<TransformPage />}/>
            <Route path="/UserWorkout" element= {<UserWorkout />}/>
            <Route path="/workoutselection/:trainerId" element= {<WorkoutSelection />}/>
            <Route path="/trainers" element={<Trainers />} />
            {/* <Route path='/adminProfile' element={<AdminProfile/>} /> */}
            <Route path='/editpassword' element={<EditPassword />} />
            <Route path = '/UserCalendar/:trainerId' element = {<UserCalendar/>}/>
            <Route path='/transformation' element={<CarouselSlider/>}/>
            <Route path='/WorkoutDescription/:trainerId/:workoutId' element={<WorkoutDescription/>}/>
          </Routes>
          <Sidebar />
          </CartProvider>
          </SidebarProvider>

          </ProductProvider>

        </BrowserRouter>
        
      </>
      
  );
}

export default Layout;
