import React, { useState, useEffect } from 'react';
import { images } from '../constants/index.js';
import axios from 'axios';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const services = [
  {
    title: 'Personal Training',
    description:
      'Get personalized training sessions tailored to your fitness goals and needs. Our experienced trainers will work closely with you to design a customized workout plan, track your progress, and provide guidance and motivation to help you achieve your desired results.',
    image: images.PersonalTrainer,
  },
  {
    title: 'Group Classes',
    description:
      'Join our group fitness classes and train with others. Experience dynamic workouts in a supportive and energetic group environment, led by our skilled instructors who will challenge and inspire you to reach your full potential.',
    image: images.GroupClasses,
  },
  {
    title: 'Public Workout',
    description:
      'Transform your fitness journey with our public workouts. Join our energizing group classes led by experienced instructors, and achieve your fitness goals together!',
    image: images.PublicWork,
  },
]; 
  
const Hero = () => {
  const [fullname, setFullName] = useState('');
  const [subject, setSubject] = useState('');
  const [fullnameError, setFullNameError] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleFullNameChange = (event) => {
  const value=event.target.value;
    setFullName(value);
    setFullNameError(value.trim() === '' ? 'Full name is required' : '');
  };

  const handleSubjectChange = (event) => {
    const value=event.target.value;
    setSubject(value);
    setSubjectError(value.trim() === '' ? 'Subject is required' : '');
  };

 const handlclickSubmit=async()=>{
  if (fullname.trim() === '') {
    setFullNameError('Full name is required');
    return;
  }

  if (subject.trim() === '') {
    setSubjectError('Subject is required');
    return;
  }

  try {
    await axios.post('http://localhost:8000/user/contact', {
      fullname: fullname,
      subject: subject,
    });
    setIsEmailSent(true); // Set the state to true when the email is sent successfully
    setFullName(''); // Reset form fields after successful email submission
    setSubject('');
  } catch (error) {
    console.error('Error:', error);
  }
};

useEffect(() => {
  // Clear the message and refresh the page after a delay when email is sent successfully
  if (isEmailSent) {
    const timer = setTimeout(() => {
      setIsEmailSent(false); // Reset the message display state after a delay (you can customize the delay)
      window.location.reload(); // Refresh the page after clearing the message
    }, 3000); // Delay in milliseconds (3 seconds in this example)

    return () => clearTimeout(timer); // Clear the timer if the component unmounts before the delay completes
  }
}, [isEmailSent]);

  return (
    <section className=" mx-auto px-5  mt-0 bg-black relative">
      
      <div className="relative" id="Home">
        <Header/>
        <img
          className="w-full h-auto mx-auto p-4"
          src={images.AboutUs}
          alt="Gym profile"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center  ">
          <h1 className="font-roboto text-xl text-yellow-500 md:text-3xl lg:text-xl xl:text-3xl mr-24 ">
            "Train like a beast, look like a beauty."
          </h1>
          
          <div className="flex flex-col items-center md:items-start mt-8 md:mt-0">
            <div className="flex gap-4 mt-4 mr-24 ">

              <a href='register' className="px-8 py-3 bg-yellow-500 font-bold text-black rounded-md transition-transform transform-gpu hover:scale-110">
                Sign Up
              </a>
              <a href='login' className="px-8 py-3 bg-yellow-500 font-bold text-black rounded-md transition-transform transform-gpu hover:scale-110">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="AboutUs" ></div>
      <div className="flex flex-col lg:flex-row gap-8 mt-8" >
  <div className="flex-1 flex items-center">
    <img
      className="w-full h-auto mx-auto p-4"
      src={images.HeroLogin}
      alt="About Us"
    />
  </div>
  <div className="flex-1 flex flex-col justify-center p-3">
    <h1 className="font-roboto text-3xl text-yellow-500 md:text-5xl lg:text-4xl xl:text-5xl">
      About Us
    </h1>
    <p className="py-7 font-roboto text-xl text-gray-100 md:text-2xl  lg:text-xl xl:text-2xl mt-4 lg:mt-0 text-justify ">
      At Get Bulk Gym, we are dedicated to helping you achieve your fitness goals and lead a healthier lifestyle. Our state-of-the-art facilities and experienced trainers ensure that you receive top-notch training tailored to your individual needs. Whether you're a fitness enthusiast or just starting your fitness journey, we welcome you to be a part of our supportive community and embark on a transformative fitness experience.
    </p>
  </div>
</div>

<div className="flex flex-col lg:flex-row gap-8">
<div className="flex-1 flex flex-col justify-center p-3">
  <h1 className="font-roboto text-3xl text-yellow-500 md:text-5xl lg:text-4xl xl:text-5xl text-center border-black p-5 mt-3">
    Opening Hours
  </h1>  
  <p className="font-roboto text-xl text-gray-100 md:text-2xl  lg:text-xl xl:text-2xl mt-4 lg:mt-0 text-center mb-4">
    Monday - Friday: 6:00 AM - 10:00 PM
  </p>
  <p className="font-roboto text-xl text-gray-100 md:text-2xl  lg:text-xl xl:text-2xl mt-4 lg:mt-0 text-center mb-4">
    Saturday: 8:00 AM - 8:00 PM
  </p>
  <p className="font-roboto text-xl text-gray-100 md:text-2xl  lg:text-xl xl:text-2xl mt-4 lg:mt-0 text-center mb-4">
    Sunday: 8:00 AM - 2:00 PM
  </p>
</div>
  <div className="flex-1 flex items-center">
    <img
      className="w-80% h-80% mx-auto p-4"
      src={images.OpeningHours}
      alt="Opening Hours"
    />
  </div>
  
</div>

<div className="mt-8"  id='Service'>
  
<h1 className="font-roboto text-3xl text-yellow-500 md:text-5xl lg:text-4xl xl:text-5xl text-center  border-black p-5 "> 
        Our Services
      </h1>
      <div className="flex flex-col gap-6 mt-6 lg:gap-2 lg:flex-row ">
        {services.map((service) => (
          <div key={service.title} className="flex gap-4 items-center  lg:items-start">
            <img src={service.image} alt={service.title} className="w-16 h-16 mx-auto rounded-full" />
            <div className="flex flex-col ">
              <h3 className="font-semibold text-yellow-400 md:text-3xl lg:text-2xl xl:text-3xl text-center lg:text-left border-b-2 border-yellow-500 pb-2">
                {service.title}
              </h3>
              <p className="text-gray-100 lg:text-base lg:text-left pt-3 text-justify">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
</div>

      <div className="mt-8" id='ContactUs'>
  <h1 className="font-roboto text-3xl text-center  text-yellow-500 md:text-5xl lg:text-4xl xl:text-5xl border-black p-5">
    Contact Us
  </h1>
  <div className="flex flex-col lg:flex-row gap-4 mt-4 justify-between">
    <div className="flex flex-col items-center lg:items-start lg:w-1/2 py-5 mx-5">
      <p className='text-yellow-500 font-roboto text-xl'>Phone Number</p>
      <div className="flex items-center">
        <i className="fas fa-phone text-yellow-500 text-xl"></i>
        <p className="text-yellow-500 font-roboto text-xl ml-2">+961 70-497 758</p>
      </div>
      <p className='text-yellow-500 font-roboto text-xl mt-5'>Email Address</p>
      <div className="flex items-center">
        <i className="fas fa-envelope text-yellow-500 text-xl"></i>
        <p className="text-yellow-500 font-roboto text-xl ml-2">GetBulk@gym.com</p>
      </div>
    </div>
    <div className="flex flex-col items-start lg:w-1/2">
      <label className="font-roboto text-yellow-500 text-xl " htmlFor="fullName">Full Name</label>
      <input
        className="border-b-2 border-yellow-500 bg-transparent text-yellow-500 py-2 px-4 w-full"
        type="text"
        id="fullName" 
        placeholder="Please enter your full name"
        onChange={handleFullNameChange}
        required
      />
      {fullnameError && <p className="text-red-500 mt-2">{fullnameError}</p>}
      <label className="font-roboto text-yellow-500 text-xl mt-4" htmlFor="subject">Subject</label>
      <textarea
        className="border-b-2 border-yellow-500 bg-transparent text-yellow-500 py-2 px-4 w-full h-24"
        id="subject"
        placeholder="Enter your message here"
        onChange={handleSubjectChange}
        required
      

      ></textarea>
      {subjectError && <p className="text-red-500 mt-2">{subjectError}</p>}
      <div className="lg:w-1/2 flex items-center justify-center">
        <button className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-md  transition-transform transform-gpu hover:scale-110 duration-300 mt-6 lg:mt-10" onClick={handlclickSubmit}>
          Submit
        </button>
      </div>
    </div>
   

  </div>
  {isEmailSent && (
          <p className="text-green-500 mt-4  text-right">Email sent successfully!</p>
        )}
        <hr className="border-t-2 border-yellow-500 mt-8 mx-auto" />    

        <Footer/>
</div>

    </section>
  );
};

export default Hero;
