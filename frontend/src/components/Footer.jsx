import React from 'react';
import { assets } from '../assets/assets'; 

const Footer = () => {
  return (
    <div>
      {/* Main Footer Content */}
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* Brand Logo and Description */}
        <div>
          <img src={assets.BrandLogo} className='mb-3 w-44 -m-5' alt='' />
          <p className='w-full md:w-2/3 -m-4 text-gray-600'>
            Visit our stores across the country or shop online for the latest collections.
          </p>
        </div>

        {/* Company Information Links */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Private Policy</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+1-212-456-7890</li>
            <li>contact@urbanStyles.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div>
        <hr /> {/* Horizontal line */}
        <p className='py-5 text-sm text-center'>
          Copyright 2024@ urbanStyles.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
