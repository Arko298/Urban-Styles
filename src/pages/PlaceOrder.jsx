import React, { useState, useContext } from 'react'; 
import Title from '../components/Title'; 
import CartTotal from '../components/CartTotal'; 
import { assets } from '../assets/assets'; 
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod'); 
  const { navigate } = useContext(ShopContext); 

  // Function to check if a payment method is selected
  const isSelected = (value) => method === value;

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/*---- Left Side (Delivery Information) ---*/}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        {/* Title for Delivery Information */}
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        
        {/* First and Last Name Inputs */}
        <div className='flex gap-3'>
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='First name'
          />
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='Last name'
          />
        </div>
        
        {/* Email Input */}
        <input
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type='email'
          placeholder='Email address'
        />
        
        {/* Street Input */}
        <input
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type='text'
          placeholder='Street'
        />
        
        {/* City and State Inputs */}
        <div className='flex gap-3'>
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='City'
          />
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='State'
          />
        </div>
        
        {/* Zipcode and Country Inputs */}
        <div className='flex gap-3'>
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='number'
            placeholder='Zipcode'
          />
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='Country'
          />
        </div>
        
        {/* Phone Input */}
        <input
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type='number'
          placeholder='Phone'
        />
      </div>
      
      {/*------ Right Side (Payment and Order Summary) -----*/}
      <div className='mt-8'>
        {/* Cart Total Summary */}
        <div className='mt-8 min-w-80'>
          <CartTotal /> {/* Component displaying total cart cost */}
        </div>

        {/* Payment Method Section */}
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          
          {/* Payment Method Selection */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            
            {/* Stripe Payment Option */}
            <div
              onClick={() => setMethod('stripe')} // Set method to 'stripe' on click
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${isSelected('stripe') ? 'border-green-300' : ''}`} // Highlight if selected
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${isSelected('stripe') ? 'bg-green-500' : ''}`} />
              <img className='h-7 mx-4' src={assets.stripe_logo} alt='Stripe' /> {/* Stripe logo */}
            </div>
            
            {/* Razorpay Payment Option */}
            <div
              onClick={() => setMethod('razorpay')} // Set method to 'razorpay' on click
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${isSelected('razorpay') ? 'border-green-300' : ''}`} // Highlight if selected
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${isSelected('razorpay') ? 'bg-green-500' : ''}`} />
              <img className='h-12 mx-4' src={assets.razorpay_logo} alt='Razorpay' /> {/* Razorpay logo */}
            </div>

            {/* Cash on Delivery Option */}
            <div
              onClick={() => setMethod('cod')} // Set method to 'cod' (cash on delivery) on click
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${isSelected('cod') ? 'border-green-300' : ''}`} // Highlight if selected
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${isSelected('cod') ? 'bg-green-500' : ''}`} />
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p> {/* Cash on delivery label */}
            </div>
          </div>
          
          {/* Place Order Button */}
          <div className='w-full text-end mt-8'>
            <button onClick={() => navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm'>
              PLACE ORDER
            </button> {/* Button redirects to the orders page after placing the order */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
