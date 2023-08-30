import React, { useState, useEffect } from 'react';
import { images } from '../constants/index.js';
import axios from 'axios';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CarouselSlider from './CarouselSlider.js';

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
          {/* <div>
            <img src={images.AboutUs} alt="Slider" className="w-96 h-88 mt-25 mx-auto px-10" />
            <h1 className="font-roboto text-xl text-yellow-500 md:text-3xl lg:text-xl xl:text-3xl mr-24 ">
            "Train like a beast, look like a beauty.12"
          </h1>
          </div>

          <div>
            <img src={images.slide1} alt="Slider"className="w-96 h-88 mt-25 mx-auto px-10" />
            <h1 className="font-roboto text-xl text-yellow-500 md:text-3xl lg:text-xl xl:text-3xl mr-24 ">
            "Train like a beast, look like a beauty.343"
          </h1>
          </div>

          <div>
            <img src={images.slide2} alt="Slider"className="w-96 h-88 mt-25 mx-auto px-10" />
            <h1 className="font-roboto text-xl text-yellow-500 md:text-3xl lg:text-xl xl:text-3xl mr-24 ">
            "Train like a beast, look like a beauty.3434"
          </h1>
          </div>

          <div>
            <img src={images.slide3} alt="Slider"className="w-96 h-88 mt-25 mx-auto px-10" />
            <h1 className="font-roboto text-xl text-yellow-500 md:text-3xl lg:text-xl xl:text-3xl mr-24 ">
            "Train like a beast, look like a beauty.34343"
          </h1>
          </div>

          <div>
            <img src={images.slide4} alt="Slider"className="w-96 h-88 mt-25 mx-auto px-10" />
            <h1 className="font-roboto text-xl text-yellow-500 md:text-3xl lg:text-xl xl:text-3xl mr-24 ">
            "Train like a beast, look like a beauty434."
          </h1>
          </div>

          <div>
            <img src={images.slide5} alt="Slider"className="w-96 h-88 mt-25 mx-auto px-10" />
            <h1 className="font-roboto text-xl text-yellow-500 md:text-3xl lg:text-xl xl:text-3xl mr-24 ">
            "Train like a beast, look like a beauty434334."
          </h1>
          </div>

           <div>
            <img src={images.slide6} alt="Slider"className="w-96 h-88 mt-25 mx-auto px-10" />
            <h1 className="font-roboto text-xl text-yellow-500 md:text-3xl lg:text-xl xl:text-3xl mr-24 ">
            "Train like a beast, look like a beauty.334"
          </h1>
          </div> */}
            <div className="relative">
            <img src={images.AboutUs} alt="Slider" className="w-96 h-88 mt-25 mx-auto px-10 opacity-70" />
            <h1 className=" absolute font-roboto font-bold   text-yellow-500 inset-0 flex  pt-96 items-center justify-center pr-50 bg-black bg-opacity-5 text-xl md:text-3xl lg:text-xl xl:text-3xl mt-30 ">
              "Train like a beast, look like a beauty"
            </h1>
          </div>

          <div className="relative">
            <img src={images.slide1} alt="Slider" className="w-96 h-88 mt-25 mx-auto px-10 opacity-70" />
            <h1 className="absolute font-roboto font-bold   text-yellow-500 pt-96  inset-0 flex  items-center justify-center bg-black bg-opacity-5 text-xl md:text-3xl lg:text-xl xl:text-3xl">
              "The only bad workout is the one that didn't happen"
            </h1>
          </div>

          <div className="relative">
            <img src={images.slide2} alt="Slider" className="w-96 h-88 mt-25 mx-auto px-10 opacity-70" />
            <h1 className="absolute font-roboto font-bold   text-yellow-500 inset-0 pt-96  flex items-center justify-center bg-black bg-opacity-5 text-xl md:text-3xl lg:text-xl xl:text-3xl">
              "Stronger every rep, closer to my goal"
            </h1>
          </div>
          <div className="relative">
          <img src={images.slide3} alt="Slider"className="w-96 h-88 mt-25 mx-auto px-10 opacity-70" />
          <h1 className="absolute font-roboto font-bold   text-yellow-500 inset-0 flex  pt-96 items-center justify-center pb-20 bg-black bg-opacity-5 text-xl md:text-3xl lg:text-xl xl:text-3xl">
          "Push yourself because no one else will do it for you"
          </h1>
          </div>
          <div className="relative">
          <img src={images.slide4} alt="Slider"className="w-96 h-88 mt-25 mx-auto px-10 opacity-70" />
          <h1 className="absolute font-roboto font-bold   text-yellow-500 inset-0 flex  pt-96 pr-10 items-center justify-center  bg-black bg-opacity-5 text-xl md:text-3xl lg:text-xl xl:text-3xl">
          "Strive for progress, not perfection"
          </h1>
          </div>

            <div className="relative">
          <img src={images.slide5} alt="Slider"className="w-96 h-88 mt-25 mx-auto px-10 opacity-70" />
          <h1 className="absolute font-roboto font-bold   text-yellow-500 inset-0 flex  pt-96 items-center justify-center pr-20 bg-black bg-opacity-5 text-xl md:text-3xl lg:text-xl xl:text-3xl">
          "Sweat now, shine later"
          </h1>
          </div>
          
        </Carousel>
        <div className="absolute font-roboto text-yellow-500 top-0 left-0 w-full h-full flex flex-col justify-center items-center  ">
        
          
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
  <div className="flex-1 flex items-center" >
    <img
      className="w-80% h-80% mx-auto p-4"
      src={images.OpeningHours}
      alt="Opening Hours"
    />
  </div>
  <div className='mt-96' id='Transformations'></div>
</div>
<div className='' >
<CarouselSlider />
</div>
<div id='Service'className='mb-36'></div>
<div className=""  id='Service'>
  
<h1 className="font-roboto text-3xl text-yellow-500 md:text-5xl lg:text-4xl xl:text-5xl text-center border-black p-5 pb-16 "> 
  Our Services
</h1>

<div className="flex flex-col gap-6 px-10 mt-6 lg:gap-2 lg:flex-row service-grid">
  {services.map((service) => (
    <div key={service.title} className="border border-yellow-500 shadow-lg shadow-yellow-300  p-6 mr-6 rounded-lg flex lg:flex-col w-full lg:w-[400px]">
      <div className="flex items-center mb-4">
        <img src={service.image} alt={service.title} className="w-16 h-16 rounded-full mr-3" />
        <h3 className="font-semibold text-yellow-400 text-xl md:text-3xl lg:text-2xl xl:text-3xl text-center lg:text-left border-b-2 border-yellow-500 pb-3">
          {service.title}
        </h3>
      </div>
      <p className="text-gray-100 text-base md:text-xl lg:text-lg xl:text-xl mt-4 lg:mt-0 text-justify ">
        {service.description}
      </p>
    </div>
  ))}
</div>


</div>


<div className="mt-24" id='ContactUs'>
 
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
    <label className="font-roboto text-white text-2xl font-semibold  mt-4 mb-4" htmlFor="fullName">Full Name:</label>
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
    <label className="font-roboto text-white text-2xl font-semibold  mt-4 mb-4 mx-10" htmlFor="email">Email:</label>
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

      <label className="font-roboto text-white text-2xl font-semibold mt-7 mb-3" htmlFor="subject">Subject:</label>
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
