
async function fetchAllItems() {
    const API_URL = 'https://localhost:8080/items'; // Replace with your actual API endpoint

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
           'Content-Type': 'application/json'
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const items = await response.json();
      console.log(items);
      return items;
    } catch (error) {
      console.error('There was a problem fetching the items:', error);
      return null;
    }
  }

  export default fetchAllItems;
  