import React, { Component } from "react";
import Node from "./Node/Node";

import "./PathFinder.css";

export default class PathFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        Hi Everyone
        <Node></Node>
      </div>
    );
  }
}
