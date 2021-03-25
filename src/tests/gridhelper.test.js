import { iniGrid } from "../../helpers/gridHelpers";
import expect from "@jest/globals";

test("Creates a grid with 15 rows and 50 columns", () => {
  const grid = iniGrid();
  expect(grid.length) === 15; //15 rows
  expect(grid[0].length) === 50; //50 columns
});

test("Creates a grid with nodes that have col, row, isStart, isFinish, distance, isVisited, isWall and previousNode", () => {
  const grid = iniGrid();
  const firstNode = grid[0][0];

  expect(firstNode.col) === 0;
  expect(firstNode.row) === 0;
  expect(firstNode.isStart) === false;
  expect(firstNode.isFinish) === false;
  expect(firstNode.distance) === Infinity;
  expect(firstNode.isVisited) === false;
  expect(firstNode.isWall) === false;
  expect(firstNode.previousNode) === null;
});
