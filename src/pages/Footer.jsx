import React from 'react';

const Footer = () => {   
  return (
    <section className="mx-auto px-5 mt-0 bg-black relative">
      <footer className="bg-black text-center lg:py-0">
        <div className="col-span-3 container mx-auto flex flex-col lg:flex-row lg:items-stretch lg:justify-between text-yellow-500 h-full">
          <div className="flex-1 flex flex-col items-center lg:w-1/3 py-5">
            <div className="flex items-center mr-40">
              <a href="#" className="text-blue-600">
                <img src="/phone.svg" width={32} height={32} alt="" />
              </a>
              <p className="text-yellow-500 font-roboto ml-2"> +961 70-497 758 </p>
            </div>
            <div className="flex items-center mt-2 mr-40">
              <a href="#" className="text-blue-600">
                <img src="/email.svg" width={32} height={32} alt="" />
              </a>
              <p className="text-yellow-500 font-roboto ml-2"> GetBulk@gym.com </p>
            </div>
          </div>
          <div className="flex-1 mt-2 lg:mt-9 text-center">
            <p className="text-xs lg:text-sm font-roboto font-semibold">GetBulk Website &copy; 2023</p>
          </div>
          <div className="lg:w-1/3 px-3 mb-4 lg:mb-0 flex-1 flex items-center justify-center flex-col">
            <h2 className="text-yellow-500 text-xl lg:text-lg font-semibold mb-2">Follow Us</h2>
           
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
