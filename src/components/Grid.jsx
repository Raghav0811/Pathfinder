import React from "react";
import Node from "../Pathfinder/Node/Node";

import "../Styles/Grid.css";

export default function Grid() {
  // const [nodes, setNodes] = useState([])

  const grid = [];

  for (let row = 0; row < 15; row++) {
    const currentRow = [];

    for (let col = 0; col < 50; col++) {
      currentRow.push([]);
    }

    grid.push(currentRow);
  }

  const nodes = grid.map((node) => {
    return node.map((node1) => {
      return <Node />;
    });
  });

  return <div className="Grid">{nodes}</div>;
}
