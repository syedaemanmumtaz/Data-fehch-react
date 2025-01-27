import React, { useState, useEffect } from 'react';

const Greet = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const apiUrl ='https://fakestoreapi.com/products';

  // Fetch the data
  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(`Error fetching data: ${error.message}`);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const intervalId = setInterval(() => {
        if (currentIndex < data.length) {
          setCurrentIndex(prevIndex => prevIndex + 1);
        } else {
          clearInterval(intervalId); 
        }
      }, 2000); 

      return () => clearInterval(intervalId); 
    }
  }, [data, currentIndex]);

  return (
    <div>
      <h1>API Data</h1>
      {error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <div>
          {currentIndex > 0 && (
            <div>
              <h4>Title: {data[currentIndex - 1].title}</h4>
              <p>{data[currentIndex - 1].description}</p>
              <h5>Price: {data[currentIndex - 1].price}</h5>
              <img src={data[currentIndex - 1].image} alt={data[currentIndex - 1].title} width={250}/>
              <br />
              <button onClick={() => setCurrentIndex(1)}>First</button>
              <button onClick={() => setCurrentIndex(currentIndex - 1)}>Previous</button>
              <button onClick={() => setCurrentIndex(currentIndex + 1)}>Next</button>
              <p>Current Index: {currentIndex}</p>
              <p>Total Items: {data.length}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Greet;
