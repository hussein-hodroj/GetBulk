import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
//sidebar context
import { SidebarContext } from './SidebarContext.js';
//cart context
import { CartContext } from './CartContext.js';
import { ProductContext } from './ProductContext.js';
import { BsBag } from 'react-icons/bs/index.esm.js';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  // Get the single product based on the id
  const product = products.find((item) => item.id === parseInt(id));
   //header state
 const { isOpen , setIsOpen } = useContext(SidebarContext);
 const { itemAmount } = useContext(CartContext);

  // If product is not found
  if (!product) {
    return (
      <section className='h-screen flex justify-center items-center'>
        Loading...
      </section>
    );
  }

  // Destructure product
  const { title, price, description, image } = product;

  return (
    <div>
      {/* Logo and Cart Section */}
      <div className='mx-auto flex items-center justify-between'>
        {/*Logo */}
        <Link to={'/produ'}>
  <div className="ml-20 mr-10">
    <svg className='w-12 h-12 fill-current text-yellow-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      {/* Home SVG path */}
      <path d="M12 2L2 12h3v8h14v-8h3L12 2zm0 2.83L19.17 12H4.83L12 4.83z"/>
    </svg>
  </div>
</Link>
    {/* cart */}
    <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer flex relative ml-4 mr-20'>
    <BsBag className='text-2xl text-yellow-500'/>
    <div className='bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center'>{itemAmount}</div>
      </div>
      </div>

      {/* Product Details Section */}
      <section className='pt-32 pb-12 lg:py-32 h-screen flex items-center'>
        <div className="container mx-auto">
          {/* image & text wrapper */}
          <div className='flex flex-col lg:flex-row items-center '>
            {/* image */}
            <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0 '>
              <img className='max-w-[200px] lg:max-w-sm' src={image} alt="" />
            </div>
            {/* text */}
            <div className='flex-1 text-center lg:text-left'>
              <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0 '>{title}</h1>
              <div className='text-xl text-red-500 font-medium mb-6'>$ {price}</div>
              <p className='mb-8'>{description}</p>
              <button onClick={() => addToCart(product, product.id)} className='bg-yellow-500 py-4 px-8 text-white'>Add to cart</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
