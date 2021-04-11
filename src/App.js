import React from "react";
import Nav from "./components/Nav";
import Legend from "./components/Legend";
// import GridBar from "./components/GridBar";
import Description from "./components/Description";
import Grid from "./components/Grid";
import Counter from "./components/Counter";

import "./App.css";

function App() {
  return (
    <div className="App">
      {/* <Nav /> */}
      <Description />
      <Grid></Grid>
      <Legend />
    </div>
  );
}

export default App;
