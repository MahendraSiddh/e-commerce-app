import React from 'react';

const Item = ({ item }) => {


  return (
    <div className="">
      <img 
        src={`data:image/jpeg;base64,${item.base64Image}`} 
        alt={item.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-grow flex flex-col">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{item.name}</h2>
        <p className="text-gray-600 mb-2">Type: {item.type}</p>
        <p className="text-gray-600 mb-2">Color: {item.color}</p>
        <p className="text-green-600 font-bold mb-2">₹{item.cost.toFixed(2)}</p>
        <p className="text-gray-700 text-sm flex-grow">{item.description}</p>
        
      </div>
    </div>
  );
};

export default Item;