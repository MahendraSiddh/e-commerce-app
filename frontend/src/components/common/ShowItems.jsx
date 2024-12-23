import React from 'react';
import Item from './Item';
import addItemToCart from '../../utils/addItemToCart';
import removeItemFromCart from '../../utils/removeItemFromCart'

const ShowItems = ({ items ,insideCart}) => {

  const handleAddToCart = (id) =>{
    addItemToCart(id);
  }
  const handleRemoveFromCart = (id)=>{
    removeItemFromCart(id);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Item List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className='bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col h-full px-5 py-2.5' >
             <Item key={item.id} item={item}/>
             <div key={item.id} className="mt-4 flex justify-end">
                {
                    !insideCart && <button 
                    type="button" 
                    onClick={() => handleAddToCart(item.id)}
                    className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                   >
                    Add to Cart
                  </button>
                }
                {
                    insideCart && <button 
                    type="button" 
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                   >
                    Remove From Cart
                  </button>
                }
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowItems;