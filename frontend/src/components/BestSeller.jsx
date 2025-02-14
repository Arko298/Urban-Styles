import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext'; 
import Title from './Title'; 
import ProductItem from './ProductItem'; 

const BestSeller = () => {
    // Destructuring 'products' from the ShopContext, which holds all the products in the shop
    const { products } = useContext(ShopContext);
    
    // Initializing a state to hold the filtered list of bestsellers
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        // Filtering the products to find only those marked as 'bestseller'
        const bestProduct = products.filter((item) => item.bestseller);

        // Setting the bestSeller state to the top 5 bestseller products
        setBestSeller(bestProduct.slice(0, 5));
        
        // Dependency array is empty, so this will only run once when the component mounts
    }, [products]); // Added 'products' as dependency to ensure it runs after products are available

    return (
      <div className='my-10'>
        {/* Title section with description */}
        <div className='text-center text-3xl py-8'>
          <Title text1={'BEST'} text2={'SELLERS'} />
          <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Our Bestsellers are customer favorites for a reason. These top-rated products have become must-haves, blending quality with style to create timeless pieces.
          </p>
        </div>

        {/* Grid layout for displaying the bestsellers */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            // Mapping through the bestSeller array and rendering ProductItem components
            bestSeller.map((item, index) => (
              <ProductItem 
                key={index} // Unique key for each item in the list (using index for simplicity)
                id={item._id} // Passing product ID
                name={item.name} // Passing product name
                image={item.image} // Passing product image URL
                price={item.price} // Passing product price
              />
            ))
          }
        </div>
      </div>
    );
};

export default BestSeller;
