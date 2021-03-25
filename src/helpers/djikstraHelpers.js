const getUnvisitedNeighbours = (node, grid) => {
  const neighbours = [];

  const { row, col } = node;

  if (row > 0) {
    neighbours.push(grid[row - 1][col]);
  }
  if (col < grid[0].length - 1) {
    neighbours.push(grid[row][col + 1]);
  }
  if (row < grid.length - 1) {
    neighbours.push(grid[row + 1][col]);
  }
  if (col > 0) {
    neighbours.push(grid[row][col - 1]);
  }
  neighbours.filter((neighbour) => !neighbour.isVisited); // ensure the node has not been visited before

  return neighbours;
};
const updateUnvisitedNeighbours = (node, grid) => {
  const unvisitedNeighbours = getUnvisitedNeighbours(node, grid);

  for (const neighbor of unvisitedNeighbours) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
};

const sortNodesByDistance = (unvisitedNodes) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const removeNestedNodes = (grid) => {
  const nodes = [];

  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }

  return nodes;
};

export function djikstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = removeNestedNodes(grid);

  while (unvisitedNodes.length > 0) {
    // while there are still unvisited nodes...
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift(); // remove the first node in the array (i.e. one of the neighbors)

    if (closestNode.isWall) continue;

    // if the start node is completely surrounded by walls, we can't find any more neighbors (where distance isn't infinity) and are therefore stuck
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    if (closestNode === finishNode) return visitedNodesInOrder; // algorithm complete, finished node has been found
    updateUnvisitedNeighbours(closestNode, grid);
  }
}

const getShortestPathNodes = (finishNode) => {
  const path = [];

  let curretNode = finishNode;

  while (curretNode) {
    path.unshift(curretNode);
    curretNode = curretNode.previousNode;
  }

  return path;
};

const animateDjikstra = (visitedNodesInOrder, shortestPathNodes) => {
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    // once all nodes are animated, animate the shortest path
    if (i === visitedNodesInOrder.length) {
      return;
    }

    setTimeout(() => {
      // for each node in the array, add the 'visited' class
      const node = visitedNodesInOrder[i];

      document.getElementById(`node-${node.row}-${node.col}`).className +=
        " node-visited";
    }, 5 * i);
  }
};

export function visualizeDjikstra(
  grid,
  START_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_ROW,
  FINISH_NODE_COL
) {
  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  const visitedNodesInOrder = djikstra(grid, startNode, finishNode);
  // const shortestPathNodes = getShortestPathNodes(finishNode);

  animateDjikstra(visitedNodesInOrder, "foo");
}
