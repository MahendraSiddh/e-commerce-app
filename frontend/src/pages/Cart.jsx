import React, { useEffect, useState } from 'react';
import getCart from '../utils/getCart';
import ShowItems from '../components/common/ShowItems';
const Cart = () => {

  const[items,setItems] = useState([]);

  useEffect(() => {
     async function getItems() {
      const cart = await getCart();
      if (cart) {
        setItems(cart); // Set the fetched items into state
      }
    }
    getItems();
  }, []);

  console.log(items);
  return (
    <div>
      <ShowItems items={items} insideCart={true} />
    </div>
  )
}

export default Cart