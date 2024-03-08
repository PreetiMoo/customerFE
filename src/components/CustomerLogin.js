import React, { useState } from 'react';
import axios from 'axios';
import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';

const CustomerLogin = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const apiUrl = 'http://localhost:8000/login/customer/';

    axios.post(apiUrl, loginData)
      .then((response) => {
        console.log('Customer Login successful:', response.data);

        const { accessToken } = response.data;
        localStorage.setItem("customerAccessToken", accessToken);
        setIsLoggedIn(true); // Set login status to true

        navigate("/");

        window.location.reload();
        // Add logic for successful login, such as redirecting to a dashboard or updating the UI
      })
      .catch((error) => {
        console.error('Error:', error);
        if (axios.isAxiosError(error)) {
          if (error.response) {
            // Handle specific HTTP error codes or display a generic error message
            const status = error.response.status;
            if (status === 401) {
              setErrorMessage('Invalid credentials. Please check your username and password.');
            } else {
              setErrorMessage(`Server returned an error: ${status}`);
            }
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
      <div className='login-div' style={{ width: "45%",    backgroundColor: "#0b0b0a26", display: "flex", justifyContent: "space-around", alignItems: "center", borderRadius: "50px" }}>
        <h2 style={{ flexGrow: "1" }}>Customer Login</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={handleLogin} style={{ flexGrow: "2", display: "flex", alignItems: "center", flexDirection: "column" }}>
          <label>
            Username:
            <input
              type="text" name="username" value={loginData.username} onChange={handleChange} />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password" name="password" value={loginData.password} onChange={handleChange} />
          </label>
          <br />
          <button  type="submit">Login</button>
        </form>
        <div style={{
          flexGrow: "1",
          textAlign: "center"
        }}>
          <Nav className="me-auto">
            <span style={{ marginRight: "10px" }}>Don't have an account?</span>
            <Nav as={Link} to="/customerRegister" style={{ marginRight: "10px" }}>
              Customer Sign up
            </Nav>
            {isLoggedIn && ( // Render NavLink only if user is logged in
              <Nav as={Link} to="/subscription" style={{ marginRight: "10px" }}>
                Subscription
              </Nav>
            )}
          </Nav>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
