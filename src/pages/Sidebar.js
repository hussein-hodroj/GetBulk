import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaTrash } from 'react-icons/fa/index.esm.js'; // Import the icons from react-icons/fa
import CartItem from './CartItem.js';
import { SidebarContext } from './SidebarContext.js';
import { CartContext } from './CartContext.js';

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);

  return (
    <div className={`${isOpen ? 'right-0' : '-right-full'} w-full bg-white fixed top-10 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}>
      <div className='flex items-center justify-between py-6 border-b'>
        <div className='uppercase text-sm font-semibold'>Shopping Bag ({itemAmount})</div>
        <div onClick={handleClose} className='cursor-pointer w-8 h-8 flex justify-center items-center'>
          <FaTimes /> {/* Use the Font Awesome close icon */}
        </div>
      </div>
      <div className='flex flex-col gap-y-2 h-[420px] lg:h-[300px] overflow-y-auto overflow-x-hidden border-b'>
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>
      <div className='flex flex-col gap-y-3 py-4 mt-4'>
        <div className='flex w-full justify-between items-center'>
          <div className='uppercase font-semibold'>
            <span className='mr-2'>Total:</span> $ {parseFloat(total).toFixed(2)}
          </div>
          <div onClick={clearCart} className='cursor-pointer py-4 bg-yellow-500 text-white w-12 h-12 flex justify-center items-center text-xl'>
            <FaTrash /> {/* Use the Font Awesome trash icon */}
          </div>
        </div>
        <Link to='/' className='bg-gray-200 flex p-4 justify-center items-center text-yellow w-full font-medium'>
          View Cart
        </Link>
        <Link to='/' className='bg-yellow-500 flex p-4 justify-center items-center text-white w-full font-medium'>
          Check Out
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
