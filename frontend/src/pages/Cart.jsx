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

  const handleCreateOrder = ()=>{
    window.location.href = '/order_creation';
  }

  return (
    <div className='flex flex-col justify-center '>
      
      <div className='flex justify-center py-4'>
      {
         items.length>0 && <button 
         type="button" 
         onClick={handleCreateOrder}
         className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm max-w-52 px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
         Create Order & Place
       </button>
      }
      </div>
      <ShowItems items={items} insideCart={true} />
    </div>
  )
}

export default Cart