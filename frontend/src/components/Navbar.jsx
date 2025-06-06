import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { useLogoutMutation } from '../redux/api/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
  // State to manage the visibility of the sidebar menu
  const [visible, setVisible] = useState(false);
  
  // Accessing context values for controlling search visibility and getting cart count
  const { setShowSearch, getCartCount } = useContext(ShopContext);

  const [logoutApiCall]=useLogoutMutation();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {userInfo}= useSelector((state)=>state.auth);
  const isMainAdmin=userInfo?.isAdmin === true;

  // Function to handle logout
  const logoutHandler = async () => {
   try {
     await logoutApiCall().unwrap();
     localStorage.removeItem('token');
     dispatch(logout());
     navigate('/login');
     toast.success("Logged out Successfully");
   } catch (error) {
    console.error(error);
   }
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      {/* Logo Link */}
      <Link to='/'>
        <img src={assets.BrandLogo} className='w-44' alt='Brand Logo' />
      </Link>

      {/* Navigation Links for larger screens */}
      <ul className='hidden sm:flex gap-5 text-lg text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 ' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 ' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 ' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 ' />
        </NavLink>
      </ul>

      {/* Icons for search, profile, cart, and mobile menu */}
      <div className='flex items-center gap-6'>
        {/* Search Icon */}
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt='Search Icon' />
        
        {/* Profile Icon and Dropdown Menu */}
        <div className='group relative'>
          <Link to='/login'>
            <img className='w-5 cursor-pointer' src={assets.profile_icon} alt='Profile Icon' />
          </Link>
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <Link to="/profile" className='cursor-pointer hover:text-black'>My Profile</Link>
              <Link to="/orders" className='cursor-pointer hover:text-black'>Orders</Link>
              <Link 
              onClick={logoutHandler}
              className='cursor-pointer hover:text-black'>Logout</Link>
            </div>
            {isMainAdmin && (
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                <Link to="/admin/userlist" className='cursor-pointer hover:text-black'>Users</Link>
                <Link to="/admin/productList" className='cursor-pointer hover:text-black'>Products</Link>
                <Link to="/admin/categoryList" className='cursor-pointer hover:text-black'>Categories</Link>
                <Link to="/admin/typesList" className='cursor-pointer hover:text-black'>Types</Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Cart Icon with Cart Count */}
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt='Cart Icon' />
          <p className='absolute right-[-5px] bottom w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            {getCartCount()}
          </p>
        </Link>
        
        {/* Mobile Menu Icon */}
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt='Menu Icon' />
      </div>

      {/* Sidebar Menu for smaller screens */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          {/* Back Button to close the sidebar */}
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='Back Icon' />
            <p>Back</p>
          </div>
          {/* Navigation Links for sidebar */}
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>
            HOME
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>
            COLLECTION
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>
            ABOUT
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
