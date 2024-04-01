import React, { useState, useEffect } from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import LogoutButton from "./Logout";
import logo from "../logo.png"; // Assuming the component is in a subdirectory
import bannerImage from "../banner.jpg";
import axios from "axios"; // Import Axios

const Layout = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const isLoggedIn = localStorage.getItem("customerAccessToken") !== null;
  const logoUrl = localStorage.getItem("logo_url");
  const primaryColor = localStorage.getItem("primary_color");
  const secondaryColor = localStorage.getItem("secondary_color");
  const location = useLocation();
  const isMerchantLogin = location.pathname === "/merchantLogin";
  const isCustomerLogin = location.pathname === "/customerLogin";

  const [showCustomization, setShowCustomization] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchSubscriptions(); // Fetch subscriptions when component mounts and user is logged in
    }
  }, [isLoggedIn]);

  const fetchSubscriptions = async () => {
    try {
      const token = localStorage.getItem("customerAccessToken");
      const response = await axios.get(
        "http://localhost:8000/subscriptions/get",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setSubscriptions(response.data); // Update subscriptions state with fetched data
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logging out...");
  };

  const handleSettingsClick = () => {
    setShowCustomization(true);
  };
  
  const merchant_id = localStorage.getItem("merchantID");
  const planRoute = `/plans?merchant_id=${merchant_id}`


  return (
    <div style={{backgroundColor : primaryColor, color : secondaryColor}}>
      <Navbar bg="light" expand="lg" className="sticky-top">
        <Container style={{minWidth:"100%"}}>
          <Navbar.Brand as={Link} to="/">
            <img src={logoUrl != null?logoUrl:logo} alt="Logo" width="50" height="50" />{" "}
            {/* Adjust width and height as needed */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" style={{ marginRight: "10px" }}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={planRoute} style={{ marginRight: "10px" }}>
                Plans
              </Nav.Link>
              {isLoggedIn ? (
                <>
                  {/* <Nav.Link as={Link} to="/products" style={{ marginRight: "10px" }}>
                    Products
                  </Nav.Link>
                  <Nav.Link as={Link} to="/plans" style={{ marginRight: "10px" }}>
                    Plans
                  </Nav.Link> */}
                  {/* {isCustomerLogin && ( */}
                  <Nav.Link
                    as={Link}
                    to="/subscriptions"
                    style={{ marginRight: "10px" }}>
                    Subscriptions
                  </Nav.Link>
                  {/* )} */}
                  {/* <Dropdown show={showCustomization} onToggle={setShowCustomization}>
                    <Dropdown.Toggle as={Nav.Link} to="/settings" style={{ marginRight: "10px" }} onClick={handleSettingsClick}>
                      Settings
                    </Dropdown.Toggle> */}
                  {/* <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/customization">Customization</Dropdown.Item>
                    </Dropdown.Menu> */}
                  {/* </Dropdown> */}

                  <Nav.Item>
                    <LogoutButton onLogout={handleLogout} />
                  </Nav.Item>
                </>
              ) : (
                <>
                  {!isMerchantLogin && !isCustomerLogin && (
                    <>
                      <Nav.Link
                        as={Link}
                        to="/customerLogin"
                        style={{ marginRight: "10px" }}>
                        Customer Login
                      </Nav.Link>

                      {/* <span style={{ marginRight: "10px" }}>Don't have an account?</span> */}
                    </>
                  )}
                </>
              )}
              <Nav.Link as={Link} to="/contact" style={{ marginRight: "10px" }}>
                Contact Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Layout;
