import React, { useContext } from 'react'; 
import { ShopContext } from '../context/ShopContext'; 
import Title from './Title'; 

const CartTotal = () => {
  // Destructuring values from ShopContext
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  return (
    <div className='w-full'>
      {/* Title for the Cart Totals section */}
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      {/* Breakdown of totals including Subtotal, Shipping Fee, and Total */}
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        {/* Subtotal - calculated based on cart amount */}
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency}{getCartAmount()}.00</p>
        </div>
        <hr /> {/* Horizontal line to separate sections */}

        {/* Shipping Fee - displayed with currency and delivery_fee from context */}
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency}{delivery_fee}.00</p>
        </div>
        <hr /> {/* Another horizontal line to separate sections */}

        {/* Total - if cart is empty (amount 0), total is 0; otherwise, subtotal + delivery fee */}
        <div className='flex justify-between'>
          <b>Total</b>
          <b>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
