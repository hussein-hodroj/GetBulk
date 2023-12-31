import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './TrainerDashboard.js';
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function UpdateTrainer() {
  
  const { userId } = useParams();
  const [userName, setUserName] = useState('Admin');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [imageName, setImageName] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setProfileImage(selectedImage);
    setImageName(selectedImage.name);
  };

  const handleCancel = () => {
    window.location.reload();
  };

  const handleFullNameChange = (event) => {
    setFullname(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhonenumber(event.target.value);
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
  // const id = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  const id = decodedToken.id;
  console.log("UpdateTrainer ID:",id)

 useEffect(() => {
    axios.get(`http://localhost:8000/user/${id}`)
      .then((response) => {
        const userData = response.data;
        if (userData) {
        setUserName(userData.username);
        setFullname(userData.fullname);
        setEmail(userData.email);
        setPhonenumber(userData.phonenumber);
        setAddress(userData.address);
        setAge(userData.age);
        // setUserData(userData);
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedData = {
      fullname,
      email,
      age,
      address,
      phonenumber,
      role: 'trainer',
    };
  
    if (profileImage) {
      const formData = new FormData();
      formData.append('profileImage', profileImage);
  
      axios
        .post('http://localhost:8000/upload', formData)
        .then((imageResponse) => {
          updatedData.imagePath = imageName;
          
          // Continue with updating user data
          axios
            .put(`http://localhost:8000/user/${id}`, updatedData)
            .then((response) => {
              console.log(response.data); // Handle success
              setUpdateSuccess(true);
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            })
            .catch((error) => {
              console.error('Error updating profile:', error);
            });
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
    } else {
      axios
        .put(`http://localhost:8000/user/${id}`, updatedData)
        .then((response) => {
          
          console.log(response.data); // Handle success
          setUpdateSuccess(true);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
        });
    }
  };

 
  

  return (
    <div>
      
      <div className="flex ">
        <Dashboard />
        <div className="h-full w-full ml-56 mt-20 mb-5 ">
          <div className="p-3 flex-auto pr-20 pt-8">
            <div className="flex justify-end mb-2 ml-240">
            </div>
            <form onSubmit={handleSubmit} className="bg-zinc-600 p-5 rounded shadow-md">
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
                  required
                  pattern=".*\S+.*" // At least one non-space character
                  title="Full Name is required" // Custom error message
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
                          required // Add the required attribute
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
                        required // Add the required attribute
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
                        required // Add the required attribute
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
                        required // Add the required attribute
                      />

              </div>

                      <div className="mb-2">
                  <label htmlFor="profileImage" className="block text-white font-size:13 font-semibold mb-2">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
             

                <div className="flex justify-end ">
  <button
    type="submit"
    className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-transform transform-gpu hover:scale-110"
  >
    Update
  </button>
  <button
    type="button"
    onClick={handleCancel}
    className="bg-red-600   text-white font-semibold py-2 px-6 ml-2 rounded focus:outline-none focus:shadow-outline transition-transform transform-gpu hover:scale-110"
  >
    Cancel
  </button>


  
              </div>
              <div>
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

export default UpdateTrainer;
