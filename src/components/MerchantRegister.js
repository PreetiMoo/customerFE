import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';


const MerchantRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = 'http://localhost:8000/accounts/merchant/register';

    axios
      .post(apiUrl, formData)
      .then((response) => {
        console.log('Merchant registration successful:', response.data);
        setSuccessMessage('Merchant created successfully');
        setFormData({ username: '', password: '', email: '', businessName: '', businessType: '' }); // Reset form data
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
    <div style={{height:"100%", display: "flex",alignItems: "center", justifyItems: "center"}}>
      <div className='login-div' style={{height: "40%", width: "45%", color: "crimson", backgroundColor: "cornsilk", display: "flex", justifyContent: "space-around", alignItems: "center",borderRadius: "50px", padding: "0.5rem"}}>
        <h2 style={{flexGrow: "1"}}>Merchant Registration</h2>
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
          {/* <button type="submit">Register</button> */}
          <Button variant="warning" type="submit">Register</Button>
        </form>
      </div>
    </div>
  );
};

export default MerchantRegister;
