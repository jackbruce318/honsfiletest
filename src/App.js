import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const currentItem = (data.items || []).find(item => !item.completed);
  const timeStarted = new Date();

  const handleMarkComplete = () => {
    if (currentItem) {
      const timeEnded = new Date();
      const timeToComplete = new Date(timeEnded - timeStarted).toISOString().substr(11, 8);
      const updatedData = {
        ...data,
        items: data.items.map(item =>
          item.id === currentItem.id ? { ...item, completed: true, timeToComplete: timeToComplete } : item
        )
      };
      setData(updatedData);
    }
  };

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      {currentItem && (
        <div>
          Name: {currentItem.name} and Price: ${currentItem.price}
          <button onClick={handleMarkComplete}>Mark as Completed</button>
        </div>
      )}
    </div>
  );
};

export default App;