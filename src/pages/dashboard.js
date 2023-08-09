import React, { useState } from 'react';
import Style from './style.css';
function Dashboard() {
const [activeLink, setActiveLink] = useState('')
const handleSidebarItemClick = (link) => {
  setActiveLink(link);
};
  return (
   
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
      <div className="fixed w-full flex items-center justify-between h-14 text-white z-10">
        <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-zinc-900 dark:bg-gray-800 border-none">
          <img className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden " src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg" />
          <span className="hidden md:block text-white">ADMIN</span>
        </div>
        <div className="flex justify-between items-center h-14 bg-zinc-900 dark:bg-gray-800 header-right">
          <div className="bg-zinc-900 rounded flex items-center w-full max-w-xl mr-4 p-2 shadow-sm  ">
           
          </div>
          <ul className="flex items-center">
           
            <li>
              <a href="#" className="flex items-center mr-4 text-white hover:text-yellow-500">
                <span className="inline-flex mr-1 text-white hover:text-yellow-500">
                  <svg className="text-white hover:text-yellow-500 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                </span>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="fixed flex flex-col top-14 left-0 w-6 hover:w-52 md:w-48 bg-zinc-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
        <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5 hidden md:block">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm text-white font-light tracking-wide text-gray-400 uppercase">Main</div>
              </div>
            </li>
            <li>
            <a
                href="dashboard"
                className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-zinc-900 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-yellow-500 ${
                  activeLink === 'Dashboard' ? 'border-yellow-500' : 'border-transparent'
                } dark:hover:border-gray-800 pr-6`}
                onClick={() => handleSidebarItemClick('Dashboard')}
              >               
                <span className="inline-flex justify-center items-center ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                </span>
                <span className="ml-2  text-white text-sm tracking-wide truncate">Dashboard</span>
              </a>
            </li>
            
            <li>
              <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-zinc-900 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-yellow-500 dark:hover:border-gray-800 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17l3 3 3-3M12 2v10"></path>
</svg>                </span>
                <span className="ml-2 text-sm text-white tracking-wide truncate">Trainers</span>
              </a>
            </li>
            <li>
            <a
                href="products"
                className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-zinc-900 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-yellow-500 ${
                  activeLink === 'Products' ? 'border-yellow-500' : 'border-transparent'
                } dark:hover:border-gray-800 pr-6`}
                onClick={() => handleSidebarItemClick('Products')}
              >                
              <span className="inline-flex justify-center items-center ml-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20h-2a2 2 0 01-2-2v-3c0-2.209 1.791-4 4-4s4 1.791 4 4v3a2 2 0 01-2 2z"></path>
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18v12H3z"></path>
</svg>                </span>
                <span className="ml-2 text-sm text-white tracking-wide truncate">Products</span>
              </a>
            </li>
            <li>
              <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-zinc-900 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-yellow-500 dark:hover:border-gray-800 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20h-2a2 2 0 01-2-2v-3c0-2.209 1.791-4 4-4s4 1.791 4 4v3a2 2 0 01-2 2z"></path>
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18v12H3z"></path>
</svg>
                </span>
                <span className="ml-2 text-sm text-white tracking-wide truncate">Orders</span>
              </a>
            </li>
            <li>
              <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-zinc-900 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-yellow-500 dark:hover:border-gray-800 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                </span>
                <span className="ml-2 text-sm text-white tracking-wide truncate">Feedbacks</span>
              </a>
            </li>
           
            <li className="px-5 hidden md:block">
              <div className="flex flex-row items-center mt-5 h-8">
                <div className="text-sm font-light tracking-wide text-white uppercase">Settings</div>
              </div>
            </li>
            <li>
              <a href="/updateAdmin" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-zinc-900 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-yellow-500 dark:hover:border-gray-800 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </span>
                <span className="ml-2 text-sm text-white tracking-wide truncate">Update Profile</span>
              </a>
            </li>
            <li>
              <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-zinc-900 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-yellow-500 dark:hover:border-gray-800 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a4 4 0 11-8 0 4 4 0 018 0zM12 20a7 7 0 110-14 7 7 0 010 14z"></path>
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 15v2a2 2 0 002 2h2a2 2 0 002-2v-2m-1-5V7a2 2 0 012-2h2a2 2 0 012 2v3m0 2.5v4"></path>
</svg>
                </span>
                <span className="ml-2 text-sm text-white tracking-wide truncate">Edit Password</span>
              </a>
            </li>
          </ul>
        </div>
      </div> 
      {/* content */}
      </div>
      );
}
<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.8.0/dist/alpine.min.js" defer></script>

export default Dashboard;