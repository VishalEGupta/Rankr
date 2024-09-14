import React, { useState, useEffect } from 'react';
import RankingComponent from './RankingComponent';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);

  // Fetch items from backend on load
  useEffect(() => {
    axios.get('http://localhost:5000/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const updateItems = (newItems) => {
    setItems(newItems);

    // Update items on backend
    axios.post('http://localhost:5000/update-items', newItems)
      .then(() => console.log('Items updated successfully'))
      .catch(error => console.error('Error updating items:', error));
  };

  return (
    <div className="App">
      <h1>Rank Your Items</h1>
      <RankingComponent items={items} setItems={updateItems} />
    </div>
  );
}

export default App;
