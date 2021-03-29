import React from "react";
import "./Node.css";
import makeWall from "../../helpers/wallHelpers";
const classNames = require("classnames");

export default function Node(props) {
  const { row, col, isStart, isFinish, isVisited, isWall } = props;

  const classes = classNames("Node", {
    "node-start": isStart,
    "node-finish": isFinish,
    "node-wall": isWall,
  });

  return <div id={`node-${row}-${col}`} className={classes}></div>;
}
