import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import All from "../pages/All";
import Clothes from "../pages/Clothes";
import Cart from "../pages/Cart";
import Header from "./Header";
import ProductDetails from "../pages/ProductDetails";
import Tech from "../pages/Tech";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <Routes>
          <Route exact path="/" element={<All />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/clothes" element={<Clothes />} />
          <Route
            exact
            path="/product-details/:id"
            element={<ProductDetails />}
          />
          <Route exact path="/tech" element={<Tech />} />
        </Routes>
      </Provider>
    );
  }
}

export default App;
