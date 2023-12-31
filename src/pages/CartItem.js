import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import { IoMdAdd, IoMdClose, IoMdRemove } from 'react-icons/io/index.esm.js';

import { CartContext } from './CartContext.js'

const CartItem = ({ cartItem }) => { 
  const { removeFromCart, increaseAmount, decreaseAmount } = useContext(CartContext);
  const { product, amount } = cartItem; 

  const { _id, name, imagePath, price , quantity } = product;
  return(
    <div className='flex gap-x-4 py-2 lg:px-4 border-b border-gray-200 w-full font-light text-gray-500'>
    <div className='w-full min-h-[150px] flex items-center gap-x-4'>
      {/* image */}
      <Link to={`/product/${_id}`}>
          <img className='max-w-[80px]' src={`/uploads/usersImages/${imagePath}`} alt={name} />
      </Link >
      <div className='w-full flex flex-col'>
        {/* title  */}
        <div className='flex justify-between mb-2'>
          <Link to={`/product/${_id}`} className="text-medium uppercase font-medium max-w-[240px] text-yellow-500 hover:underline">{name}</Link>
        {/* remove icon */}
        <div onClick={()=> removeFromCart(_id)} className='text-xl cursor-pointer'>
          <IoMdClose className='text-gray-500 hover:text-red-500 transition' />
        </div>
        </div>
        <div className='flex gap-x-2 h-[36px] text-sm'>
          {/* qty */}
          <div className='flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium'>
            {/* minus icon */}
            <div onClick={()=> decreaseAmount(_id)} className='flex-1 flex justify-center items-center cursor-pointer h-full text-black'>
              <IoMdRemove />
            </div>
            {/* amount */}
            <div className='h-full flex justify-center items-center px-2'>{amount}</div>
            {/* plus icon */}
            <div onClick={()=> increaseAmount(_id)} className='flex-1 h-full flex justify-center items-center cursor-pointer text-black'>
              <IoMdAdd />
            </div>
          </div>
          {/* item price */}
          <div className='flex-1 flex items-center justify-around text-red-500 text-sm font-medium'> P : {price} $ </div>
           {/* final price */}
           {/* make the price at 2 decimals*/}
           <div className='flex-1 flex justify-end items-center text-primary font-medium'>{`T: $ ${parseFloat(price * amount).toFixed(2)}`}</div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CartItem;
