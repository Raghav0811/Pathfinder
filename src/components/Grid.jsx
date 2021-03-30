import React, { useState } from "react";
import Node from "../Pathfinder/Node/Node";
import {
  START_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
  iniGrid,
  resetCss,
} from "../helpers/gridHelpers";
import visualizeDjikstra from "../helpers/djikstraHelpers";
import "../Styles/Grid.css";

export default function Grid() {
  const [state, setState] = useState({
    grid: iniGrid(),

    mousePressed: false,

    inProgress: false,

    hasStart: true,

    startRow: START_NODE_ROW,

    startCol: START_NODE_COL,

    hasFinish: true,

    finishRow: FINISH_NODE_ROW,

    finishCol: FINISH_NODE_COL,

    isStartPickup: false,
  });

  const mouseDown = (row, col) => {
    setState((prev) => ({ ...prev, mousePressed: true }));
  };

  const mouseUp = (row, col) => {
    setState((prev) => ({ ...prev, mousePressed: false }));
  };

  function toggleNode(row, col, isWall, isStart, isFinish) {
    if (isStart || !state.hasStart) {
      return toggleStart(row, col);
    } else if (isFinish || !state.hasFinish) {
      return toggleEnd(row, col);
    } else {
      return toggleWall(row, col, isWall, isStart, isFinish);
    }
  }

  function toggleStart(row, col) {
    if (state.hasStart) {
      const newNode = {
        ...state.grid[row][col],
        isStart: false,
      };

      const newRow = [...state.grid[row]];
      newRow[col] = newNode;

      const grid = [...state.grid];
      grid[row] = newRow;

      let hasStart = false;

      setState((prev) => ({ ...prev, grid, hasStart }));

      return;
    } else {
      const newNode = {
        ...state.grid[row][col],
        isStart: true,
      };

      const newRow = [...state.grid[row]];
      newRow[col] = newNode;

      const grid = [...state.grid];

      grid[row] = newRow;

      const hasStart = true;

      const startRow = row;

      const startCol = col;

      setState((prev) => ({ ...prev, grid, hasStart, startRow, startCol }));

      return;
    }
  }

  function toggleEnd(row, col) {
    if (state.hasFinish) {
      const newNode = {
        ...state.grid[row][col],

        isFinish: false,
      };

      const newRow = [...state.grid[row]];

      newRow[col] = newNode;

      const grid = [...state.grid];

      grid[row] = newRow;

      let hasFinish = false;

      setState((prev) => ({ ...prev, grid, hasFinish }));

      return;
    } else {
      const newNode = {
        ...state.grid[row][col],

        isFinish: true,
      };

      const newRow = [...state.grid[row]];

      newRow[col] = newNode;

      const grid = [...state.grid];

      grid[row] = newRow;

      const hasFinish = true;

      const finishRow = row;

      const finishCol = col;

      setState((prev) => ({ ...prev, grid, hasFinish, finishRow, finishCol }));

      return;
    }
  }

  function toggleWall(row, col, isWall, isStart, isFinish) {
    if (!isStart && !isFinish && !state.inProgress && !state.isStartPickup) {
      const newNode = {
        ...state.grid[row][col],
        isWall,
      };

      const newRow = [...state.grid[row]];
      newRow[col] = newNode;

      const grid = [...state.grid];
      grid[row] = newRow;

      setState((prev) => ({ ...prev, grid }));
    } else if (isStart && !state.isStartPickup) {
      console.log("clicked");
      setState((prev) => ({ ...prev, isStartPickup: true }));
    } else if (state.isStartPickup) {
      console.log(row, col);

      const setNewGrid = () => {
        const grid = [];

        // for each row in the grid...
        for (let rowArray = 0; rowArray < 15; rowArray++) {
          const currentRow = [];

          // for each column in the row...
          for (let colValue = 0; colValue < 50; colValue++) {
            // create node and push
            const newNode = {
              ...state.grid[rowArray][colValue],
              isStart: rowArray === row && colValue === col,
            };

            currentRow.push(newNode);
          }

          grid.push(currentRow);
        }

        return grid;
      };

      setState((prev) => ({ ...prev, grid: setNewGrid() }));
    }
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
            state.startRow,
            state.startCol,
            state.finishRow,
            state.finishCol
          );
        }}
      >
        Please Work!
      </button>
      <button
        onClick={() => {
          setState((prev) => ({ ...prev, inProgress: false }));
          if (!state.inProgress) {
            resetCss(state.grid, state.inProgress);
            setState((prev) => ({
              ...prev,
              grid: iniGrid(),
              mousePressed: false,
              inProgress: false,
              hasStart: true,
              startRow: START_NODE_ROW,
              startCol: START_NODE_COL,
              hasFinish: true,
              finishRow: FINISH_NODE_ROW,
              finishCol: FINISH_NODE_COL,
            }));
          } else {
            return;
          }
        }}
      >
        Refresh
      </button>
    </div>
  );
}
