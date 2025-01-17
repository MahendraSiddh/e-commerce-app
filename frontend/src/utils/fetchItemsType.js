const fetchItemsByType = async (type, page, size) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:8082/items?type=${type}&page=${page}&size=${size}`,
      {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  };