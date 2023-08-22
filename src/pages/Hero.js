//import images
import WomanImg from '../img/mm.png';
//import Link 
import {Link} from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
//sidebar context
import { SidebarContext } from './SidebarContext.js';
//cart context
import { CartContext } from './CartContext.js';
//import icons 
import { BsBag } from 'react-icons/bs/index.esm.js';
import Header from './Header.jsx';



const Hero = () => {
 //header state
 const { isOpen , setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);


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
        <h1 className='text-[70px] leading-[1.1] font-light mb-4 text-white'>Power in every bite <br />
        <span className='text-[40px] leading-[1.1] font-light mb-4 text-white'>Food your body craves for</span>
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
    </div>


    );
};

export default Hero;
