import React, { useState, useEffect } from "react";

const Greet = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const apiUrl = "https://fakestoreapi.com/products";

  // Fetch the data
  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
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
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          clearInterval(intervalId);
        }
      }, 2000);

      return () => clearInterval(intervalId);
    }
  }, [data, currentIndex]);
  const handleAddProduct =()=>{
    const newProduct = {
      id: Math.floor(Math.random() * 100000),
      title: "New Product",
      description: "This is a new product",
      price: Math.floor(Math.random() * 1000) + 1,
      image: "https://via.placeholder.com/150",
    };
    setData([...data, newProduct]);
    setCurrentIndex(data.length);

    // setData([...data, newProduct]);
    // setNewProduct({
    //   id: Math.floor(Math.random() * 100000),
    //   title: "New Product",
    //   description: "This is a new product",
    //   price: Math.floor(Math.random() * 1000) + 1,
    //   image: "https://via.placeholder.com/150",
    // })
  }



  return (
    <div>
      <h1>API Data</h1>
      {error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <div>
          {currentIndex > 0 && (
            <div>
              <h4>Title: {data[currentIndex - 1].title}</h4>
              <p>{data[currentIndex - 1].description}</p>
              <h5>Price: {data[currentIndex - 1].price}</h5>
              <img
                src={data[currentIndex - 1].image}
                alt={data[currentIndex - 1].title}
                width={250}
              />
              <br />
              <button onClick={() => setCurrentIndex(1)}>First</button>
              <button onClick={() => setCurrentIndex(currentIndex - 1)}>
                Previous
              </button>
              <button onClick={() => setCurrentIndex(currentIndex + 1)}>
                Next
              </button>
              <p>Current Index: {currentIndex}</p>
              <p>Total Items: {data.length}</p>
            </div>
          )}
          {/* <button onClick={handleAddProduct}>Add Product</button> */}
          <h3>Add New Product</h3>
          <div>
            <input
              type="text"
              placeholder="Title"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <button onClick={handleAddProduct}>Add Product</button>
          </div>

          

        </div>
      )}
    </div>
  );
};

export default Greet;
