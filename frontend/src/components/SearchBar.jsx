import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    // Accessing the context values for search input and visibility state
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false); 
    const location = useLocation(); 
    // Effect to determine if the search bar should be visible based on the route
    useEffect(() => {
        // Check if the current path includes 'collection' to show the search bar
        if (location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location]); // Dependency array to run this effect when the location changes

    return showSearch && visible ? (
        <div className='border-t border-b bg-gray-50 text-center'>
            {/* Search input container */}
            <div className='inline-flex items-center justify-center border border-gray-400 px-5 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
                {/* Input field for search query */}
                <input 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    className='flex-1 outline-none bg-inherit text-sm' 
                    type="text" 
                    placeholder='Search' 
                />
                {/* Search icon */}
                <img className='w-4' src={assets.search_icon} alt='Search Icon' />
            </div>
            {/* Cross icon to close the search bar */}
            <img 
                onClick={() => setShowSearch(false)} 
                className='inline w-3 cursor-pointer' 
                src={assets.cross_icon} 
                alt="Close Icon" 
            />
        </div>
    ) : null; // If not visible, return null
}

export default SearchBar;
