import React, { useContext, useState } from 'react'; // Import useState
import { Link } from 'react-router-dom';
import { FaTimes, FaTrash } from 'react-icons/fa/index.esm.js'; 
import CartItem from './CartItem.js';
import { SidebarContext } from './SidebarContext.js';
import { CartContext } from './CartContext.js';
import { ProductContext } from './ProductContext.js';
import CheckoutModal from './ordermodal.js'; 

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);
  const { products } = useContext(ProductContext);

  const [isModalOpen, setIsModalOpen] = useState(false); // Add useState here

  const handleCheckoutClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={`${isOpen ? 'right-0' : '-right-full'} w-full bg-white fixed top-20 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}>
      <div className='flex items-center justify-between py-6 border-b'>
        <div className='uppercase text-sm font-semibold'>Shopping Bag ({itemAmount})</div>
        <div onClick={handleClose} className='cursor-pointer w-8 h-8 flex justify-center items-center'>
          <FaTimes /> {/* Use the Font Awesome close icon */}
        </div>
      </div>
      <div className='flex flex-col gap-y-2 h-[420px] lg:h-[400px] overflow-y-auto overflow-x-hidden border-b'>
        {cart.map(cartItem => {
          const product = products.find(product => product._id === cartItem.product._id);
          return <CartItem key={cartItem.product._id} cartItem={cartItem} product={product} />;
        })}
      </div>
      <div className='flex flex-col gap-y-3 py-4 mt-4'>
        <div className='flex w-full justify-between items-center'>
          <div className='uppercase font-semibold'>
            <span className='mr-2'>Total:</span> $ {parseFloat(total).toFixed(2)}
          </div>
          <div onClick={clearCart} className='cursor-pointer py-4 bg-yellow-500 text-white hover:bg-black transition-colors w-12 h-12 flex justify-center items-center text-xl'>
            <FaTrash /> {/* Use the Font Awesome trash icon */}
          </div>
        </div>
        
        <Link to="#" onClick={handleCheckoutClick} className='bg-yellow-500 hover:bg-black transition-colors flex p-4 justify-center items-center text-white w-full font-medium'>
        Check Out
      </Link>
      <CheckoutModal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} selectedProducts={cart} total={total} />
      </div>
    </div>
  );
};

export default Sidebar;
