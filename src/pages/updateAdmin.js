import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './dashboard.js';
import { useLocation } from 'react-router-dom'

function UpdateAdmin() {
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [phonenumber, setPhonenumber]=useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);  
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleCancel = () => {
    window.location.reload();
  };
  // Event handlers to capture changes in the form inputs
  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };
const handlePhoneChange=(event)=>{
  setPhonenumber(event.target.value)
};
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  // Function to handle form submission
   const  handleSubmit =  (event) => {
    event.preventDefault();

    // Prepare the data to be sent to the backend server
    const updatedData = {
      fullname,
      email,
      age,
      address,
      phonenumber,
      role:'admin'
    };

    const token = localStorage.getItem('token');
  
    // Decode the token to get user information
    const decodedToken = jwt_decode(token);
    
    // Extract the user ID from the decoded token
    const id = decodedToken.id;

    axios
      .put(`http://localhost:8000/user/${id}`, updatedData)
      .then((response) => {
        console.log(response.data); // Handle success
        setUpdateSuccess(true);
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
};

useEffect(() => {
  // Get the token from local storage
  const token = localStorage.getItem('token');
  
  // Decode the token to get user information
  const decodedToken = jwt_decode(token);
  
  // Extract the user ID from the decoded token
  const userId = decodedToken.id;
  console.log("decodedToken=>",userId);
  // Fetch user data based on the user ID

   axios
    .get(`http://localhost:8000/user/${userId}`)
    .then((response) => {
      const userData = response.data;
      if (userData) {
        setFullName(userData.fullname);
        setEmail(userData.email);
        setAge(userData.age);
        setAddress(userData.address);
        setPhonenumber(userData.phonenumber);
      }
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });
}, []);


  return (
    <div>
      

      <div className="flex ">
        <Dashboard />
        <div className="h-full w-full ml-56 mt-20 mb-5 ">
          <div className="p-3 flex-auto pr-20 pt-8">
            <div className="flex justify-end mb-2 ml-240">
            </div>
            <form onSubmit={handleSubmit} className="bg-zinc-800 p-5 rounded shadow-md">
              <div className="mb-2">
                <label htmlFor="fullname" className="block text-white font-size:13 font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={fullname}
                  onChange={handleFullNameChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="block text-white font-size:13 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
             
              <div className="mb-2">
                <label htmlFor="age" className="block text-white font-size:13 font-semibold mb-2">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={age}
                  onChange={handleAgeChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="phonenumber" className="block text-white font-size:13 font-semibold mb-2">
                  PhoneNumber
                </label>
                <input
                  type="number"
                  id="phonenumber"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={phonenumber}
                  onChange={handlePhoneChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="address" className="block text-white font-size:13 font-semibold mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={address}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="  justify-between space-x-6 space-y-3 ">
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-500 hover:text-black text-white font-semibold py-2 px-6  rounded focus:outline-none focus:shadow-outline "
                >
                  Update  
                </button>
                <button
        type="button"
        onClick={handleCancel}
        className="bg-red-700 hover:bg-red-800 hover:text-black text-white font-semibold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
      >
        Cancel
      </button>
      {updateSuccess && (
  <p className="text-yellow-500 font-bold mt-3">
    Data has been updated successfully!
  </p>
)}
              </div>
            </form>
            

          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateAdmin;
