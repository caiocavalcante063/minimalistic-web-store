import React, { Component } from "react";
import Category from "../components/Category";
import "../styles/main.css";

export default class Tech extends Component {
  render() {
    return (
      <div className="body-wrapper">
        <h1 className="category-title">Tech</h1>
        <Category />
      </div>
    );
  }
}
