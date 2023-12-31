import React, { useState,useEffect  } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai/index.esm.js';
import axios from 'axios'; 
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { images } from '../constants/index.js';

   
function Dashboard() {
const [activeLink, setActiveLink] = useState('')
const [userImage, setUserImage] = useState(''); 
const [userName, setUserName] = useState('Admin');
const [userData, setUserData] = useState(null); 
const navigate = useNavigate();
const [navIsVisible, setNavIsVisible] = useState(false);


  
  

useEffect(() => {
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  const id = decodedToken.id;

console.log("decodedToken=>",id);
 
  axios.get(`http://localhost:8000/user/${id}`) 
    .then((response) => {
      const userData = response.data;
      
      if (userData) {
        setUserName(userData.fullname); 
        setUserImage(userData.imagePath); 
        setUserData(userData);
      }
      if (userData.role !== 'admin' && userData.role !=='user') {
          
          navigate('/login'); 
        }
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });
}, []);



  const navIsVisibilityHandler = () => {
    setNavIsVisible((curState) => !curState);
  };

  const handleLinkClick = (id) => {
    setActiveLink(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setNavIsVisible(false); // Close the header after clicking a link
  };


const defaultImageUrl = 'https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg';
  return (
    <section className="bg-zinc-800"> 
    <header className={`bg-zinc-800 fixed top-0 left-0 right-0 mx-auto px-10 flex items-center justify-between bg-transparent z-50 backdrop-blur-lg`}>
      <div className="flex items-center">
        <img src={images.Logo} alt="Logo" className="w-16 h-16" />
        <h1 className="font-semibold text-xl ml-2 text-yellow-500">Get Bulk</h1>
      </div>
      <div className="lg:hidden absolute top-0 right-0 m-4">
        {navIsVisible ? (
          <AiOutlineClose
            className="w-6 h-6"
            style={{ color: '#f0b20a' }}
            onClick={navIsVisibilityHandler}
          />
        ) : (
          <AiOutlineMenu
            className="w-6 h-6"
            style={{ color: '#fcdf35' }}
            onClick={navIsVisibilityHandler}
          />
        )}
      </div>
      <div
        className={`${
          navIsVisible ? 'right-0' : '-right-full'
        } mt-[100px] lg:mt-0 bg-transparent text-yellow-500 items-center lg:bg-transparent z-[49] flex flex-col justify-center w-full lg:w-auto lg:justify-end lg:flex-row sm:px-0 sm:mt-0`}
      >
        <header className="navbar">
          <nav
            className={`lg:flex ${
              navIsVisible ? 'flex' : 'hidden'
            } flex-col gap-y-5 lg:flex-row gap-x-5 font-semibold`}
          >
             
            <a
               href="http://localhost:3000/UserDash#"
               className={`href ${
                 activeLink === 'UserDashboard' ? 'text-yellow-500 underline' : 'hover:text-yellow-500 hover:underline'
              } transition-all duration-300 transform scale-100 hover:scale-110`}
              onClick={() => handleLinkClick('UserDashboard')}
            >
              Dashboard
            </a>
          
            <a
              href="http://localhost:3000/UserWorkout#"
              className={`href ${
                activeLink === 'UserWorkout' ? 'text-yellow-500 underline' : 'hover:text-yellow-500 hover:underline'
              } transition-all duration-300 transform scale-100 hover:scale-110`}
              onClick={() => handleLinkClick('UserWorkout')}
            >
              Trainers
            </a>
            <a
              href="http://localhost:3000/UserFeedback#"
              className={`href ${
                activeLink === 'UserFeedback' ? 'text-yellow-500 underline' : 'hover:text-yellow-500 hover:underline'
              } transition-all duration-300 transform scale-100 hover:scale-110`}
              onClick={() => handleLinkClick('UserFeedback')}
            >
              Feedback
            </a>
            <a
              href="http://localhost:3000/UserUpdate#"
              className={`href ${
                activeLink === 'UserUpdate' ? 'text-yellow-500 underline' : 'hover:text-yellow-500 hover:underline'
              } transition-all duration-300 transform scale-100 hover:scale-110`}
              onClick={() => handleLinkClick('UserUpdate')}
            >
             Update Profile
            </a>
            <a
              href="http://localhost:3000/edit-password-user#"
              className={`href ${
                activeLink === 'edit-password-user' ? 'text-yellow-500 underline' : 'hover:text-yellow-500 hover:underline'
              } transition-all duration-300 transform scale-100 hover:scale-110`}
              onClick={() => handleLinkClick('edit-password-user')}
            >
             Edit Password
            </a> 
            <li>
            <a
    href="#"
    onClick={() => {
      localStorage.removeItem('token'); 
      window.location.href = '/';
    }}
    className={`href ${
      activeLink === 'logout' ? 'text-yellow-500 underline' : 'hover:text-yellow-500 hover:underline'
    } transition-all duration-300 transform scale-100 hover:scale-110`}
  >
    Logout
  </a>
</li>
          </nav>
        </header>
      </div>
    </header>
  </section>

  )
}


export default Dashboard;