import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductContext } from './ProductContext.js';
import { Link } from 'react-router-dom';
import { SidebarContext } from './SidebarContext.js';
import { CartContext } from './CartContext.js';
import { BsBag } from 'react-icons/bs/index.esm.js';
import Product from './Product.js';
import { FaWhatsapp } from 'react-icons/fa/index.esm.js';
import Header from './Header.jsx';
import Footer from './Footer.jsx';



const Home = () => {

   useEffect(() => {
    
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const initialSelectedCategory = location.state ? location.state.selectedCategory : ''; 

  const categoryOptions = location.state ? location.state.categories : [];

  const { products, categories } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState(initialSelectedCategory); 

  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [sortByName, setSortByName] = useState('');
  
  useEffect(() => {
    if (selectedCategory) {
      setSelectedCategory(selectedCategory);
    }
  }, [selectedCategory]);

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
      return nameB.localeCompare(nameA); 
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
    <div >
      <Header/>
      
      <div className='sticky top-0 bg-black mx-auto flex items-center justify-between pt-20 z-10'>
        <Link to={'/produ'}>
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
    
    <div className='bg-black'>
      <div className=' mx-auto pt-20 max-w-md flex flex-col md:flex-row  space-y-4 md:space-y-0 md:space-x-4 items-center justify-center'>
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
  
      <section className='py-20'>
        <div className='container mx-auto'>
          {sortedProducts.length === 0 ? (
            <p className='text-5xl text-yellow-500 flex justify-center items-center'>No available products.</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
              {sortedProducts.map((product) => (
                <Product product={product} key={product._id} categories={categories} />
              ))}
            </div>
          )}
        </div>
        <section className='mt-8'>
        <div
          onClick={() => window.open('https://wa.me/03638693', '_blank')}
          className='cursor-pointer flex fixed right-4 bottom-4 z-20 transition-all duration-300 transform hover:-translate-y-1'
        >
          <FaWhatsapp className='text-5xl text-green-500' />
        </div>
        </section>
      </section>
     
    </div>

    <Footer/>
    </div>
  );
};

export default Home;
