import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function Subscription() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [accessToken, setToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();

        const storedToken = localStorage.getItem("customerAccessToken");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const fetchData = async () => {
        try {
            const storedToken = localStorage.getItem("customerAccessToken");
            const subscriptionResponse = await axios.get(
                "http://localhost:8000/subscriptions/get",
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                }
            );
            console.log("Subscription Response:", subscriptionResponse.data); // Log the subscriptions received
            setSubscriptions(subscriptionResponse.data);
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
        }
    };


    const getCustomerIdFromToken = (accessToken) => {
        // Implement your logic to extract customer ID from the access token
        // For example, decode the token and extract the customer ID
        // Return the customer ID
      };
      
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
              "http://localhost:8000/payment/makePayment/",
              {
                subscription_id: id,
                
              },
              {
                headers: {
                  Authorization: `Bearer ${storedToken}` // Set token in the Authorization header
                }
              }
            );
    
            console.log("Response:", response);
            window.location.href = response.data.paymentLink.url
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

    return (
        <div className="container" style={{minWidth:"100%"}}>
            <h1>Subscriptions</h1>
            <div className="row">
                {subscriptions.map(subscription => (
                    <div key={subscription.id} className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Subscription ID: {subscription.id}</h5>
                                <p className="card-text">Customer ID: {subscription.cust_id}</p>
                                <p className="card-text">Plan ID: {subscription.plan_id}</p>
                                <p className="card-text">Start Time: {subscription.start_time}</p>
                                <p className="card-text">End Time: {subscription.end_time}</p>
                                <p className="card-text">Merchant ID: {subscription.merchant_id}</p>
                                <Button
              style={{ variant: "warning", display:"block" }}
              onClick={() => addToCart(subscription.id )}>
              Make payment
            </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}



export default Subscription;







// import axios from "axios";
// import { Button, Card } from "react-bootstrap";
// import React, { useState, useEffect } from "react";

// const PlanCard = ({ planList }) => {
//   const [planName, setPlanName] = useState([]);

//   const addToCart = async (id) => {
//     // Check if the customer is logged in
//     const customerAccessToken = localStorage.getItem("customerAccessToken");
//     if (customerAccessToken) {
//       try {
//         // Get the customer ID from the access token
//         const customerId = getCustomerIdFromToken(customerAccessToken);
//         const storedToken = localStorage.getItem("customerAccessToken");

//         // Make a POST request to your API endpoint
//         console.log("Stored Token:", storedToken);
//         const response = await axios.get(
//           "http://localhost:8000/subscriptions/get",
//           null,
//           {
//             headers: {
//               Authorization: `Bearer ${storedToken}` // Set token in the Authorization header
//             }
//           }
//         );

//         // console.log("Response:", response);

//         // Handle the response as needed
//         console.log(response.data); // Log the response data or handle it according to your requirements

//         // Alert the user that the item was added to the cart
//         alert("Plan subscribed!");
//       } catch (error) {
//         console.error("Error adding item to cart:", error);
//         // Handle errors, such as displaying an error message to the user
//         alert("Error adding item to cart. Please try again later.");
//       }
//     } else {
//       // If the customer is not logged in, display an alert message
//       alert("Please login to purchase.");
//     }
//   };

//   // Function to extract customer ID from the access token (you need to implement this)
//   const getCustomerIdFromToken = (accessToken) => {
//     // Implement your logic to extract customer ID from the access token
//     // For example, decode the token and extract the customer ID
//     // Return the customer ID
//   };

//   return (
//     <div>
//       {planList &&
//         planList.map((planObj, index) => (
//           <div key={planObj.subsPlan.id}>
//             <Button
//               style={{ variant: "warning" }}
//               onClick={() => addToCart(planObj.subsPlan)}>
//               Purchase
//             </Button>
//             <Card style={{ marginBottom: "20px" }}>
//               <Card.Body>
//                 <Card.Title>{planObj.subsPlan.plan_name}</Card.Title>
//                 <Card.Text>
//                   <strong>Description:</strong> {planObj.subsPlan.description}
//                   <br />
//                   <strong>Plan Type:</strong> {planObj.subsPlan.plan_type}
//                   <br />
//                   <strong>Price:</strong> {planObj.subsPlan.price}
//                   <br />
//                   <strong>Duration:</strong> {planObj.subsPlan.duration}
//                 </Card.Text>
//                 {planObj.products && planObj.products.length > 0 && (
//                   <div>
//                     <h5>Associated Products:</h5>
//                     <div
//                       style={{
//                         display: "flex",
//                         flexWrap: "wrap",
//                         justifyContent: "flex-start"
//                       }}>
//                       {planObj.products.map(
//                         (product) =>
//                           product && (
//                             // <Card key={product.id} style={{ margin: '2rem'}}>
//                             //   <Card.Img variant="top" src={product.image} style={{maxHeight:"250px", maxWidth:"250px"}} />
//                             //   <Card.Body>
//                             //     <Card.Title>{product.prod_name}</Card.Title>
//                             //     <Card.Text>
//                             //       <strong>Description:</strong> {product.description}<br />
//                             //       <strong>Price:</strong> {product.price}<br />
//                             //       <strong>Image:</strong> {product.image}
//                             //     </Card.Text>
//                             //   </Card.Body>
//                             // </Card>
//                             <Card style={{ width: "18rem", margin: "2rem" }}>
//                               <Card.Img variant="top" src={product.image} />
//                               <Card.Body>
//                                 <Card.Title>{product.prod_name}</Card.Title>
//                                 <Card.Text>
//                                   <strong>Description:</strong>{" "}
//                                   {product.description}
//                                   <br />
//                                   <strong>Price:</strong> {product.price}
//                                   <br />
//                                   <strong>Image:</strong> {product.image}
//                                 </Card.Text>
//                                 {/* <Button variant="primary">Go somewhere</Button> */}
//                               </Card.Body>
//                             </Card>
//                           )
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default PlanCard;
