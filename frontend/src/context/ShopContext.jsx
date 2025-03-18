import { createContext, useEffect, useState } from 'react';
import { products } from '../assets/assets'; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Creating a context for the shop
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  // Constants for currency and delivery fee
  const currency = '₹';
  const delivery_fee = 10;

  // State variables
  const [search, setSearch] = useState(''); 
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({}); 
  const [orders, setOrders] = useState([]); // Add orders state here
  const navigate = useNavigate();

  // Function to add items to the cart
  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error('Select Product Size'); // Notify if size is not selected
      return;
    }
    
    let cartData = structuredClone(cartItems); // Clone current cart items

    // Update cart with new item or increase quantity
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1; // Increment quantity if item and size already exist
      } else {
        cartData[itemId][size] = 1; // Add size if it doesn't exist
      }
    } else {
      cartData[itemId] = { [size]: 1 }; // Add new item with size
    }

    setCartItems(cartData); // Update cart state
    console.log('Updated cart items:', cartData); // Debugging cart items
  };

  // Function to get the total count of items in the cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item]; // Sum up quantities
          }
        } catch (error) {
          // Handle errors if any
        }
      }
    }
    return totalCount; // Return total item count
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity; // Update the specified size quantity

    setCartItems(cartData); // Update cart state
  };
  
  // Function to calculate the total amount of items in the cart
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items); // Find item info by ID
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item]; // Calculate total amount
          }
        } catch (error) {
          // Handle errors if any
        }
      }
    }
    return totalAmount; // Return total amount
  };

  // Function to place an order (for example)
  const placeOrder = (orderDetails) => {
    setOrders((prevOrders) => [...prevOrders, orderDetails]); // Add new order to the orders array
    toast.success('Order placed successfully!'); // Notify the user
  };

  // Context value to provide
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    orders, // Add orders to the context value
    placeOrder, // Optionally add a function to place orders
    navigate
  };

  // Providing the context to children components
  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
