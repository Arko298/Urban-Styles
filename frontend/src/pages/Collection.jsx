import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, toggleCategory, toggleSubCategory, setSortType, applyFilters, setSearch } from '../redux/features/collection/collectionSlice';
import { useFetchCategoriesQuery } from '../redux/api/categoryApiSlice';
import { useFetchTypesQuery } from '../redux/api/typesApiSlice';
import { useAllProductsQuery } from '../redux/api/productApiSlice';
import { useState } from 'react';

const Collection = () => {
  const { search, showSearch } = useContext(ShopContext);
  const dispatch = useDispatch();
  const { filteredProducts, categories, subCategories, sortType } = useSelector((state) => state.collection);
  const [showFilter, setShowFilter] = useState(false);

  // Fetch categories, types, and products using RTK Query
  const { data: backendCategories = [], isLoading: categoriesLoading, error: categoriesError } = useFetchCategoriesQuery();
  const { data: backendTypes = [], isLoading: typesLoading, error: typesError } = useFetchTypesQuery();
  const { data: products = [], isLoading: productsLoading, error: productsError } = useAllProductsQuery();

  // Set products in Redux store when fetched
  useEffect(() => {
    if (products.length > 0) {
      dispatch(setProducts(products));
    }
  }, [products, dispatch]);

  // Update search term in Redux store
  useEffect(() => {
    dispatch(setSearch(search));
  }, [search, dispatch]);

  // Apply filters when categories, subcategories, sort type, or search changes
  useEffect(() => {
    dispatch(applyFilters());
  }, [categories, subCategories, sortType, search, showSearch, dispatch]);

  // Handle loading and error states
  if (categoriesLoading || typesLoading || productsLoading) {
    return <div>Loading...</div>;
  }

  if (categoriesError || typesError ) {
    return <div>Error loading data. Please try again later.</div>;
  }

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
            {backendCategories.map((cat) => (
              <p key={cat._id} className='flex gap-2'>
                <input 
                  className='w-3' 
                  type='checkbox' 
                  value={cat.name} 
                  checked={categories.includes(cat.name)}
                  onChange={() => dispatch(toggleCategory(cat.name))} 
                /> {cat.name}
              </p>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {backendTypes.map((type) => (
              <p key={type._id} className='flex gap-2'>
                <input 
                  className='w-3' 
                  type='checkbox' 
                  value={type.name} 
                  checked={subCategories.includes(type.name)}
                  onChange={() => dispatch(toggleSubCategory(type.name))} 
                /> {type.name}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Displaying Products */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />

          {/* Product Sort Dropdown */}
          <select 
            onChange={(e) => dispatch(setSortType(e.target.value))} 
            value={sortType}
            className='border-2 border-gray-300 text-sm px-2'
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Mapping Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filteredProducts.map((item) => (
            <ProductItem 
              key={item._id} 
              name={item.name} 
              id={item._id} 
              price={item.price} 
              image={item.image} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;