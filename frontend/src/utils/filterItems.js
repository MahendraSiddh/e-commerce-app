function filterItems(query, items) {
    if (!query) return items;
  
    return items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) || 
      item.description.toLowerCase().includes(query.toLowerCase()) || 
      item.type.toLowerCase().includes(query.toLowerCase()) || 
      item.color.toLowerCase().includes(query.toLowerCase())
    );
  }

export default filterItems;