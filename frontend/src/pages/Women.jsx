import React, { useEffect, useState } from 'react'
import getFilteredItems from '../utils/getItemsByFilter';
import ShowItems from '../components/common/ShowItems';


const Women = () => {

  const [items, setItems] = useState([]);

  useEffect(()=>{
    async function getItems() {
      const fetchedItems = await getFilteredItems("women");
      if(fetchedItems)
      {
        setItems(fetchedItems);
      }
    }
    getItems();
  },[])

  return (
    <div>
      <ShowItems items={items} />
    </div>
  )
}

export default Women;