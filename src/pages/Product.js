import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsPlus, BsEyeFill } from 'react-icons/bs/index.esm.js';
import { CartContext } from './CartContext.js';

const Product = ({ product, categories }) => {
  const { addToCart } = useContext(CartContext);
 

  const { _id, imagePath, name, price, quantity } = product;

  const category = categories.find(c => c._id === product.category);
  const categoryName = category ? category.name : 'Uncategorized';

  const truncatedName = name.length > 20 ? name.substring(0, 17) + '...' : name;

  const scrollToTopAndNavigate = () => {
    window.scrollTo(0, 0); 
    window.location.href = `/product/${_id}`; 
  };

  

  return (
    <div>
      <div className='h-[300px] mb-4 relative overflow-hidden group transition'>
        <div className='w-full h-full flex justify-center items-center'>
          {/* image */}
          <div className='w-full h-full mx-auto flex justify-center items-center'>
            <div
              className='w-full h-full overflow-hidden group-hover:scale-110 transition duration-300'
            >
              <img
                className='w-full h-full object-cover'
                src={`/uploads/usersImages/${imagePath}`}
                alt={name}
              />
            </div>
          </div>
        </div>
        {/* buttons */}
        <div className='absolute top-3 right-8 group-hover:right-4 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
          <button onClick={() => addToCart(product, _id)}>
            <div className='flex justify-center items-center text-black w-12 h-12 bg-yellow-500'>
              <BsPlus className='text-3xl' />
            </div>
          </button>
          <div
            onClick={scrollToTopAndNavigate}
            className='w-12 h-12 bg-yellow-500 flex justify-center items-center text-black drop-shadow-xl rounded-full hover:rounded-lg transition-all'
          >
            <BsEyeFill className='group-hover:text-red-500' />
          </div>
        </div>
      </div>
      {/*category & title & price */}
      <div>
        <div className='text-xl capitalize text-white mb-1'> category : {categoryName}</div>
        <Link to={`/product/${_id}`}>
          <h2 className='font-semibold text-2xl text-yellow-500 mb-1' title={name}>
            {truncatedName}
          </h2>
        </Link>
        <div className='font-semibold text-xl text-red-500'>$ {price}</div>
        <div className='font-semibold text-xl text-green-500'>Quantity: {quantity}</div>
      </div>
    </div>
  );
};

export default Product;
