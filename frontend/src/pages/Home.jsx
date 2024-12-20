import React from 'react'
import { useEffect,useState } from 'react';
import fetchAllItems from '../utils/fetchAllItems';
import ShowItems from '../components/common/ShowItems';


const Home = () => {

  const [items, setItems] = useState([]);
  
  useEffect(() => {
    async function getItems() {
      const fetchedItems = await fetchAllItems();
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

export default Home