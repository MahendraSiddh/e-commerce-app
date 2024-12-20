import fetchAllItems from "./fetchAllItems";

async function getFilteredItems( type) {
    // Fetch all items
    const items = await fetchAllItems();
  
    // Filter items based on type 'men'
    let data = items.filter(item => item.type === type);
  
    return data;
    
  }

  export default getFilteredItems;