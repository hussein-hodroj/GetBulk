import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { images } from '../constants/index.js';

const Header = () => {
  const [navIsVisible, setNavIsVisible] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

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

  return (
    <section>
      <header className={`fixed top-0 left-0 right-0 mx-auto px-10 flex items-center justify-between bg-transparent z-50 backdrop-blur-lg`}>
        <div className="flex items-center">
          <img src={images.Logo} alt="Logo" className="w-16 h-16" />
          <h1 className="font-semibold text-xl ml-2 text-yellow-500">Get Bulk</h1>
        </div>
        {/* Menu Icon (Positioned at the top right corner) */}
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
        {/* Navigation Links */}
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
                href="http://localhost:3000/"
                className={`href ${
                  activeLink === 'Home' ? 'text-yellow-500 underline' : 'hover:text-yellow-500 hover:underline'
                } transition-all duration-300 transform scale-100 hover:scale-110`}
                onClick={() => handleLinkClick('Home')}
              >
                Home
              </a>
              <a
                href="http://localhost:3000/#AboutUs"
                className={`href ${
                  activeLink === 'AboutUs' ? 'text-yellow-500 underline' : 'hover:text-yellow-500 hover:underline'
                } transition-all duration-300 transform scale-100 hover:scale-110`}
                onClick={() => handleLinkClick('AboutUs')}
              >
                About Us
              </a>
              <a
                href="http://localhost:3000/#Service"
                className={`href ${
                  activeLink === 'Service' ? 'text-yellow-500 underline' : 'hover:text-yellow-500 hover:underline'
                } transition-all duration-300 transform scale-100 hover:scale-110`}
                onClick={() => handleLinkClick('Service')}
              >
                Service
              </a>
              <a
                href="http://localhost:3000/produ#"
                className={`href ${
                  activeLink === 'produ' ? 'text-yellow-500 underline' : 'hover:text-yellow-500 hover:underline'
                } transition-all duration-300 transform scale-100 hover:scale-110`}
                onClick={() => handleLinkClick('produ')}
              >
                Product
              </a> 
              <a
                href="http://localhost:3000/#ContactUs"
                className={`href ${
                  activeLink === 'ContactUs' ? 'text-yellow-500 underline' : 'hover:text-yellow-500 hover:underline'
                } transition-all duration-300 transform scale-100 hover:scale-110`}
                onClick={() => handleLinkClick('ContactUs')}
              >
                Contact Us
              </a>
            </nav>
          </header>
        </div>
      </header>
    </section>
  );
};
   
export default Header;
