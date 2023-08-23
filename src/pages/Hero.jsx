import React, { useState, useEffect } from 'react';
import { images } from '../constants/index.js';
import axios from 'axios';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
  const [emailError, setEmailError] = useState('');
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    // Validate email and update emailError if needed
    if (!newEmail.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

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
  if(!email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i)) {
    setEmailError('Please enter a valid email address');
  } else {
    setEmailError('');
  }
  if (subject.trim() === '') {
    setSubjectError('Subject is required');
    return;
  }
  

  try {
    await axios.post('http://localhost:8000/user/contact', {
      fullname: fullname,
      subject: subject,
      email:email,
    });
    setIsEmailSent(true); // Set the state to true when the email is sent successfully
    setFullName(''); // Reset form fields after successful email submission
    setSubject('');
    setEmail('')
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
    
      <div className="relative " id="Home" >
        <Header/>
        {/* <img
          className="w-full h-auto mx-auto p-4"
          src={images.AboutUs}
          alt="Gym profile"
        /> */}
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showThumbs={false}
          interval={3000}
        >
          <div>
            <img src={images.AboutUs} alt="Slider" className="w-96 h-88 mt-25 mx-auto px-10" />
          </div>

          <div>
            <img src={images.slide1} alt="Slider"className="w-96 h-88 mt-25 mx-auto px-10" />
          </div>

          <div>
            <img src={images.slide2} alt="Slider"className="w-96 h-88 mt-25 mx-auto px-10" />
          </div>

          <div>
            <img src={images.slide3} alt="Slider"className="w-96 h-88 mt-25 mx-auto px-10" />
          </div>

          <div>
            <img src={images.slide4} alt="Slider"className="w-96 h-88 mt-25 mx-auto px-10" />
          </div>

          <div>
            <img src={images.slide5} alt="Slider"className="w-96 h-88 mt-25 mx-auto px-10" />
          </div>

           <div>
            <img src={images.slide6} alt="Slider"className="w-96 h-88 mt-25 mx-auto px-10" />
          </div>
          
        </Carousel>
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
<div className='mt-1'  id='Transformations'>

</div>
<div className="mt-8"  id='Service'>
  
<h1 className="font-roboto text-3xl text-yellow-500 md:text-5xl lg:text-4xl xl:text-5xl text-center border-black p-5 "> 
  Our Services
</h1>
<div className="flex flex-col gap-6 px-2 mt-6 lg:gap-2 lg:flex-row ">
  {services.map((service) => (
    <div key={service.title} className="grid grid-cols-2 gap-3 items-center">
      <div className="flex flex-col px-1">
        <h3 className="font-semibold text-yellow-400 md:text-3xl lg:text-2xl xl:text-3xl text-center lg:text-left border-b-2 border-yellow-500 pb-2">
          {service.title}
        </h3>
      </div>
      <div className="flex justify-center">
        <img src={service.image} alt={service.title} className="w-16 h-16 rounded-full mr-32" />
      </div>
      <p className="text-gray-100 lg:text-base lg:text-left col-span-2 pt-3 text-justify">
        {service.description}
      </p>
    </div>
  ))}
</div>

</div>


<div className="mt-10" id='ContactUs'>
 
  <div className="flex gap-8">
    <div className="flex-1 flex items-center">
      <img
        className="w-72   h-72 mx-auto p-4 text-yellow-600 mt-10"
        src={images.contactus2}
        alt="Contact Us"
      />
    </div>
    <div className="lg:w-1/2 flex flex-col items-start mt-12">
    <h1 className="font-roboto text-3xl text-center text-yellow-500 md:text-5xl lg:text-4xl xl:text-5xl border-black pb-5">
    Contact Us
  </h1>
  <div className="flex gap-4 ">
  <div className="flex flex-col max-w-full">
    <label className="font-roboto text-yellow-500 text-2xl font-semibold  mt-4 mb-4" htmlFor="fullName">Full Name:</label>
    <input
      className="border-b-2 border-yellow-500 bg-transparent text-yellow-500 py-2 mx-1 w-full max-w-full pr-12 px-4"
      type="text"
      id="fullName" 
      placeholder="Please Enter your Name"
      onChange={handleFullNameChange}
      required
    />
    {fullnameError && <p className="text-red-500 mt-2">{fullnameError}</p>}
  </div>
  
  <div className="flex flex-col max-w-full">
    <label className="font-roboto text-yellow-500 text-2xl font-semibold  mt-4 mb-4 mx-10" htmlFor="email">Email:</label>
    <input
      className="border-b-2 border-yellow-500 bg-transparent text-yellow-500 py-2 mx-11 w-full max-w-full px-4"
      type="email"
      id="email"
      placeholder="Please Enter your Email"
      onChange={handleEmailChange}
      required
      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
      title="Please enter a valid email address"
    />
    {emailError && <p className="text-red-500 mt-2 mx-10">{emailError}</p>}
  </div>
</div>

      <label className="font-roboto text-yellow-500 text-2xl font-semibold mt-7 mb-3" htmlFor="subject">Subject:</label>
      <textarea
        className="border-b-2 border-yellow-500 bg-transparent text-yellow-500 py-2 px-4 w-full h-18"
        id="subject"
        placeholder="Enter your message here"
        onChange={handleSubjectChange}
        required
      ></textarea>
   
      {subjectError && <p className="text-red-500 mt-2">{subjectError}</p>}
      <div className="lg:w-1/2 flex items-center justify-right">
        <button className="px-8 py-3 bg-yellow-500 text-black font-bold  rounded-md transition-transform transform-gpu hover:scale-110 duration-300 mt-6 lg:mt-10" onClick={handlclickSubmit}>
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
