import React, { useState } from "react";
import Nav from "./components/Nav";
import Legend from "./components/Legend";
import Footer from "./components/Footer";
// import GridBar from "./components/GridBar";
import Description from "./components/Description";
import Grid from "./components/Grid";
// import Counter from "./components/Counter";

import "./App.css";

function App() {
  const [state, setState] = useState({
    algorithm: "DJIKSTRA",
    incrementCounter: false,
    disableNav: false,
  });

  const toggleAlgorithm = (newAlgorithm) => {
    const algorithm = newAlgorithm;

    setState((prev) => ({ ...prev, algorithm }));
  };

  const toggleCounter = () => {
    const incrementCounter = !state.incrementCounter;

    setState((prev) => ({ ...prev, incrementCounter }));
  };

  const toggleNavDisable = (disable) => {
    const disableNav = disable;

    setState((prev) => ({ ...prev, disableNav }));
  };

  return (
    <div className="App">
      <Nav
        toggleAlgorithm={toggleAlgorithm}
        incrementCounter={state.incrementCounter}
        disableNav={state.disableNav}
      />
      <Description algorithm={state.algorithm} />
      <Grid
        algorithm={state.algorithm}
        toggleCounter={toggleCounter}
        toggleNavDisable={toggleNavDisable}
      />
      <Legend />
      <Footer />
    </div>
  );
}

export default App;
