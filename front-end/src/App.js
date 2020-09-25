import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
// CSS
import "./App.css";
// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// Pages
import HomePage from "./components/pages/Homepage";
import AboutPage from "./components/pages/Aboutpage";
import ProductPage from "./components/pages/Productpage";
import CartPage from "./components/pages/Cartpage";
import SigninPage from "./components/pages/Signinpage";
import RegisterPage from "./components/pages/Registerpage";
import ProductMangement from "./components/pages/Productmangement";
import ShippingPage from "./components/pages/Shippingpage";
import PaymentsPage from "./components/pages/Paymentspage";
import OrderPage from "./components/pages/Orderpage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <main className="main">
          <Route path="/" exact={true} component={HomePage} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/signin" component={SigninPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/management" component={ProductMangement} />
          <Route path="/shipping" component={ShippingPage} />
          <Route path="/payment" component={PaymentsPage} />
          <Route path="/placeorder" component={OrderPage} />
          <Route path="/about" component={AboutPage} />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
