const getUnvisitedNeighbours = (node, grid) => {
  const neighbours = [];

  const { col, row } = node;

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

export default function dijkstra(grid, startNode, finishNode) {
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
