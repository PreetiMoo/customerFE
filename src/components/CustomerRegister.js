import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const CustomerRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    address: '',
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [merchantId, setMerchantId] = useState('');

  useEffect(() => {
    // Fetch merchant_id from localStorage
    const merchantIdFromStorage = localStorage.getItem('merchantID');
    setMerchantId(merchantIdFromStorage);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = 'http://localhost:8000/accounts/customer/register';

    // Include merchant_id in the form data
    const formDataWithMerchantID = {
      ...formData,
      merchant_id: merchantId,
    };

    axios
      .post(apiUrl, formDataWithMerchantID)
      .then((response) => {
        console.log('Customer registration successful:', response.data);
        setSuccessMessage('Customer created successfully');
        setFormData({ username: '', password: '', email: '', address: '' }); // Reset form data
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            // Handle specific HTTP error codes or display a generic error message
            setErrorMessage(`Server responded with error status: ${error.response.status}`);
          } else if (error.request) {
            setErrorMessage('No response received from the server');
          } else {
            setErrorMessage(`Error setting up the request: ${error.message}`);
          }
        } else {
          setErrorMessage(`Non-Axios error occurred: ${error.message}`);
        }
      });
  };



  return (
    <div style={{ height: "88%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className='login-div' style={{width: "45%",    backgroundColor: "#0b0b0a26", display: "flex", justifyContent: "space-around", alignItems: "center",borderRadius: "50px"}}>
        <h2 style={{flexGrow: "1"}}>Customer Registration</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <form onSubmit={handleSubmit} style={{flexGrow: "2", display: "flex", alignItems: "center", flexDirection: "column"}}>
          <label>
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <br />
          <label>
            Address:
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
          </label>
          <br />
          {/* <button type="submit">Register</button> */}
          <button  type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerRegister;
