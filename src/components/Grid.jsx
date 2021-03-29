import React, { useState } from "react";
import Node from "../Pathfinder/Node/Node";
import {
  START_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
  iniGrid,
} from "../helpers/gridHelpers";
import visualizeDjikstra from "../helpers/djikstraHelpers";
import "../Styles/Grid.css";

export default function Grid() {
  const [state, setState] = useState({
    grid: iniGrid(),
    mousePressed: false,
    inProgress: false,
  });

  const mouseDown = (row, col) => {
    setState((prev) => ({ ...prev, mousePressed: false }));
  };

  const mouseUp = (row, col) => {
    setState((prev) => ({ ...prev, mousePressed: false }));
  };

  function toggleNode(row, col, isWall, isStart, isFinish) {
    if (!isStart && !isStart && !state.inProgress) {
      toggleWall(row, col, isWall, isStart, isFinish);
    } else {
      return null;
    }
  }

  function toggleWall(row, col, isWall, isStart, isFinish) {
    if (!isStart && !isFinish && !state.inProgress) {
      const newNode = {
        ...state.grid[row][col],
        isWall,
      };

      const newRow = [...state.grid[row]];
      newRow[col] = newNode;

      const grid = [...state.grid];
      grid[row] = newRow;

      setState((prev) => ({ ...prev, grid }));
    } else {
      return;
    }
  }
  //   visualizeDjikstra(
  //     grid,
  //     START_NODE_ROW,
  //     START_NODE_COL,
  //     FINISH_NODE_ROW,
  //     FINISH_NODE_COL
  //   );

  function toWall(node) {
    node.isWall = !node.isWall;
    console.log("clicked a node");
  }

  return (
    <div
      className="Grid"
      onMouseDown={() => mouseDown()}
      onMouseUp={() => mouseUp()}
    >
      {state.grid.map((row, rowIndex) => {
        return row.map((node, nodeIndex) => {
          const {
            row,
            col,
            isStart,
            isFinish,
            isVisited,
            isWall,
            mousePressed,
          } = node;
          return (
            <Node
              key={nodeIndex}
              row={row}
              col={col}
              isStart={isStart}
              isFinish={isFinish}
              isVisited={isVisited}
              isWall={isWall}
              mousePressed={state.mousePressed}
              toggleWall={toggleWall}
              toggleNode={toggleNode}
            />
          );
        });
      })}
      <button
        onClick={() => {
          setState((prev) => ({ ...prev, inProgress: true }));
          visualizeDjikstra(
            state.grid,
            START_NODE_ROW,
            START_NODE_COL,
            FINISH_NODE_ROW,
            FINISH_NODE_COL
          );
        }}
      >
        Hi Everyone
      </button>
    </div>
  );
}
