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
import UserList from './pages/Admin/UserList.jsx'
import Profile from './pages/Profile'
import ProductList from './pages/Admin/ProductList'
import AdminRoute from './pages/Admin/AdminRoutes'
import CategoryList from './pages/Admin/CategoryList.jsx'
import TypesList from './pages/Admin/TypesList.jsx'
import Shipping from './pages/Shipping.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

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
        <Route path='/login' element={<Login />} />
        <Route index={true} path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />       
        <Route path='/cart' element={<Cart />} />    


        {/** For registered Users */}
        <Route path="" element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile />} />    
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path="/shipping" element={<Shipping/>}/>  
        <Route path='/orders/:id' element={<Orders />} />
        </Route>
      
        
      
        {/**For the admin */}
        <Route path='/admin' element={<AdminRoute />}>
        <Route path="userlist" element={<UserList/>} />
        <Route path="/admin/productList" element={<ProductList/>} />
        <Route path="/admin/categoryList" element={<CategoryList/>} />
        <Route path="/admin/typesList" element={<TypesList/>} />

      </Route>
      </Routes>
      {/* Footer component for the application */}
      <Footer />
    </div>
  )
}

export default App
