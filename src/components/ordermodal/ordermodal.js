import React, { useState } from 'react';
import axios from 'axios';

const CheckoutModal = ({ isOpen, handleClose, selectedProducts, total }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const [isValid, setIsValid] = useState(false);

  const [showThankYouMessage, setShowThankYouMessage] = useState(false);


  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required';

    setFullNameError(newErrors.fullName || '');
    setEmailError(newErrors.email || '');
    setAddressError(newErrors.address || '');
    setPhoneNumberError(newErrors.phoneNumber || '');

    setIsValid(Object.keys(newErrors).length === 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    validateForm();
  
    if (isValid) {
      const orderData = {
        productName: selectedProducts.map(product => product.product.name).join(', '),
        total: parseFloat(total).toFixed(2),
        customerName: fullName,
        customerEmail: email,
        customerAddress: address,
        customerPhoneNumber: phoneNumber,
      };
  
      try {

        const response = await axios.post('http://localhost:8000/order/', orderData);
        console.log('Order created:', response.data);

        
  
       
        setFullName('');
        setEmail('');
        setAddress('');
        setPhoneNumber('');
  
       
        setShowThankYouMessage(true);
  
        
        setTimeout(() => {
          setShowThankYouMessage(false);
          setTimeout(() => {
            window.location.reload();
          }, 1000); 
          handleClose();
        }, 5000); 

 
        for (const selectedProduct of selectedProducts) {
          const productId = selectedProduct.product._id;
          const newQuantity = selectedProduct.product.quantity - selectedProduct.amount;
      
          await axios.put(`http://localhost:8000/product/${productId}`, { quantity: newQuantity });
          console.log('quantyty updated ');
        }
        

      } catch (error) {
        console.log('Error creating order:', error);
      }
    }
  };
  
  


  return (
    <div className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 z-50 overflow-auto top-12 bg-opacity-50 flex justify-center items-center`}>
      <div className="bg-zinc-600 p-4 w-[500px] rounded">
        
        {showThankYouMessage ? (
  <div className="text-center mb-4 text-yellow-500 font-bold text-[30px]">
    <p>Thank you for your order! </p> 
    <p> we hope you like our products </p></div>
) : (
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold mb-4 text-yellow-500">Checkout</h2>
          <div className="mb-4">
            <label htmlFor="fullName" className="block font-medium mb-1 text-white">Full Name</label>
            <input
              type="text"
              id="fullName"
              className={`w-full border ${fullNameError ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded text-black  transition placeholder-gray-300 focus:outline-none focus:border-yellow-500`}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Enter your full name"
            />
            {fullNameError && <p className="text-red-500 text-sm mt-1">{fullNameError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1 text-white">Email</label>
            <input
              type="email"
              id="email"
              className={`w-full border ${emailError ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded text-black transition placeholder-gray-300 focus:outline-none focus:border-yellow-500`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block font-medium mb-1 text-white">Address</label>
            <textarea
              id="address"
              className={`w-full border ${addressError ? 'border-red-500' : 'border-gray-300'} px-3 text-black py-2 rounded transition placeholder-gray-300 focus:outline-none focus:border-yellow-500`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Enter your address"
            />
            {addressError && <p className="text-red-500 text-sm mt-1">{addressError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block font-medium mb-1 text-white">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              className={`w-full text-black border ${phoneNumberError ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded transition placeholder-gray-300 focus:outline-none focus:border-yellow-500`}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              placeholder="Enter your phone number"
            />
            {phoneNumberError && <p className="text-red-500 text-sm mt-1">{phoneNumberError}</p>}
          </div>
          <div className="mb-4">
          <label htmlFor="selectedProducts" className="block font-medium mb-1 text-white">
            Selected Products
          </label>
          <input
            type="text"
            id="selectedProducts"
            className="w-full border bg-gray-100 px-3 py-2 rounded text-black"
            readOnly
            value={selectedProducts.map(product => product.product.name).join(', ')}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="total" className="block font-medium mb-1 text-white">
            Total
          </label>
          <input
            type="text"
            id="total"
            className="w-full border bg-gray-100 px-3 py-2 rounded text-black"
            readOnly
            value={`$ ${parseFloat(total).toFixed(2)}`}
          />
        </div>
        
          <div className="flex justify-end space-x-4">
           
            <button onClick={handleClose} className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 transition-colors rounded">Close</button>
            <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 transition-colors rounded">Submit</button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
