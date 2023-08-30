import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UpdateOrder ({closeUpdate, orderId, setOrders }) {
  const [productName, setProductName] = useState('');
  const [total, setTotal] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  


  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Check if the required fields are filled
    if (!productName) newErrors.productName = 'Product Name is required';
    if (!total) newErrors.total = 'Total is required';
    if (!customerName) newErrors.customerName = 'Customer Name is required';
    if (!customerPhoneNumber) newErrors.customerPhoneNumber = 'Customer PhoneNumber is required';
    if (!customerEmail) newErrors.customerEmail = 'Customer Email is required';
    if (!customerAddress) newErrors.customerAddress = 'Customer Address is required';


    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }

  
  useEffect(() => {
    axios
      .get(`http://localhost:8000/order/${orderId}`)
      .then(response =>{console.log(response)
        setProductName(response.data.productName)
        setTotal(response.data.total)
        setCustomerName(response.data.customerName)
        setCustomerPhoneNumber(response.data.customerPhoneNumber)
        setCustomerEmail(response.data.customerEmail)
        setCustomerAddress(response.data.customerAddress)

    })
    .catch((error) => console.log(error));
}, [orderId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();

    if (isValid) {
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('total', total);
      formData.append('customerName', customerName);
      formData.append('customerPhoneNumber', customerPhoneNumber);
      formData.append('customerEmail', customerEmail);
      formData.append('customerAddress', customerAddress);
      

      axios
      .put(`http://localhost:8000/order/${orderId}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setOrders(response.data)
        
      }).then(()=>{
        closeUpdate(false)
      })
      .catch((error) => {
        console.log('Error while submitting the form:', error);
      });
    
    }
  };
  return (
    <div className = "modalBackground">
          <form onSubmit={(e)=>handleSubmit(e)}>
      <div className= "modalContainer">
        <div className = "titleCloseBtn">
        <button onClick = {() => closeUpdate(false) } className="text-white">  X  </button>
        </div>
        <div className = "title">
          <h1 className="text-yellow-500 font-bold flex justify-start items-start"> Edit Order: </h1>
        </div>
        <div className = "body">

   <div className="flex justify-between">
        <div className="mb-2">
      <label
              className="block text-yellow-500 text-sm  font-bold mb-2"
              htmlFor="productName">Product Name </label>
            <input
              className="shadow w-64 mb-2 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="productName"
              type="text"
              name="productName"
              value={productName}
              placeholder="Enter product's name" 
              onChange={(e) => setProductName(e.target.value)}
              /> 
              {errors.productName && <p className="text-red-500 text-sm">{errors.productName}</p>}
              </div>
              <div className="mb-2">
             <label
              className="block text-yellow-500 text-sm  font-bold mb-2"
              htmlFor="Total">Total </label>
            <input
              className="shadow w-64 mb-2 border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="total"
              type="text"
              name="total"
              value={total}
              placeholder="Enter order total price" 
              onChange={(e) => setTotal(e.target.value)}
              /> 
              {errors.total&& <p className="text-red-500 text-sm">{errors.total}</p>}

              </div>          
              </div>
              <div className="flex justify-between">
              <div className="mb-2">
        <label
              className="block text-yellow-500 text-sm font-bold mb-2"
              htmlFor="customerName"> Customer Name </label>
            <input
              className="shadow w-64 mb-2 border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="customerName"
              type="text"
              name="customerName"
              value={customerName}
              placeholder="Enter Customer Name" 
              onChange={(e) => setCustomerName(e.target.value)}
              />
             {errors.customerName&& <p className="text-red-500 text-sm">{errors.customerName}</p>}


               </div> 
               <div className="mb-2">
      <label
              className="block text-yellow-500 text-sm  font-bold mb-2"
              htmlFor="customerPhoneNumber">Customer PhoneNumber </label>
            <input
              className="shadow w-64 mb-2 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="customerPhoneNumber"
              type="text"
              name="customerPhoneNumber"
              value={customerPhoneNumber}
              placeholder="Enter Customer phoneNumber" 
              onChange={(e) => setCustomerPhoneNumber(e.target.value)}
              /> 
              {errors.customerPhoneNumber && <p className="text-red-500 text-sm">{errors.customerPhoneNumber}</p>}
              </div>      
               
              </div>
              <div className="flex justify-between">
              <div className="mb-2">
      <label
              className="block text-yellow-500 text-sm  font-bold mb-2"
              htmlFor="customerEmail">Customer Email</label>
            <input
              className="shadow w-64 mb-2 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="customerEmail"
              type="text"
              name="customerEmail"
              value={customerEmail}
              placeholder="Enter Customer Email" 
              onChange={(e) => setCustomerEmail(e.target.value)}
              /> 
              {errors.customerEmail && <p className="text-red-500 text-sm">{errors.customerEmail}</p>}
              </div> 
              <div className="mb-2">
             <label
              className="block text-yellow-500 text-sm  font-bold mb-2"
              htmlFor="customerAddress">Customer Address </label>
            <input
              className="shadow w-64 mb-2 border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="customerAddress"
              type="text"
              name="customerAddress"
              value={customerAddress}
              placeholder="Enter Customer Address " 
              onChange={(e) => setCustomerAddress(e.target.value)}
              /> 
              {errors.customerAddress&& <p className="text-red-500 text-sm">{errors.customerAddress}</p>}

              </div>          
              </div>
              </div>
             
        
          <div className = "footer">
            <button onClick = {() => closeUpdate(false) } id="cancelBtn"> Cancel </button>
            <button type = "submit"> Save </button>

          </div>

      </div>
      </form>

    </div>
  );
};

export default UpdateOrder;

