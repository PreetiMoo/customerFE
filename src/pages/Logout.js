import React from 'react';
import { Button } from 'react-bootstrap';


const LogoutButton = ({ onLogout }) => {
  const handleLogout = () => {
    // Remove access token from localStorage
    localStorage.removeItem('customerAccessToken');
    

    // Reload the window
    window.location.reload();

      // Navigate to the home page
    window.location.href = '/'; // Set the URL of your home page


    // Perform any other logout actions
    if (onLogout) {
      onLogout();
    }
  };

  return (
    // <button 
    //   onClick={handleLogout}
    //   style={{
    //     position: 'absolute',
    //     top: '20px', // Adjust the top position as needed
    //     right: '20px' // Adjust the right position as needed
    //   }}
    // >
    //   Logout
    // </button>
    <button onClick={handleLogout}
    style={{
      position: 'absolute',
      top: '24px', // Adjust the top position as needed
      right: '20px' // Adjust the right position as needed
    }} >Logout</button>
    
  );
};

export default LogoutButton;
