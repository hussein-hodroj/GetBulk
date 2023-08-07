import React from 'react';
//import images
import WomanImg from '../img/mm.png';
//import Link 
import {Link} from 'react-router-dom';


const Hero = () => {
  return(
     <section className='h-[800px] bg-black bg-no-repeat bg-cover bg-center py-24'>
    <div className="container mx-auto flex justify-around h-full">
      {/*text */}
      <div className='flex flex-col justify-center'>
        {/* pretitle */}
        <div className='font-semibold flex items-center uppercase text-white'>
          <div className='w-10 h-[2px] bg-yellow-500 mr-3 '></div>New Trend
        </div>
        {/*title */}
        <h1 className='text-[70px] leading-[1.1] font-light mb-4 text-white'>Limited-Time Sale <br />
        <span>WOMENS</span>
        </h1>
        <Link to={'/'} className='self-start uppercase font-semibold border-b-2 border-primary text-white'>
          Discover More
        </Link>
      </div>
      {/*image*/}
      <div className='hidden lg:block my-2'>
        <img src={WomanImg} alt="" />
      </div>
    </div>
    </section>
    );
};

export default Hero;
