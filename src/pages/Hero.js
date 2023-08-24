import WomanImg from '../img/mm.png';
import { Link } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import { SidebarContext } from './SidebarContext.js';
import { CartContext } from './CartContext.js';
import { BsBag } from 'react-icons/bs/index.esm.js';
import Header from './Header.jsx';
import axios from 'axios';
import Footer from './Footer.jsx';
import { FaWhatsapp } from 'react-icons/fa/index.esm.js';


const Hero = () => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [categories, setCategories] = useState([]);

  const [selectedCategoryName, setSelectedCategoryName] = useState('');


  useEffect(() => {
    
    axios.get('http://localhost:8000/category/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log('Error fetching categories:', error);
      });
  }, []);

  const images = categories.map(category => {
    return { name: category.name, source: `/uploads/usersImages/${category.categoryimage}` };
  });

  const handleNext = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
    setSelectedCategoryName(images[newIndex].name);
  };
  
  const handlePrevious = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
    setSelectedCategoryName(images[newIndex].name);
  };
  
  const handleWhatsAppClick = () => {
    const chatSection = document.getElementById('chat-section'); 
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
 
  return(
    <div>

    <Header/>
     <section className='h-[800px] bg-black bg-no-repeat bg-cover bg-center py-24'>
       <div className='mx-auto flex items-center justify-between '>
        {/*Logo */}
        <Link to={'/'}>
  <div className="ml-20 mr-10 ">
    <svg className='w-12 h-12 fill-current text-yellow-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      {/* Home SVG path */}
      <path d="M12 2L2 12h3v8h14v-8h3L12 2zm0 2.83L19.17 12H4.83L12 4.83z"/>
    </svg>
  </div>
</Link>
    {/* cart */}
    <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer flex relative ml-4 mr-20'>
    <BsBag className='text-2xl text-yellow-500'/>
    <div className='bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center'>{itemAmount}</div>
      </div>
      </div>
    <div className="container mx-auto flex justify-around h-full">
      {/*text */}
      <div className='flex flex-col justify-center'>
        {/* pretitle */}
        <div className='font-semibold flex items-center uppercase text-white'>
          <div className='w-20 h-[5px] bg-yellow-500 mr-3 '></div>New Products
        </div>
        {/*title */}
        <h1 className='text-[70px] leading-[1.1] font-light mb-4 text-white font-serif'>Power in every bite <br />
        <span className='text-[40px] leading-[1.1] font-light mb-4 text-white font-serif'>Food your body craves for</span>
        </h1>
        {/* <Link to={'/'} className='self-start uppercase font-semibold border-b-2 border-primary text-white'>
          Discover More
        </Link> */}
      </div>
      {/*image*/}
      <div className='hidden lg:block my-2'>
        <img src={WomanImg} alt="" />
      </div>
    </div>
    </section>
    <section className="flex items-center justify-center bg-black text-yellow-500 text-[40px] ">
  <h2 className="text-center text-yellow-500 mb-28 font-serif">Our Categories</h2>
</section>
    <div className="flex items-center justify-center  bg-black">
        <button onClick={handlePrevious} className="mr-8  hover:text-yellow-500">
          Previous
        </button>
        <div className="flex space-x-2 mb-20">
        {images.map((image, index) => (
  <div
    key={index}
    className={`relative mb-40 mr-6 bg-black w-[200px] h-[400px] ${
      index === currentImageIndex ? 'opacity-100' : 'opacity-50'
    } transition-opacity duration-300 `}
  >
    <img src={image.source} alt={image.name} className="w-full h-full mb-8 " />
    <Link
      to="/Homeprodu"
      className="block text-[18px] text-center text-white hover:text-white hover:bg-yellow-500 transition-all duration-300 rounded-full py-2 border border-white"
    >
      {image.name}
    </Link>
    
  </div>
))}
</div>



        <button onClick={handleNext} className="ml-8 hover:text-yellow-500">
          Next
        </button>
      </div>

      
        <div
          onClick={() => window.open('https://wa.me/03638693', '_blank')}
          className='cursor-pointer  flex fixed right-4 bottom-4 z-20 transition-all duration-300 transform hover:-translate-y-1'
        >
          <FaWhatsapp className='text-5xl text-green-500' />
        </div>
      

      <Footer/>
    </div>
  );
};

export default Hero;