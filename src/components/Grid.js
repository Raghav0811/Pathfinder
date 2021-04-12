import React from "react";
import axios from "axios";
import Node from "../Pathfinder/Node/Node";
import BasicButton from "./BasicButton";
import Toggle from "./Toggle";
import useGridData from "../hooks/useGridData";
import "../Styles/Grid.css";
import "../Styles/ToolBar.css";

import {
  START_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
  iniGrid,
  resetCss,
} from "../helpers/gridHelpers";
// import visualizeDjikstra from "../helpers/djikstraHelpers";
import "../Styles/Grid.css";

export default function Grid(props) {
  const { algorithm, toggleCounter } = props;

  const manageVisualization = (algorithm) => {
    Promise.resolve(axios.put("/counters/2")).then(() => {
      toggleCounter();
      startVisualization(algorithm);
    });
  };

  const {
    state,
    mouseDown,
    mouseUp,
    togglePickup,
    toggleWall,
    moveNode,
    resetGrid,
    startVisualization,
    toggleWeight,
  } = useGridData();
  // export default function Grid() {
  //   const [state, setState] = useState({
  //     grid: iniGrid(),
  //     mousePressed: false,
  //     inProgress: false,
  //     isStartPickup: false,
  //     isEndPickup: false,
  //     startRow: 0,
  //     startCol: 0,
  //     finishRow: 14,
  //     finishCol: 30,
  //     makeWall: true,
  //     makeWeight: false,
  //   });

  //   const mouseDown = (row, col) => {
  //     setState((prev) => ({ ...prev, mousePressed: true }));
  //   };

  //   const mouseUp = (row, col) => {
  //     setState((prev) => ({ ...prev, mousePressed: false }));
  //   };

  //   function toggleWall(row, col, isWall, isStart, isFinish) {
  //     //if the user clicks on an empty square, create a wall
  //     if (
  //       !isStart &&
  //       !isFinish &&
  //       !state.inProgress &&
  //       !state.isStartPickup &&
  //       !state.isEndPickup &&
  //       state.makeWall
  //     ) {
  //       const newNode = {
  //         ...state.grid[row][col],
  //         isWall,
  //       };
  //       const newRow = [...state.grid[row]];
  //       newRow[col] = newNode;
  //       const grid = [...state.grid];
  //       grid[row] = newRow;

  //       setState((prev) => ({ ...prev, grid }));

  //       //if the user clicks on an empty square and the state is set to make weight, then create a weight
  //     } else if (
  //       !isStart &&
  //       !isFinish &&
  //       !state.inProgress &&
  //       !state.isStartPickup &&
  //       !state.isEndPickup &&
  //       state.makeWeight
  //     ) {
  //       const newNode = {
  //         ...state.grid[row][col],
  //         isWeighted: true,
  //       };

  //       const newRow = [...state.grid[row]];
  //       newRow[col] = newNode;

  //       const grid = [...state.grid];
  //       grid[row] = newRow;

  //       setState((prev) => ({ ...prev, grid }));

  //       //if the user clicks on a starting node, active node
  //     } else if (isStart && !state.isStartPickup && !state.inProgress) {
  //       setState((prev) => ({ ...prev, isStartPickup: true }));
  //       //while user is dragging starting node, create new grid and change state
  //     } else if (state.isStartPickup && state.mousePressed) {
  //       console.log(row, col);
  //       const setNewStart = () => {
  //         const grid = [];
  //         // for each row in the grid...
  //         for (let rowArray = 0; rowArray < 15; rowArray++) {
  //           const currentRow = [];
  //           // for each column in the row...
  //           for (let colValue = 0; colValue < 50; colValue++) {
  //             // resave all the nodes with a new isStart condition mapped to a new row and col value
  //             const newNode = {
  //               ...state.grid[rowArray][colValue],
  //               isStart: rowArray === row && colValue === col,
  //             };
  //             currentRow.push(newNode);
  //           }
  //           grid.push(currentRow);
  //         }
  //         return grid;
  //       };
  //       setState((prev) => ({
  //         ...prev,
  //         startRow: row,
  //         startCol: col,
  //         grid: setNewStart(),
  //       }));
  //       //when user stops dragging the node, stop moving the node
  //     } else if (state.isStartPickup && !state.mousePressed) {
  //       setState((prev) => ({ ...prev, isStartPickup: false }));
  //       //if the user clicks on a ending node, active node
  //     } else if (isFinish && !state.isEndPickup && !state.inProgress) {
  //       console.log("clicked");
  //       setState((prev) => ({ ...prev, isEndPickup: true }));
  //       //while user is dragging ending node, create new grid and change state
  //     } else if (state.isEndPickup && state.mousePressed) {
  //       console.log(row, col);
  //       const setNewEnd = () => {
  //         const grid = [];
  //         // for each row in the grid...
  //         for (let rowArray = 0; rowArray < 15; rowArray++) {
  //           const currentRow = [];
  //           // for each column in the row...
  //           for (let colValue = 0; colValue < 50; colValue++) {
  //             // resave all the nodes with a new isStart condition mapped to a new row and col value
  //             const newNode = {
  //               ...state.grid[rowArray][colValue],
  //               isFinish: rowArray === row && colValue === col,
  //             };
  //             currentRow.push(newNode);
  //           }
  //           grid.push(currentRow);
  //         }
  //         return grid;
  //       };
  //       setState((prev) => ({
  //         ...prev,
  //         finishRow: row,
  //         finishCol: col,
  //         grid: setNewEnd(),
  //       }));
  //       //when user is finished dragging ending node, create new grid and change state
  //     } else if (state.isEndPickup && !state.mousePressed) {
  //       setState((prev) => ({ ...prev, isEndPickup: false }));
  //     }
  //   }

  return (
    <div>
      <div className="ToolBar">
        <section className="Buttons">
          <BasicButton
            text="Visualize"
            size="large"
            color="primary"
            onClick={() => manageVisualization(algorithm)}
          />
          <BasicButton
            text="Reset Grid"
            size="small"
            color="secondary"
            onClick={resetGrid}
          />
        </section>
        <section className="Toggle">
          <Toggle drawWall={state.drawWall} toggleWeight={toggleWeight} />
        </section>
      </div>
      <div className="Grid" onMouseDown={mouseDown} onMouseUp={mouseUp}>
        {state.grid.map((row, rowIndex) => {
          return row.map((node, nodeIndex) => {
            const {
              row,
              col,
              isStart,
              isFinish,
              isVisited,
              isWall,
              isWeight,
              lastRow,
              lastCol,
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
                isWeight={isWeight}
                lastRow={lastRow}
                lastCol={lastCol}
                mousePressed={state.mousePressed}
                toggleWall={toggleWall}
                togglePickup={togglePickup}
                isStartPickup={state.isStartPickup}
                isFinishPickup={state.isFinishPickup}
                moveNode={moveNode}
              />
            );
          });
        })}
      </div>
    </div>
  );
}
