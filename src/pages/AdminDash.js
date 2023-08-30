import React, { useEffect, useState } from 'react';
import Dashboard from './dashboard.js';
import { images } from '../constants/index.js';
import axios from 'axios';

const AdminDash = () => {
  const [trainers, setTrainers] = useState([]);
  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [newUserDetails, setNewUserDetails] = useState({

    fullname: '',
    email: '',
    address: '',
    age: '',
    phonenumber: '',
    password:"",
  });
  
  

  useEffect(() => {
  
    axios.get('http://localhost:8000/trainers') 
      .then((response) => {
        setTrainers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching trainers data:', error);
      });

      
  // axios.get('http://localhost:8000/getUsers') 
  //   .then((response) => {
  //     // Filter out users with the role "user"
  //     const filteredUsers = response.data.filter(user => user.role === 'user');
  //     setUsers(filteredUsers);
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching users data:', error);
  //   });
  }, []);


  useEffect(() => {
    axios.get('http://localhost:8000/') 
      .then((response) => {
        console.log("jjjjjjjjjjj",response.data)
        console.log('Response from getUsers API:', response.data);
        // Filter out users with the role "user"
        const filteredUsers = response.data.filter(user => user.role === 'user');
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.error('Error fetching users data:', error);
      });
  }, []);
  


  const filteredUsers=users.filter((user) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (user.fullname && user.fullname.toLowerCase().includes(searchTermLower)) ||
      (user.email && user.email.toLowerCase().includes(searchTermLower)) ||
     
      (user.address && user.address.toLowerCase().includes(searchTermLower))
    );
  });
 
  const numFilteredUsers = filteredUsers.length;

  

  const filteredTrainers = trainers.filter((trainer) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (trainer.fullname && trainer.fullname.toLowerCase().includes(searchTermLower)) ||
      (trainer.email && trainer.email.toLowerCase().includes(searchTermLower)) ||
     
      (trainer.address && trainer.address.toLowerCase().includes(searchTermLower))
    );
  });
 
  const numFilteredTrainers = filteredTrainers.length;

  return (
    <div>
      <div className="flex">
        <Dashboard />
        <div className="h-full w-full ml-56 mt-20 mb-5">
          <div className="p-3 flex-auto pr-20 pt-8">
            <div className="flex justify-end mb-2 ml-240">
            </div>
      
            <div className="flex-1 flex items-center justify-center">
              <img
                className="w-80 h-80% pt-16 mx-auto p-4"
                src={images.Logo} 
                alt="logo"
              />
            </div>
            <div className="flex justify-center">
              <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
                Number of Trainers: {numFilteredTrainers}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
                Number of Users: {numFilteredUsers}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
