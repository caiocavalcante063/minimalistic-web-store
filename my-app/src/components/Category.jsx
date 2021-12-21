import React, { Component } from 'react';
import { client } from '..';
import { PRODUCTS_QUERY } from '../graphQL/queries';

export default class Category extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    client
      .query({
        query: PRODUCTS_QUERY,
        variables: { title: "clothes" }
      })
      .then(result => this.setState({ products: result.data.category.products }));
  }
  
  render() {
    const { product } = this.state;
    return (
      <div>
        All
      </div>
    )
  }
}
