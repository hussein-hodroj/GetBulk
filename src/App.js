import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Register from './pages/register.js';
import Login from './pages/login.js';
import Dashboard from './pages/dashboard.js';
import Products from './pages/products.js';
import ForgotPassword from './pages/ForgotPassword.js';
import ResetPassword from './pages/ResetPassword.js';
import Hero from './pages/Hero.jsx';
import MainLayout from './pages/MainLayout.jsx';



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
import TrainerDashboard from './pages/TrainerDashboard.js'


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
            
            <Route path="/produ" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path='/UpdateAdmin' element={<UpdateAdmin />} />
            <Route path="/adminFeedback" element={<FeedbackAdmin />} />
            <Route path="/AdminOrder" element={<AdminOrder />} />
            <Route path="/TrainerDashboard" element= {<TrainerDashboard />}/>


            <Route path="/trainers" element={<Trainers />} />
            {/* <Route path='/adminProfile' element={<AdminProfile/>} /> */}
            <Route path='/editpassword' element={<EditPassword />} />
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
