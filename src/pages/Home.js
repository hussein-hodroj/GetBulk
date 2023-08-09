import React, { useState, useContext } from 'react';
import { ProductContext } from './ProductContext.js';
import Product from './Product.js';
import Hero from './Hero.js';

const Home = () => {
  const { products, categories, selectedCategory, setSelectedCategory } = useContext(ProductContext);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedCategory) {
      return matchSearch && product.category === selectedCategory;
    }

    return matchSearch;
  });

  const handleCategoryChange = (selectedValue) => {
    setSelectedCategory(selectedValue);
  };

  return (
    <div className='bg-black'>
      <Hero />
      
      <div className='my-4 mx-auto max-w-md'>
        <label className='block text-yellow-500 text-sm font-bold mb-2' htmlFor='category'>
          Search for a product
        </label>
        <input
          type='text'
          placeholder='Search products...'
          className='w-full p-2 border rounded'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='my-4 mx-auto max-w-md'>
        <div className='mb-2'>
          <label className='block text-yellow-500 text-sm font-bold mb-2' htmlFor='category'>
            Category
          </label>
          <select
            className='shadow mb-2 border rounded py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
      </div>

      <section className='py-16'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
            {filteredProducts.map((product) => (
              <Product product={product} key={product._id} categories={categories} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
