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
    isStartPickup: false,
    isEndPickup: false,
    startRow: 0,
    startCol: 0,
    finishRow: 14,
    finishCol: 30,
  });

  const mouseDown = (row, col) => {
    setState((prev) => ({ ...prev, mousePressed: true }));
  };

  const mouseUp = (row, col) => {
    setState((prev) => ({ ...prev, mousePressed: false }));
  };

  function toggleWall(row, col, isWall, isStart, isFinish) {
    //if the user clicks on an empty square, create a wall
    if (
      !isStart &&
      !isFinish &&
      !state.inProgress &&
      !state.isStartPickup &&
      !state.isEndPickup
    ) {
      const newNode = {
        ...state.grid[row][col],
        isWall,
      };

      const newRow = [...state.grid[row]];
      newRow[col] = newNode;

      const grid = [...state.grid];
      grid[row] = newRow;

      setState((prev) => ({ ...prev, grid }));

      //if the user clicks on a starting node, active node
    } else if (isStart && !state.isStartPickup && !state.inProgress) {
      setState((prev) => ({ ...prev, isStartPickup: true }));

      //while user is dragging starting node, create new grid and change state
    } else if (state.isStartPickup && state.mousePressed) {
      console.log(row, col);

      const setNewStart = () => {
        const grid = [];

        // for each row in the grid...
        for (let rowArray = 0; rowArray < 15; rowArray++) {
          const currentRow = [];

          // for each column in the row...
          for (let colValue = 0; colValue < 50; colValue++) {
            // resave all the nodes with a new isStart condition mapped to a new row and col value
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
      setState((prev) => ({
        ...prev,
        startRow: row,
        startCol: col,
        grid: setNewStart(),
      }));

      //when user stops dragging the node, stop moving the node
    } else if (state.isStartPickup && !state.mousePressed) {
      setState((prev) => ({ ...prev, isStartPickup: false }));

      //if the user clicks on a ending node, active node
    } else if (isFinish && !state.isEndPickup && !state.inProgress) {
      console.log("clicked");
      setState((prev) => ({ ...prev, isEndPickup: true }));

      //while user is dragging ending node, create new grid and change state
    } else if (state.isEndPickup && state.mousePressed) {
      console.log(row, col);

      const setNewEnd = () => {
        const grid = [];

        // for each row in the grid...
        for (let rowArray = 0; rowArray < 15; rowArray++) {
          const currentRow = [];

          // for each column in the row...
          for (let colValue = 0; colValue < 50; colValue++) {
            // resave all the nodes with a new isStart condition mapped to a new row and col value
            const newNode = {
              ...state.grid[rowArray][colValue],
              isFinish: rowArray === row && colValue === col,
            };

            currentRow.push(newNode);
          }

          grid.push(currentRow);
        }

        return grid;
      };

      setState((prev) => ({
        ...prev,
        finishRow: row,
        finishCol: col,
        grid: setNewEnd(),
      }));

      //when user is finished dragging ending node, create new grid and change state
    } else if (state.isEndPickup && !state.mousePressed) {
      setState((prev) => ({ ...prev, isEndPickup: false }));
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
              toggleWall={toggleWall}
            />
          );
        });
      })}
      <button
        onClick={() => {
          if (state.inProgress === true) {
            return;
          } else {
            setState((prev) => ({ ...prev, inProgress: true }));
            visualizeDjikstra(
              state.grid,
              state.startRow,
              state.startCol,
              state.finishRow,
              state.finishCol,
              setState
            );
          }
        }}
      >
        Please Work!
      </button>
      <button
        onClick={() => {
          //   setState((prev) => ({ ...prev, inProgress: false }));
          if (!state.inProgress === "done") {
            resetCss(state.grid);
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
