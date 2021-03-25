import React from "react";
import Node from "../Pathfinder/Node/Node";

import {
  START_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
  iniGrid,
} from "../helpers/gridHelpers";
import { djikstra, visualizeDjikstra } from "../helpers/djikstraHelpers";
import "../Styles/Grid.css";

export default function Grid() {
  // const [nodes, setNodes] = useState([])

  const grid = iniGrid();

  //

  visualizeDjikstra(
    grid,
    START_NODE_ROW,
    START_NODE_COL,
    FINISH_NODE_ROW,
    FINISH_NODE_COL
  );

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
