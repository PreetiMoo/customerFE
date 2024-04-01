import axios from "axios";
import { Button, Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PlanCard = ({ planList }) => {
  const [planName, setPlanName] = useState([]);
  const navigate = useNavigate();
  const primaryColor = localStorage.getItem("primary_color");
  const secondaryColor = localStorage.getItem("secondary_color");

  const addToCart = async (id) => {
    // Check if the customer is logged in
    const customerAccessToken = localStorage.getItem("customerAccessToken");
    if (customerAccessToken) {
      try {
        // Get the customer ID from the access token
        const customerId = getCustomerIdFromToken(customerAccessToken);
        const storedToken = localStorage.getItem("customerAccessToken");

        // Make a POST request to your API endpoint
        console.log("Stored Token:", storedToken);
        const response = await axios.post(
          "http://localhost:8000/subscriptions/create",
          {
            plan_id: id.id,
            cust_id: customerId
          },
          {
            headers: {
              Authorization: `Bearer ${storedToken}` // Set token in the Authorization header
            }
          }
        );

        console.log("Response:", response);

        // Handle the response as needed
        console.log(response.data); // Log the response data or handle it according to your requirements

        // Alert the user that the item was added to the cart
        alert("Plan subscribed!");
        navigate("/subscriptions");
      } catch (error) {
        console.error("Error adding item to cart:", error);
        // Handle errors, such as displaying an error message to the user
        alert("Error adding item to cart. Please try again later.");
      }
    } else {
      // If the customer is not logged in, display an alert message
      alert("Please login to purchase.");
    }
  };

  // Function to extract customer ID from the access token (you need to implement this)
  const getCustomerIdFromToken = (accessToken) => {
    // Implement your logic to extract customer ID from the access token
    // For example, decode the token and extract the customer ID
    // Return the customer ID
  };

  return (
    <div style={{backgroundColor : primaryColor, color : secondaryColor}}>
      {planList &&
        planList.map((planObj, index) => (
          <div style={{width : "100%", display: "flex",justifyContent: "center"}} key={planObj.subsPlan.id}>
            
            <Card style={{ margin: "20px", width: "90%"}}>
              <Card.Body style={{ color: secondaryColor }}>
                <Card.Title>{planObj.subsPlan.plan_name}</Card.Title>
                <Card.Text>
                  <strong>Description:</strong> {planObj.subsPlan.description}
                  <br />
                  <strong>Plan Type:</strong> {planObj.subsPlan.plan_type}
                  <br />
                  <strong>Price:</strong> {planObj.subsPlan.price}
                  <br />
                  <strong>Duration:</strong> {planObj.subsPlan.duration}
                  <Button
              style={{ backgroundColor : primaryColor, color : secondaryColor, display:"block" }}
              onClick={() => addToCart(planObj.subsPlan)}>
              Subscribe
            </Button>
                </Card.Text>
                {planObj.products && planObj.products.length > 0 && (
                  <div>
                    <h5>Associated Products:</h5>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "flex-start"
                      }}>
                      {planObj.products.map(
                        (product) =>
                          product && (
                            // <Card key={product.id} style={{ margin: '2rem'}}>
                            //   <Card.Img variant="top" src={product.image} style={{maxHeight:"250px", maxWidth:"250px"}} />
                            //   <Card.Body>
                            //     <Card.Title>{product.prod_name}</Card.Title>
                            //     <Card.Text>
                            //       <strong>Description:</strong> {product.description}<br />
                            //       <strong>Price:</strong> {product.price}<br />
                            //       <strong>Image:</strong> {product.image}
                            //     </Card.Text>
                            //   </Card.Body>
                            // </Card>
                            <Card style={{ width: "18rem", margin: "2rem" }}>
                              <Card.Img variant="top" src={product.image} />
                              <Card.Body>
                                <Card.Title>{product.prod_name}</Card.Title>
                                <Card.Text>
                                  <strong>Description:</strong>{" "}
                                  {product.description}
                                  <br />
                                  <strong>Price:</strong> {product.price}
                                  <br />
                                  
                                  
                                </Card.Text>
                                {/* <Button variant="primary">Go somewhere</Button> */}
                              </Card.Body>
                            </Card>
                          )
                      )}
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default PlanCard;
