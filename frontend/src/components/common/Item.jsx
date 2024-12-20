import React from 'react';

const Item = ({ item }) => {

    const handleAddToCart = ()=>{
        
    }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col h-full">
      <img 
        src={`data:image/jpeg;base64,${item.image}`} 
        alt={item.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-grow flex flex-col">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{item.name}</h2>
        <p className="text-gray-600 mb-2">Type: {item.type}</p>
        <p className="text-gray-600 mb-2">Color: {item.color}</p>
        <p className="text-green-600 font-bold mb-2">₹{item.cost.toFixed(2)}</p>
        <p className="text-gray-700 text-sm flex-grow">{item.description}</p>
        <div className="mt-4 flex justify-end">
          <button 
            type="button" 
            onClick={handleAddToCart}
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;