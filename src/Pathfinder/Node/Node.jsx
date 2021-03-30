import React from "react";
import "./Node.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
// import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
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
    isStartPickup,
  } = props;

  const checkGridPressed = () => {
    if (mousePressed) {
      toggleWall(row, col, !isWall, isStart, isFinish, isStartPickup);
    }
  };

  const classes = classNames("Node", {
    "node-start": isStart,
    "node-finish": isFinish,
    "node-wall": isWall,
  });

  const mountStartIcon = () => {
    if (isStart) {
      return <FontAwesomeIcon icon={faLocationArrow} />;
    }
  };

  const mountFinishIcon = () => {
    if (isFinish) {
      return <FontAwesomeIcon icon={faMapMarkerAlt} />;
    }
  };

  return (
    <div
      id={`node-${row}-${col}`}
      className={classes}
      onMouseEnter={checkGridPressed}
      onClick={() => toggleWall(row, col, !isWall, isStart, isFinish)}
    >
      {mountStartIcon()}
      {mountFinishIcon()}
    </div>
  );
}
