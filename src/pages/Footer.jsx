import React from 'react';

const Footer = () => {   
  return (
    <section className=" mx-auto px-5  mt-0 bg-black relative">
      <footer className="bg-black text-center lg:py-0 ">
        <div className="container mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between text-yellow-500">
          <div className="lg:w-1/3 px-3 mb-4 lg:mb-0">
            <h2 className="text-xl lg:text-lg font-semibold mb-1">Opening Hours</h2>
            <p className="text-sm lg:text-base font-roboto">Monday - Friday: 6:00 AM - 10:00 PM</p>
            <p className="text-sm lg:text-base font-roboto">Saturday: 8:00 AM - 8:00 PM</p>
          </div>
          <div className="mt-2 lg:mt-4">
            <p className="text-xs lg:text-sm font-roboto font-semibold">&copy; 2023 GetBulk Website. All rights reserved.</p>
          </div>
          <div className="lg:w-1/3 px-3 mb-4 lg:mb-0">
            <h2 className="text-xl lg:text-lg font-semibold mb-2">Follow Us</h2>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-blue-600">
              <img src="/instagram.svg" width={32} height={32} alt="" />
              </a>
              <a href="#" className="text-blue-600">
                <img src="/twitter.svg" width={32} height={32} alt="" />
              </a>
              <a href="#" className="text-pink-600">
              <img src="/facebook.svg" width={32} height={32} alt="" />
              </a>
            </div>
          </div>
          
        </div>
      </footer>
    </section>
  );
};

export default Footer;
