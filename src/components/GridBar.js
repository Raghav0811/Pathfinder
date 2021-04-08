import React from "react";
import ToolBar from "./ToolBar";
import Legend from "./Legend";

import "../Styles/GridBar.css";

export default function GridBar() {
  return (
    <div className="GridBar">
      <ToolBar></ToolBar>
      <Legend></Legend>
    </div>
  );
}
