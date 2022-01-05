import React, { Component } from "react";
import Category from "../components/Category";
import "../styles/main.css";

export default class Clothes extends Component {
  render() {
    return (
      <div>
        <h1 className="category-title">Clothes</h1>
        <Category />
      </div>
    );
  }
}
