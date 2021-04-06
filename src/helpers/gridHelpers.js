const START_NODE_COL = 3;
const START_NODE_ROW = 3;

const FINISH_NODE_ROW = 14;
const FINISH_NODE_COL = 30;

export default function iniGrid() {
  const grid = [];

  for (let row = 0; row < 15; row++) {
    const currentRow = [];

    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }

    grid.push(currentRow);
  }

  return grid;
}
const createNode = (col, row) => {
  const node = {
    col,
    row,
    isStart: row === 7 && col === 4,
    isFinish: row === 7 && col === 40,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    mousedown: false,
    onMouseEnter: false,
    onMouseUp: false,
  };

  return node;
};

// const resetCss = (grid, inProgress) => {
//   grid.forEach((row) => {
//     row.forEach((node) => {
//       document.getElementById(`node-${node.row}-${node.col}`).className =
//         "Node";
//     });
//   });
// };

// export {
//   START_NODE_COL,
//   START_NODE_ROW,
//   FINISH_NODE_COL,
//   FINISH_NODE_ROW,
//   iniGrid,
//   resetCss,
// };
