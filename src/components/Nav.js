import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSortDown } from "@fortawesome/free-solid-svg-icons";
// import NavButton from "./NavButton";
import DropDown from "./DropDown";
import Counter from "./Counter";

import "../Styles/NavBar.css";

export default function Nav(props) {
  const { toggleAlgorithm, incrementCounter } = props;

  return (
    <nav className="Nav">
      <section>
        <span className="logo">Pathfinder</span>
        <span className="spacer">&nbsp;</span>
        <span className="viewcount">
          <Counter incrementCounter={incrementCounter} /> algorithms visualized
        </span>
      </section>
      <ul className="nav-buttons">
        <button>Tutorial</button>
        <DropDown toggleAlgorithm={toggleAlgorithm} />
      </ul>
    </nav>
  );
}
