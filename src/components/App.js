import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import Category from "../pages/Category";
import Cart from "../pages/Cart";
import Header from "./Header";
import ProductDetails from "../pages/ProductDetails";
import { client } from "..";
import { CATEGORIES_QUERY } from "../graphQL/queries";


class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    client
      .query({
        query: CATEGORIES_QUERY,
      })
      .then((result) =>
        this.setState({ categories: result.data.categories })
      );
  }

  render() {
    const { categories } = this.state;
    return (
      <Provider store={store}>
        <Header categories={categories} />
        <Routes>
          { categories.map(({ name }) => {
            return (
              <Route 
                key={name}
                exact path={`/${name === "all" ? "" : name}`}
                element={<Category name={name} />}
              />
            )
          }) }
          <Route exact path="/cart" element={<Cart />} />
          <Route
            exact
            path="/product-details/:id"
            element={<ProductDetails />}
          />
        </Routes>
      </Provider>
    );
  }
}

export default App;
