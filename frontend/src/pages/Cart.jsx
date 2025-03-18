import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'; 
import Title from '../components/Title'; 
import { assets } from '../assets/assets'; 
import CartTotal from '../components/CartTotal'; 

const Cart = () => {
  // Destructuring values from ShopContext
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]); // State to hold formatted cart data
  
  // Effect to update cartData whenever cartItems change
  useEffect(() => {
    const tempData = []; // Temporary array to hold cart item data
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        // Check if the item quantity is greater than 0
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          });
        }
      }
    }
    setCartData(tempData); // Update cartData state
  }, [cartItems]);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} /> {/* Title for the cart section */}
      </div>
      <div>
        {/* Mapping through cartData to display items */}
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id); // Find the corresponding product data
            
            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr/-0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="" /> {/* Product image */}
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p> {/* Product name */}
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p> {/* Product price */}
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50 '>{item.size}</p> {/* Product size */}
                    </div>
                  </div>
                </div>
                {/* Input field for updating quantity */}
                <input 
                  onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                  type="number" 
                  min={1} 
                  defaultValue={item.quantity} 
                />
                {/* Delete icon to remove the item from the cart */}
                <img 
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className='w-4 mr-4 sm:w-5 cursor-pointer' 
                  src={assets.bin_icon} 
                  alt='' 
                />
              </div>
            );
          })
        }
      </div>
      {/* Checkout section */}
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal /> {/* Component to display the total amount */}
          <div className='w-full text-end'>
            <button 
              onClick={() => navigate('/place-order')} 
              className='bg-black text-white text-sm my-8 px-8 py-3'
            >
              PROCEED TO CHECKOUT {/* Button to proceed to checkout */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
