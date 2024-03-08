import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter,
  Routes
} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Products from "./pages/Products.js";
import Plans from "./pages/Plans.js";
import NoPage from "./pages/NoPage";
// import Subscriptions from "./pages/subscriptions.js";
// import MerchantRegister from './components/MerchantRegister';
// import MerchantLogin from './components/MerchantLogin';
// App.js or any other component
import MerchantRegister from "./components/MerchantRegister";
import CustomerRegister from "./components/CustomerRegister";
import MerchantLogin from "./components/MerchantLogin";
import CustomerLogin from "./components/CustomerLogin";
import Customization from "./components/Customization";
import Subscription from "./pages/Subscription.js";

export default function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="merchantRegister" element={<MerchantRegister />} />
          <Route path="customerRegister" element={<CustomerRegister />} />
          <Route path="merchantLogin" element={<MerchantLogin />} />
          <Route path="customerLogin" element={<CustomerLogin />} />
          <Route path="products" element={<Products />} />
          <Route path="plans" element={<Plans />} />
          <Route path="customization" element={<Customization />} />
          <Route path="subscriptions" element={<Subscription />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Pages />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
