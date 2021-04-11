import React from "react";
import "./Node.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
// import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faWeightHanging } from "@fortawesome/free-solid-svg-icons";

const classNames = require("classnames");

export default function Node(props) {
  const {
    row,
    col,
    isStart,
    isFinish,
    isWall,
    mousePressed,
    toggleWall,
    togglePickup,
    isStartPickup,
    isFinishPickup,
    moveNode,
    isWeight,
    lastRow,
    lastCol,
  } = props;

  const handleMouseEnter = () => {
    if (mousePressed && (isStartPickup || isFinishPickup)) {
      moveNode(row, col, isStartPickup, isFinishPickup);
    } else if (mousePressed && !isStart && !isFinish) {
      toggleWall(row, col, !isWall, !isWeight);
    }
  };

  const handleMouseDown = () => {
    if (isStart || isFinish) {
      togglePickup(row, col, isStart, isFinish);
    } else {
      toggleWall(row, col, !isWall, !isWeight);
    }
  };

  const classes = classNames("Node", {
    "node-start": isStart,
    "node-finish": isFinish,
    "node-wall": isWall,
    "node-weight": isWeight,
    "node-last-row": lastRow,
    "node-last-col": lastCol,
  });
  const mountIcon = () => {
    if (isStart) {
      return <FontAwesomeIcon icon={faLocationArrow} />;
    } else if (isFinish) {
      return <FontAwesomeIcon icon={faMapMarkerAlt} />;
    } else if (isWeight) {
      return <FontAwesomeIcon icon={faWeightHanging} />;
    }
  };
  return (
    <div
      id={`node-${row}-${col}`}
      className={classes}
      onMouseEnter={handleMouseEnter}
      onMouseDown={handleMouseDown}
    >
      {mountIcon()}
    </div>
  );
}
