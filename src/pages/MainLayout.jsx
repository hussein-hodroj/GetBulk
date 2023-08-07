import React from 'react'
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Hero from './Hero.jsx';

  
const MainLayout = ({children}) => {
  return (
    <div>

       <Header/>
        <Hero/>
        {children}
        <Footer/>
    
    </div>
  )
}

export default MainLayout;