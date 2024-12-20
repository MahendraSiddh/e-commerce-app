import React, { useEffect, useState } from 'react';
import { FaSearch, FaHeart, FaUser, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

import isUserLogedin from '../../utils/isUserLogegdin'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLogged,setIsLogged] = useState(false);

  useEffect(()=>{
    setIsLogged(isUserLogedin());
  },[isLogged]);

  const handleLogeOut = ()=>{
     localStorage.removeItem('token');
     setIsLogged(false);
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // search logic here
  };

  const navItems = [
     {
        "name":"Shop",
        "path":"/shop"
     },
     {
      "name":"Men",
      "path":"/men"
   },
   {
    "name":"Women",
    "path":"/women"
 },
 {
  "name":"Kids",
  "path":"/kids"
}]
  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-4 sm:px-2 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-teal-800">E-Shop</span>
            </a>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={item.path}
                    className="text-gray hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="mr-4 ml-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-100 rounded-full py-2 px-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute left-3 top-3 text-gray-500">
                  <FaSearch />
                </button>
              </div>
            </form>
            {
               !isLogged && <a href='/login' className="inline-block mx-2 px-4 py-2 
              bg-purple-600 hover:bg-purple-700 
              text-white font-bold 
              rounded-lg shadow-md 
              transition duration-300 ease-in-out 
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">Login</a>

            }
            {
               !isLogged && <a href='/signup' className="inline-block mx-2 px-4 py-2 
              bg-purple-600 hover:bg-purple-700 
              text-white font-bold 
              rounded-lg shadow-md 
              transition duration-300 ease-in-out 
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">Sign up</a>

            }
            {
               isLogged && <a className="text-gray-700 hover:text-blue-500 px-3 py-2" href='/wishlist'>
               <FaHeart />
             </a>
            }
            {
               isLogged && <a className="text-gray-700 hover:text-blue-500 px-3 py-2" href='/profile'>
               <FaUser />
             </a>
            }
            {
               isLogged && <a className="text-gray-700 hover:text-blue-500 px-3 py-2" href='/cart'>
               <FaShoppingCart />
             </a>
            }
            {
                isLogged && <button onClick={handleLogeOut} type="button" className="inline-block px-4 py-2 
                bg-purple-600 hover:bg-purple-700 
                text-white font-bold 
                rounded-lg shadow-md 
                transition duration-300 ease-in-out 
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                Log Out
                </button>
             }
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item}
                href={item.path}
                className="text-gray-700 hover:bg-blue-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <form onSubmit={handleSearch} className="mt-3 w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-gray-100 w-full rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="absolute left-3 top-3 text-gray-500">
                    <FaSearch />
                  </button>
                </div>
              </form>
            </div>
            <div className="mt-3 px-2 space-y-1">
              {
                !isLogged && <a className="flex items-center text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium w-full" href='/login'>
                 Login
              </a>
              }
              {
                !isLogged && <a className="flex items-center text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium w-full" href='/signup'>
                 Sign up
              </a>
              }
              {
                isLogged && <a className="flex items-center text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium w-full" href='/wishlist'>
                <FaHeart className="mr-3" /> Favorites
              </a>
              }
              {
                isLogged && <a className="flex items-center text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium w-full" href='/profile'>
                <FaUser className="mr-3" /> Profile
              </a>
              }
              {
                isLogged && <a className="flex items-center text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium w-full" href='/cart'>
                <FaShoppingCart className="mr-3" /> Cart
              </a>
              }
              {
                isLogged && <button onClick={handleLogeOut} type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-3 py-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                  Log Out
                </button>
             }
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;