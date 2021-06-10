// get the unvisited neighboring nodes for the node being analyzed
export const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const { row, col } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]); // add the node above
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // add the node below
  if (col > 0) neighbors.push(grid[row][col - 1]); // add the node to the left
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // add the node to the right
  return neighbors.filter((neighbor) => !neighbor.isVisited); // ensure the node has not been visited before
};
// establish the neighbors for the new node being analyzed by changing distance from infinity to 0
const updateUnvisitedNeighbors = (node, grid) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    if (node.isWeight) {
      neighbor.distance = node.distance + 3;
      neighbor.previousNode = node;
    } else {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }
};
// sort nodes by distance so that the neighboring nodes are at the beginning of the array
const sortNodesByDistance = (unvisitedNodes) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

// export const sortNodesByCost = (nodes) => {
//   nodes = nodes.sort((nodeA, nodeB) => {
//     if (nodeA.cost > nodeB.cost) return 1;
//     if (nodeA.cost < nodeB.cost) return -1;
//     if (nodeA.cost === nodeB.cost) {
//       const tiebreaker = 1 / (46 * 16);

//       nodeA.cost = nodeA.distanceToStart + nodeA.heuristic * (1.0 + tiebreaker);
//       nodeB.cost = nodeB.distanceToStart + nodeB.heuristic * (1.0 + tiebreaker);

//       if (nodeA.cost > nodeB.cost) return 1;
//       if (nodeA.cost < nodeB.cost) return -1;
//     }
//   });

//   return nodes;
// };

// loops through the grid array and removes the nested layers of the nodes
const removeNestedNodes = (grid) => {
  const nodes = [];

  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }

  return nodes;
};
// core djikstra algorithm
export const djikstra = (
  grid,
  startNode,
  finishNode,
  interNode,
  prevVisitedNodesInOrder
) => {
  const visitedNodesInOrder = {
    firstRun: prevVisitedNodesInOrder,
    secondRun: [],
  };

  // if (prevVisitedNodesInOrder.length) {
  //   for (const node of prevVisitedNodesInOrder) {
  //     visitedNodesInOrder.push(node);
  //   }
  // }

  startNode.distance = 0;
  const unvisitedNodes = removeNestedNodes(grid);
  // const unvisitedNodes = grid;

  while (unvisitedNodes.length > 0) {
    // while there are still unvisited nodes...
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift(); // remove the first node in the array (i.e. one of the neighbors)

    if (closestNode.isWall) continue;

    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    // if the start node is completely surrounded by walls, we can't find any more neighbors (where distance isn't infinity) and are therefore stuck

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    if (
      closestNode.row === finishNode.row &&
      closestNode.col === finishNode.col
    )
      return visitedNodesInOrder; // algorithm complete, finished node has been found
    updateUnvisitedNeighbors(closestNode, grid);
  }
};

export const heuristic = (currentNode, endNode) => {
  const differenceInCol = Math.pow(currentNode.col - endNode.col, 2);
  const differenceInRow = Math.pow(currentNode.row - endNode.row, 2);

  return Math.sqrt(differenceInCol + differenceInRow);
};

export const getNeighborsQueue = (node, grid) => {
  const neighbors = [];

  const { row, col } = node;

  if (grid[row - 1] && !grid[row - 1][col].isWall) {
    neighbors.push(grid[row - 1][col]);
  }

  if (grid[row][col + 1] && !grid[row][col + 1].isWall) {
    neighbors.push(grid[row][col + 1]);
  }

  if (grid[row + 1] && !grid[row + 1][col].isWall) {
    neighbors.push(grid[row + 1][col]);
  }

  if (grid[row][col - 1] && !grid[row][col - 1].isWall) {
    neighbors.push(grid[row][col - 1]);
  }

  return neighbors;
};

// find the shortest path by starting at the end node and moving to node.previousNode
export const getShortestPathNodes = (startNode, finishNode) => {
  const path = [];

  let currentNode = finishNode;

  while (
    currentNode &&
    !(startNode.row === currentNode.row && startNode.col === currentNode.col)
  ) {
    path.unshift(currentNode);
    currentNode = currentNode.previousNode; // once we reach the start node, this becomes null and the loop breaks
  }

  path.unshift(startNode);

  return path;
};

export const animateDjikstra = (
  firstVisitedNodesInOrder,
  firstShortestPathNodes,
  secondVisitedNodesInOrder,
  secondShortestPathNodes,
  setState
) => {
  for (let i = 0; i <= firstVisitedNodesInOrder.length; i++) {
    // once all nodes are animated, animate the shortest path
    const node = firstVisitedNodesInOrder[i];

    if (i === firstVisitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(firstShortestPathNodes, setState);
      }, 10 * i);
    } else {
      setTimeout(() => {
        if (node.lastRow) {
          document.getElementById(`node-${node.row}-${node.col}`).className +=
            " node-visited-last-row";
        }

        if (node.lastCol) {
          document.getElementById(`node-${node.row}-${node.col}`).className +=
            " node-visited-last-col";
        }
        document.getElementById(`node-${node.row}-${node.col}`).className +=
          " node-visited";
      }, 10 * i);
    }
  }
};

export const checkOpenList = (openList, newNode) => {
  let comparison = true;

  openList.forEach((node) => {
    if (node.row === newNode.row && node.col === newNode.col) {
      if (newNode.cost >= node.cost) {
        comparison = false;
        return;
      } else {
        node = newNode;
        comparison = false;
      }
    }
  });

  return comparison;
};

export const animateShortestPath = (shortestPathNodes, setState) => {
  for (let i = 0; i < shortestPathNodes.length; i++) {
    setTimeout(() => {
      const node = shortestPathNodes[i];
      if (node.lasRow) {
        document.getElementById(
          `node-${node.row}-${node.col}`
        ).className += ` node-shortest-path-last-row`;
      }

      if (node.lastCol) {
        document.getElementById(
          `node-${node.row}-${node.col}`
        ).className += ` node-shortest-path-last-col`;
      }
      document.getElementById(`node-${node.row}-${node.col}`).className +=
        " node-shortest-path";
    }, 50 * i);
    if (i === shortestPathNodes.length - 1) {
      setTimeout(() => {
        setState((prev) => ({ ...prev, inProgress: "DONE" }));
      }, 50 * i);
    }
  }
};

export default async function visualizeDjikstra(
  grid,
  startNode,
  finishNode,
  interNode,
  setState
) {
  const firstGrid = grid.map((row) => {
    return row.map((node) => {
      const newNode = {
        ...node,
        isVisited: false,
      };

      return newNode;
    });
  });

  const secondGrid = grid.map((row) => {
    return row.map((node) => {
      const newNode = {
        ...node,
        isVisited: false,
      };

      return newNode;
    });
  });

  const startNodeObj = firstGrid[startNode.row][startNode.col];
  const firstInterNodeObj = interNode
    ? firstGrid[interNode.row][interNode.col]
    : null;
  const secondInterNodeObj = interNode
    ? secondGrid[interNode.row][interNode.col]
    : null;
  const finishNodeObj = interNode
    ? secondGrid[finishNode.row][finishNode.col]
    : firstGrid[finishNode.row][finishNode.col];

  const firstVisitedNodesInOrder = interNode
    ? djikstra(firstGrid, startNodeObj, firstInterNodeObj)
    : djikstra(firstGrid, startNodeObj, finishNodeObj);
  const secondVisitedNodesInOrder = interNode
    ? djikstra(secondGrid, secondInterNodeObj, finishNodeObj)
    : null;

  const firstShortestPathNodes = interNode
    ? getShortestPathNodes(startNodeObj, firstInterNodeObj)
    : getShortestPathNodes(startNodeObj, finishNodeObj);
  const secondShortestPathNodes = interNode
    ? getShortestPathNodes(secondInterNodeObj, finishNodeObj)
    : null;

  animateDjikstra(
    firstVisitedNodesInOrder,
    firstShortestPathNodes,
    secondVisitedNodesInOrder,
    secondShortestPathNodes,
    setState
  );
}
