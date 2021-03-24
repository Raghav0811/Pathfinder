import React from "react";
import Node from "../Pathfinder/Node/Node";

import "../Styles/Grid.css";

export default function Grid() {
  // const [nodes, setNodes] = useState([])

  const iniGrid = [];

  for (let row = 0; row < 15; row++) {
    const currentRow = [];

    for (let col = 0; col < 50; col++) {
      const currentNode = {
        row,
        col,
        isStart: row === 10 && col === 5,
        isFinish: row === 10 && col === 45,
      };
      currentRow.push(currentNode);
    }

    iniGrid.push(currentRow);
  }

  const grid = iniGrid.map((row, rowIndex) => {
    return row.map((node, nodeIndex) => {
      return (
        <Node key={nodeIndex} isStart={node.isStart} isFinish={node.isFinish} />
      );
    });
  });

  return <div className="Grid">{grid}</div>;
}
