import React, { useEffect, useState } from 'react'
import getFilteredItems from '../utils/getItemsByFilter';
import ShowItems from '../components/common/ShowItems';

const Kids = () => {

  const [items,setItems] = useState([]);

  useEffect(()=>{
    async function getItems(){
      const fetchedItems = await getFilteredItems("kids");
      if(fetchedItems)
      {
         setItems(fetchedItems);
      }
    }
    getItems();
  },[]);
  return (
    <div>
      <ShowItems items={items} insideCart={false} />
    </div>
  )
}

export default Kids;