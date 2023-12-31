import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SidebarContext } from './SidebarContext.js';
import { CartContext } from './CartContext.js';
import { ProductContext } from './ProductContext.js';
import { BsBag } from 'react-icons/bs/index.esm.js';
import Product from './Product.js'; 
import { FaWhatsapp } from 'react-icons/fa/index.esm.js';
import Header from './Header.jsx';
import Footer from './Footer.jsx';


const findRelatedProducts = (products, category) => {
  return products.filter(product => product.category === category);
};

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { products, categories } = useContext(ProductContext);
  const product = products.find(item => item._id === id);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  if (!product) {
    return (
      <section className='h-screen flex justify-center items-center bg-black text-white'>
        Loading...
      </section>
    );
  }

  const { name, price, description, imagePath, category, quantity } = product;

  const relatedProducts = findRelatedProducts(products, category);
  const otherRelatedProducts = relatedProducts.filter(
    (relatedProduct) =>
      relatedProduct._id !== id && relatedProduct.quantity > 0
  );
  
  const handleWhatsAppClick = () => {
    const chatSection = document.getElementById('chat-section'); 
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  

  return (
    <div>
       <Header/>
    
    <div className='bg-black text-white'>
      <div className='sticky top-0 bg-black mx-auto flex items-center justify-between pt-20 z-10'>
        <Link to={'/Homeprodu'}>
          <div className="ml-20 mr-10">
            <svg className='w-12 h-12 fill-current text-yellow-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 2L2 12h3v8h14v-8h3L12 2zm0 2.83L19.17 12H4.83L12 4.83z"/>
            </svg>
          </div>
        </Link>
        <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer flex relative ml-4 mr-20'>
          <BsBag className='text-2xl text-yellow-500'/>
          <div className='bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center'>{itemAmount}</div>
        </div>
      </div>

      <section className='pt-32 pb-12 lg:py-32 h-screen flex items-center'>
        <div className="container mx-auto">
          <div className='flex flex-col lg:flex-row items-center '>
            <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0 '>
              <div >
                <img  style={{ width: '400px', height: '390px' }}
                  src={`/uploads/usersImages/${imagePath}`} 
                  alt={name}
                />
              </div>
            </div>
            <div className='flex-1 text-center lg:text-left'>
              <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0'>{name}</h1>
              <div className='text-xl text-red-500 font-medium mb-6'>$ {price}</div>
              <div className='font-semibold text-xl text-green-500'>Quantity: {quantity}</div>
              
              <p className='mb-8'>{description}</p>
              <button onClick={() => addToCart(product, product._id)} className='bg-yellow-500 py-4 px-8 text-white'>Add to cart</button>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-black text-white py-12'>
        <div className='container mx-auto'>
          <h2 className='text-5xl font-semibold mb-8 flex flex-col items-center'>You May Also Like </h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {otherRelatedProducts.map((relatedProduct) => (
              <Product
                key={relatedProduct._id}
                product={relatedProduct}
                categories={categories}
              />
            ))}
          </div>
        </div>
      </section>
      <div
  onClick={() =>
    window.open('https://wa.me/03638693', '_blank')
  }
  className='cursor-pointer flex fixed right-4 bottom-4 z-20'
>
  <FaWhatsapp className='text-5xl text-green-500' />
</div>


    </div>
    <Footer/>
    </div>
  );
};

export default ProductDetails;
