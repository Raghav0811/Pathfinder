import React from "react";
import Node from "../Pathfinder/Node/Node";

import {
  START_NODE_COL,
  START_NODE_ROW,
  FINISH_NODE_COL,
  FINISH_NODE_ROW,
  iniGrid,
} from "../helpers/gridHelpers";
import djikstra from "../helpers/djikstraHelpers";

import "../Styles/Grid.css";

// const START_NODE_ROW = 7;
// const START_NODE_COL = 5;

// const FINISH_NODE_ROW = 7;
// const FINISH_NODE_COL = 45;

// const createNode = (row, col) => {
//   const node = {
//     row,
//     col,
//     isStart: row === START_NODE_ROW && col === START_NODE_COL,
//     isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
//     distance: Infinity,
//     isVisited: false,
//     isWall: false,
//     previousNode: null,
//   };

//   return node;
// };

// create the initial array of node objects
// const iniGrid = () => {
//   const grid = [];

//   // for each row in the grid...
//   for (let row = 0; row < 15; row++) {
//     const currentRow = [];

//     // for each column in the row...
//     for (let col = 0; col < 50; col++) {
//       // create node and push
//       currentRow.push(createNode(row, col));
//     }

//     grid.push(currentRow);
//   }

//   return grid;
// };

export default function Grid() {
  // const [nodes, setNodes] = useState([])

  const grid = iniGrid();

  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

  console.log(djikstra(grid, startNode, finishNode));

  return (
    <div className="Grid">
      {grid.map((row, rowIndex) => {
        return row.map((node, nodeIndex) => {
          return (
            <Node
              key={nodeIndex}
              isStart={node.isStart}
              isFinish={node.isFinish}
              isVisited={node.isVisited}
            />
          );
        });
      })}
    </div>
  );
}
