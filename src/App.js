import React, { useState } from "react";
import Nav from "./components/Nav";
import Legend from "./components/Legend";
// import GridBar from "./components/GridBar";
import Description from "./components/Description";
import Grid from "./components/Grid";
import Counter from "./components/Counter";

import "./App.css";

function App() {
  const [state, setState] = useState({
    algorithm: "DJIKSTRA",
    incrementCounter: false,
  });

  const toggleAlgorithm = (newAlgorithm) => {
    const algorithm = newAlgorithm;

    setState((prev) => ({ ...prev, algorithm }));
  };

  const toggleCounter = () => {
    const incrementCounter = !state.incrementCounter;

    setState((prev) => ({ ...prev, incrementCounter }));
  };

  return (
    <div className="App">
      <Nav
        toggleAlgorithm={toggleAlgorithm}
        incrementCounter={state.incrementCounter}
      />
      <Description algorithm={state.algorithm} />
      <Grid
        algorithm={state.algorithm}
        inProgress={state.inProgress}
        toggleCounter={toggleCounter}
      />
      <Legend />
    </div>
  );
}

export default App;
