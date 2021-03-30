const START_NODE_COL = 3;
const START_NODE_ROW = 3;

const FINISH_NODE_ROW = 14;
const FINISH_NODE_COL = 30;

const createNode = (col, row) => {
  const node = {
    col,
    row,
    isStart: col === START_NODE_COL && row === START_NODE_ROW,
    isFinish: col === FINISH_NODE_COL && row === FINISH_NODE_ROW,
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

const iniGrid = () => {
  const grid = [];

  for (let row = 0; row < 15; row++) {
    const currentRow = [];

    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }

    grid.push(currentRow);
  }

  return grid;
};

const resetCss = (grid, inProgress) => {
  if (!inProgress) {
    grid.forEach((row) => {
      row.forEach((node) => {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "Node";
      });
    });
  } else {
    return;
  }
};

export {
  START_NODE_COL,
  START_NODE_ROW,
  FINISH_NODE_COL,
  FINISH_NODE_ROW,
  iniGrid,
  resetCss,
};
