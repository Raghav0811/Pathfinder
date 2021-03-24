import React from "react";
import "./Node.css";
const classNames = require("classnames");

export default function Node(props) {
  // const { isStart, isFinish } = props;
  const classes = classNames("Node", {
    "node-start": props.isStart,
    "node-finish": props.isFinish,
  });

  return <div className={classes}></div>;
}
