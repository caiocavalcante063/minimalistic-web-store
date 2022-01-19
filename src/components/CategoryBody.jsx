import React, { Component } from "react";
import { client } from "..";
import { PRODUCTS_QUERY } from "../graphQL/queries";
import ProductCard from "./ProductCard";

export default class CategoryBody extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };

    this.fetchProducts = this.fetchProducts.bind(this);
  }

  fetchProducts() {
    const path = window.location.pathname;
    const selectedCategory = path === "/" ? "all" : path.split("/")[1];

    client
      .query({
        query: PRODUCTS_QUERY,
        variables: { title: `${selectedCategory}` },
      })
      .then((result) =>
        this.setState({ products: result.data.category.products })
      );
  }

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate(prevState) {
    const path = window.location.pathname;
    const selectedCategory = path === "/" ? "all" : path.split("/")[1];

    if (prevState.name !== selectedCategory) {
      this.fetchProducts();
    }
  }

  render() {
    const { products } = this.state;
    return (
      <div className="category-container">
        {products.map(({ id, name, inStock, gallery, prices, brand }) => {
          return (
            <ProductCard
              key={id}
              id={id}
              name={name}
              inStock={inStock}
              gallery={gallery}
              prices={prices}
              brand={brand}
            />
          );
        })}
      </div>
    );
  }
}
