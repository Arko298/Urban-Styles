import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext'; 
import Title from './Title';
import ProductItem from './ProductItem'; 

const LatestCollection = () => {
  // Accessing the products from the ShopContext
  const { products } = useContext(ShopContext);
  
  const [latestProducts, setLatestProducts] = useState([]);

  // Effect to update the latest products whenever the products change
  useEffect(() => {
    // Slicing the first 10 products from the products array
    setLatestProducts(products.slice(0, 10));
  }, [products]);
  
  return (
    <div className="my-10">
      <div className='text-center py-8 text-3xl'>
        {/* Title component to display the section title */}
        <Title text1="LATEST" text2="COLLECTIONS" />
        
        {/* Description for the latest collection */}
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Discover the freshest trends and timeless classics in our Latest Collection. Carefully curated for you, these pieces represent the best in fashion, blending style with comfort.
        </p>
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          // Rendering each ProductItem, using the item's properties as props
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
