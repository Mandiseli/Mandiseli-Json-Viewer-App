import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://arthurfrost.qflo.co.za/php/getTimeline.php')
      .then((response) => response.json())
      .then((data) => {
       
        if (Array.isArray(data)) {
          setData(data);
        } else {
          console.error("Expected an array, but received:", data);
          setData([]); 
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Daily Communion Timeline</h1>
      </header>
      <main>
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.Id} className="card">
              <h2 className="card-title">{item.Title}</h2>
              <img
                src={`https://arthurfrost.qflo.co.za/${item.Image}`}
                alt="Thumbnail"
                className="card-image"
              />
              <audio controls src={`https://arthurfrost.qflo.co.za/${item.Audio}`} className="audio-player" />
              <div className="card-details">
                <p><strong>Media:</strong> {item.Media}</p>
                <p><strong>Category:</strong> {item.Category}</p>
                <p><strong>Created Date:</strong> {item.CreateDate}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="loading">No data available or data format is incorrect.</p>
        )}
      </main>
    </div>
  );
}

export default App;
