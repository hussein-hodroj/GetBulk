import React, { useState, useContext } from 'react';
import { ProductContext } from './ProductContext.js';
import Product from './Product.js';
import Hero from './Hero.js';
import { FaWhatsapp } from 'react-icons/fa/index.esm.js';

const Home = () => {
  const { products, categories, selectedCategory, setSelectedCategory } = useContext(ProductContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [sortByName, setSortByName] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedCategory) {
      return matchSearch && product.category === selectedCategory;
    }

    return matchSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (sortOrder === 'highToLow') {
      return b.price - a.price;
    } else if (sortOrder === 'lowToHigh') {
      return a.price - b.price;
    } else if (sortByName === 'aToZ') {
      return nameA.localeCompare(nameB); 
    } else if (sortByName === 'zToA') {
      return nameB.localeCompare(nameA); // Sort Z to A
    }
    return 0;
  });

  const handleCategoryChange = (selectedValue) => {
    setSelectedCategory(selectedValue);
  };
  const handleWhatsAppClick = () => {
    const chatSection = document.getElementById('chat-section'); 
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className='bg-zinc-900'>
      <Hero />

      <div className='my-6 mx-auto max-w-md flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center justify-center'>
        <div className='flex-1 p-2'>
          <label className='flex text-yellow-500 text-xl font-bold mb-5 w-60' htmlFor='category'>
            Search for a product
          </label>
          <input
            type='text'
            placeholder='Search products...'
            className='w-full p-2 border rounded text-gray-700'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='flex-1 p-2'>
          <label className='block text-yellow-500 text-xl font-bold mb-6 w-60' htmlFor='category'>
            Category
          </label>
          <select
            className='shadow mb-2 border rounded py-2 px-2 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='category'
            name='category'
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value=''>All categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className='flex-1 p-2'>
          <label className='block text-yellow-500 text-xl font-bold mb-6 w-60' htmlFor='category'>
            Sort by Price
          </label>
          <select
            className='shadow mb-2 border rounded py-2 px-2 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value=''> Sort Price</option>
            <option value='highToLow'>High to Low</option>
            <option value='lowToHigh'>Low to High</option>
          </select>
        </div>
        <div className='flex-1 p-2'>
          <label className='block text-yellow-500 text-xl font-bold mb-6 w-60' htmlFor='category'>
            Sort by Name
          </label>
          <select
            className='shadow mb-2 border rounded py-2 px-2 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            value={sortByName}
            onChange={(e) => setSortByName(e.target.value)}
          >
            <option value=''>Sort Name</option>
            <option value='aToZ'>A to Z</option>
            <option value='zToA'>Z to A</option>
          </select>
        </div>
      </div>

      <section className='py-16'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
            {sortedProducts.map((product) => (
              <Product product={product} key={product._id} categories={categories} />
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
  );
};

export default Home;
