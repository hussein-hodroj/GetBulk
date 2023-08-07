import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { images } from '../constants/index.js';

const NavItem = ({ name, id, isActive, onClick }) => {
  const handleLinkClick = (e) => {
    e.preventDefault();
    onClick(id);
  };

  return (
    <li className={`relative group`}>
      <a
        href={`#${id}`}
        className={`px-4 py-2 ${
          isActive ? 'text-yellow-500 underline' : 'text-yellow-500'
        } transition-colors duration-300 hover:text-yellow-300 hover:underline`}
        onClick={handleLinkClick}
      >
        {name}
      </a>
    </li>
  );
};

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
  };

  return (
    <section>
      <header className="mx-auto px-10 flex items-center justify-between mb-0 bg-black">
        <div className="flex items-center">
          <img src={images.Logo} alt="Logo" className="w-16 h-16" />
          <h1 className="font-semibold text-xl ml-2 text-yellow-500">Get Bulk</h1>
        </div>
        <div className="lg:hidden z-50">
          {navIsVisible ? (
            <AiOutlineClose
              className="w-6 h-6"
              style={{ color: '#f0b20a' }}
              onClick={navIsVisibilityHandler}
            />
          ) : (
            <AiOutlineMenu
              className="w-6 h-6"
              style={{ color: '#f5f2eb' }}
              onClick={navIsVisibilityHandler}
            />
          )}
        </div>
        <div
          className={`${
            navIsVisible ? 'right-0' : '-right-full'
          } mt-[100px] lg:mt-0 bg-black text-yellow-500 items-center lg:bg-transparent z-[49] flex flex-col justify-center w-full lg:w-auto lg:justify-end lg:flex-row fixed top-0 bottom-0 lg:static gap-x-9 item-center sm:px-0 sm:mt-0`}
        >
          <header>
          
            <nav className={`lg:flex ${
              navIsVisible ? 'flex' : 'hidden'
            } flex-col gap-y-5 lg:flex-row gap-x-5 font-semibold`}>
              <a href="http://localhost:3000/" className="href">Home</a>
                <a href="http://localhost:3000/#AboutUs" className="href">About Us</a>
                <a href="http://localhost:3000/#Service" className="href">Service</a>
                <a href="http://localhost:3000/produ" className="href">Product</a>
                <a href="http://localhost:3000/#ContactUs" className="href">Contact Us</a>
            </nav>
          </header>
         
        </div>
      </header>
    </section>
  );
};

export default Header;