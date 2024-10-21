import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Product from './pages/Product'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Contact from './pages/Contact'; 

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {/* Toast container for displaying notifications */}
      <ToastContainer />
      
      {/* Main Navigation Bar */}
      <Navbar />
      
      {/* Search Bar component for searching products */}
      <SearchBar />
      
      {/* Define routes for the application */}
      <Routes>
        {/* Home page route */}
        <Route path='/' element={<Home />} />
        
        {/* Collection page route */}
        <Route path='/collection' element={<Collection />} />
        
        {/* About page route */}
        <Route path='/about' element={<About />} />
        
        {/* Contact page route */}
        <Route path='/contact' element={<Contact />} />
        
        {/* Dynamic product page route based on productId */}
        <Route path='/product/:productId' element={<Product />} />
        
        {/* Cart page route */}
        <Route path='/cart' element={<Cart />} />
        
        {/* Login page route */}
        <Route path='/login' element={<Login />} />
        
        {/* Place order page route */}
        <Route path='/place-order' element={<PlaceOrder />} />
        
        {/* Orders page route to view past orders */}
        <Route path='/orders' element={<Orders />} />
      </Routes>
      
      {/* Footer component for the application */}
      <Footer />
    </div>
  )
}

export default App
