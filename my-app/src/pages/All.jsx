import React, { Component } from 'react';
import { client } from '..';
import { PRODUCT_QUERY } from '../graphQL/queries';

export default class All extends Component {
  constructor() {
    super();
    this.state = {
      product: '',
    };
  }

  componentDidMount() {
    client
      .query({
        query: PRODUCT_QUERY
      })
      .then(result => this.setState({ product: result.data.product.name }));
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
