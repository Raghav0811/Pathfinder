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
        <a href="/" className="logo">
          Pathfinder
        </a>
        <span className="spacer">&nbsp;</span>
        <span className="viewcount">
          <Counter incrementCounter={incrementCounter} /> paths visualized
        </span>
      </section>
      <ul className="nav-buttons">
        <button>Tutorial</button>
        <span className="spacer">&nbsp;</span>
        <li>
          <DropDown toggleAlgorithm={toggleAlgorithm} />
        </li>
      </ul>
    </nav>
  );
}
