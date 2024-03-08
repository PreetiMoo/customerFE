import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';


const Products = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0); // Initialized as 0
  const [image, setImage] = useState('');
  const [productList, setProductList] = useState([]);
  const [accessToken, setToken] = useState('');
  

  useEffect(() => {
    fetchProductList();
    // Fetch token from wherever it's stored (localStorage, sessionStorage, etc.)
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const fetchProductList = async () => {
    try {
      // Fetch token from localStorage
      const storedToken = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:8000/prodList/readAll', {
        headers: {
          Authorization: `Bearer ${storedToken}`, // Set token in the Authorization header
        },
      });
      setProductList(response.data);
    } catch (error) {
      console.error('Error fetching product list:', error);
    }
  };
  
  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(parseInt(event.target.value)); // Parse input value to an integer
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    try {
      // Fetch token from localStorage
      const storedToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        'http://localhost:8000/prodList/create',
        { 
          prod_name: productName,
          description: description,
          price: price,
          image: image
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`, // Set token in the Authorization header
          },
        }
      );
      // Update productList with the new product details from the response
      setProductList([...productList, response.data]);
      
      // Reset form fields after adding the product
      setProductName('');
      setDescription('');
      setPrice(0);
      setImage('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  
  

  return (
    <div style={{backgroundColor:"cornsilk", height:"inherit"}}>
      <h2 style={{margin:"15px"}}>Add Product</h2>
      <form onSubmit={handleAddProduct} style={{display: "inline-flex", alignItems: "center", margin:"20px"}}>
  <label style={{marginRight:"20px"}}>
    Product Name :
    <input
      type="text"
      value={ productName}
      onChange={handleProductNameChange}
    />
  </label >
  <br />
  <label style={{marginRight:"20px"}}>
    Description :
    <input
      type="text"
      value={description}
      onChange={handleDescriptionChange}
    />
  </label>
  <br />
  <label style={{marginRight:"20px"}}>
    Price :
    <input
      type="number" // Change type to number for price input
      value={price}
      onChange={handlePriceChange}
    />
  </label>
  <br />
  <label style={{marginRight:"20px",display: "block"}}>
  Image:
  <input
    type="text"
    value={image}
    onChange={handleImageChange}
    placeholder="Paste image link here"
  />
</label>
  <br />
  {/* <button type="submit">Add product</button> */}
  <Button variant="warning" type="submit">Add product</Button>
</form>



      <h2 style={{marginTop:"revert" , marginLeft:"15px"}}>Product List</h2>
      <ul>
        {productList.map((product) => (
          <li key={product.id}>
            <div>Product Name: {product.prod_name}</div>
            <div>Description: {product.description}</div>
            <div>Price: {product.price}</div>
            <div>Image: {product.image}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
