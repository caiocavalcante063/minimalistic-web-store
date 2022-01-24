import PropTypes from "prop-types"
import React, { Component } from "react";
import CategoryBody from "../components/CategoryBody";
import "../styles/main.css";

export class Category extends Component {
  render() {
    const { name } = this.props;
    return (
      <div className="body-wrapper">
        <h1 className="category-title">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </h1>
        <CategoryBody name={name} />
      </div>
    );
  }
}

Category.propTypes = {
  name: PropTypes.string
}

export default Category;
