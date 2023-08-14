import React from 'react';

const Footer = () => {   
  return (
    <section className="mx-auto px-5 mt-0 bg-black relative">
  <footer className="bg-black text-center lg:py-0">
    
    <div className="col-span-2 container mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between text-yellow-500">
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

      <div className="flex-1 mt-2 lg:mt-4 text-center">
        <p className="text-xs lg:text-sm font-roboto font-semibold">&copy; 2023 GetBulk Website.</p>
      </div>
    </div>
  </footer>
</section>

  );
};

export default Footer;
