import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'; 
import { assets } from '../assets/assets';
import Title from '../components/Title'; 
import ProductItem from '../components/ProductItem'; 

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext); 
  const [showFilter, setShowFilter] = useState(false); 
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]); 
  const [subCategory, setSubCategory] = useState([]); 
  const [sortType, setSortType] = useState('relevant'); 

  // Toggle selected category
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value)); // Remove category if already selected
    } else {
      setCategory(prev => [...prev, e.target.value]); // Add category if not selected
    }
  };

  // Toggle selected subcategory
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value)); // Remove subcategory if already selected
    } else {
      setSubCategory(prev => [...prev, e.target.value]); // Add subcategory if not selected
    }
  };

  // Apply filters based on selected categories and subcategories
  const applyFilter = () => {
    let productsCopy = products.slice(); // Create a copy of the original product list
    
    // Filter products based on search input
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    
    // Filter by category if any categories are selected
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    
    // Filter by subcategory if any subcategories are selected
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }
    
    setFilterProducts(productsCopy); // Update the filtered products state
  };

  // Sort products based on selected sorting type
  const sortProduct = () => {
    let fpCopy = filterProducts.slice(); // Create a copy of the filtered products

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price)); // Sort from low to high price
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price)); // Sort from high to low price
        break;
      default:
        applyFilter(); // Re-apply filters if no sorting is selected
        break; 
    }
  };

  // Re-apply filters when categories, subcategories, search, or search visibility changes
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  // Re-sort products when sort type changes
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS 
          <img style={{ height: '10px', width: '10px' }} className={`sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Men'} onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Women'} onChange={toggleCategory} /> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Kids'} onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Topwear'} onChange={toggleSubCategory} /> Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Displaying Products */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} /> {/* Title for collections */}

          {/* Product Sort Dropdown */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Mapping Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((item, index) => (
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} /> 
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default Collection;
