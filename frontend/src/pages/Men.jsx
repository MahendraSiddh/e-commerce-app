import React from 'react'
import { useState,useEffect } from 'react';
import getItemsByFilter from '../utils/getItemsByFilter'
import ShowItems from '../components/common/ShowItems';

const Men = () => {

  const [items, setItems] = useState([]);
  
  useEffect(() => {
    async function getItems() {
      const fetchedItems = await getItemsByFilter("men");
      if (fetchedItems) {
        setItems(fetchedItems); // Set the fetched items into state
      }
    }

    getItems();
  }, []);

  console.log(items);
  return (
    <div>
      
      
        <ShowItems items={items} />
      
    </div>
  )
}

export default Men