import React from 'react';
import Item from './Item';

const ShowItems = ({ items }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Item List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} >
             <Item key={item.id} item={item}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowItems;