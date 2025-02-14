import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // React Router's hook to retrieve URL parameters
import { products } from '../assets/assets';  // Assuming products data is imported from assets
import { ShopContext } from '../context/ShopContext';  // Shop context for accessing global functions like addToCart

const Product = () => {
  const { productId } = useParams();  // Retrieves the product ID from the URL
  const { addToCart } = useContext(ShopContext);  // Access the addToCart function from ShopContext
  const [selectedImage, setSelectedImage] = useState('');  // State to store the selected image
  const [size, setSize] = useState('');  // State to store the selected size of the product

  // Find the product that matches the productId from the URL
  const product = products.find(p => p._id === productId);

  // Set the default image when the component first renders
  useEffect(() => {
    if (product && product.image.length > 0) {
      setSelectedImage(product.image[0]); // Set first image as default
    }
  }, [product]);

  // If no product is found (invalid product ID), show a message
  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="flex flex-col md:flex-row p-6 space-x-6">
      {/* Left Section - Image Gallery */}
      <div className="flex flex-col lg:flex-row">
        {/* Thumbnails for product images */}
        <div className="flex flex-row lg:flex-col gap-2 lg:mr-4">
          {product.image.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumbnail-${index}`}
              className={`w-16 h-16 lg:w-20 lg:h-20 object-cover cursor-pointer border 
                ${selectedImage === img ? 'border-black' : 'border-gray-300'}`} // Highlight selected image
              onClick={() => setSelectedImage(img)} // Change selected image on click
            />
          ))}
        </div>

        {/* Main Display Image */}
        <div className="w-full lg:w-[400px] lg:h-[600px]">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-full object-cover" // Display the selected image in larger size
          />
        </div>
      </div>

      {/* Right Section - Product Details */}
      <div className="max-w-md">
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1> {/* Product name */}
        <p className="text-lg font-semibold mb-2">Price: ₹{product.price}</p> {/* Product price */}
        
        {/* Placeholder for product rating */}
        <div className="text-yellow-500 mb-2">
          <span>★★★★☆</span> {/* This can be dynamic in the future */}
        </div>
        
        <p className="mb-4">{product.description}</p> {/* Product description */}
        
        <div>
          <h4 className="font-semibold mb-2">Available Sizes:</h4>
          <div className="flex gap-2">
            {/* Render available sizes as buttons */}
            {product.sizes.map((item, index) => (
              <button
                key={index}
                onClick={() => setSize(item)} // Set selected size on click
                className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} // Highlight selected size
              >
                {item}
              </button>
            ))}
          </div>

          {/* Add to Cart button */}
          <button onClick={() => addToCart(product._id, size)} className="bg-black text-white px-8 py-3 mt-4 text-sm active:bg-gray-700">
            ADD TO CART
          </button>

          {/* Divider */}
          <hr className="mt-8 sm:w-4/5" />
        </div>
        
        {/* Product guarantees and policies */}
        <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
          <p>100% Original product.</p>
          <p>Cash on delivery is available on this product.</p>
          <p>Easy return and exchange policy within 7 days.</p>
        </div>

        {/* Description & Reviews section */}
        <div className="mt-20">
          <div className="flex">
            <b className="border px-5 py-3 text-sm">Description</b> {/* Tab for Description */}
            <p className="border px-5 py-3 text-sm">Reviews (122)</p> {/* Placeholder for reviews */}
          </div>

          {/* Product description content */}
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
            <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet...</p>
            <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any variations...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
