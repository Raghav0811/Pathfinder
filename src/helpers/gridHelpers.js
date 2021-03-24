const START_NODE_COL = 5;
const START_NODE_ROW = 7;

const FINISH_NODE_COL = 45;
const FINISH_NODE_ROW = 7;

// creates the nodes that are pushed into the grid array
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
  };

  return node;
};

const iniGrid = () => {
  const grid = [];

  // for each row in the grid...
  for (let row = 0; row < 15; row++) {
    const currentRow = [];
    // for each column in the row...
    for (let col = 0; col < 50; col++) {
      // create node and push
      currentRow.push(createNode(col, row));
    }

    grid.push(currentRow);
  }

  return grid;
};

export {
  START_NODE_COL,
  START_NODE_ROW,
  FINISH_NODE_COL,
  FINISH_NODE_ROW,
  iniGrid,
};
