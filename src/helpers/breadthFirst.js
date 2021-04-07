import {
  getShortestPathNodes,
  animateDjikstra,
} from "../helpers/djikstraHelpers";

export const getUnvisitedNeighborsBfs = (node, grid) => {
  const neighbors = [];
  const { row, col } = node;
  if (grid[row - 1] && !grid[row - 1][col].isWall) {
    neighbors.push(grid[row - 1][col]);
  }
  if (grid[row + 1] && !grid[row + 1][col].isWall) {
    neighbors.push(grid[row + 1][col]);
  }
  if (grid[row][col - 1] && !grid[row][col - 1].isWall) {
    neighbors.push(grid[row][col - 1]);
  }

  if (grid[row][col + 1] && !grid[row][col + 1].isWall) {
    neighbors.push(grid[row][col + 1]);
  }
  return neighbors;
};
export const bfs = (start, end, grid) => {
  let queue = [start];
  let visitedNodes = [];
  while (queue.length > 0) {
    const currentNode = queue.shift();
    currentNode.isVisited = true;
    visitedNodes.push(currentNode);
    if (currentNode === end) {
      return visitedNodes;
    }
    const neighbors = getUnvisitedNeighborsBfs(currentNode, grid);
    neighbors.forEach((neighbor) => {
      if (!neighbor.isVisited && !neighbor.isWall) {
        neighbor.previousNode = currentNode;
        queue.push(neighbor);
      }
    });
  }
  return visitedNodes;
};

export default function visualizeBfs(grid, startNode, finishNode, setState) {
  const startNodeObj = grid[startNode.row][startNode.col];
  const finishNodeObj = grid[finishNode.row][finishNode.col];
  const visitedNodesInOrder = bfs(grid, startNodeObj, finishNodeObj);
  const shortestPathNodes = getShortestPathNodes(finishNodeObj);

  animateDjikstra(visitedNodesInOrder, shortestPathNodes, setState);
  // animateDijkstra(visitedNodesInOrder, shortestPathNodes);
}
