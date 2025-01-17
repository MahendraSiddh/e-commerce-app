import React, { useEffect, useState } from "react";
import ShowItems from '../components/common/ShowItems'

// Function to fetch all items
const fetchAllItems = async (page, size, token) => {
  const response = await fetch(`http://localhost:8080/items?page=${page}&size=${size}`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};


const Shop = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      const jsonResponse = await fetchAllItems(page, 4, token);
      const newItems = jsonResponse.content;

      if (newItems.length === 0) {
        setHasMore(false); // No more items to fetch
      } else {
        setItems((prev) => [...prev, ...newItems]);
      }
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [ page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex flex-col items-center">
      
      <ShowItems items={items} insideCart={false} />
      <div>
        <>
        {hasMore && !isLoading && (
        <button
          onClick={handleLoadMore}
          className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 m-2"
        >
          Load More
        </button>
      )}
      {!hasMore && <p className="text-gray-500 mt-4">No more items to load.</p>}
        </>
      </div>
    </div>
  );
};

export default Shop;
