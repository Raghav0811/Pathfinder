import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSortDown } from "@fortawesome/free-solid-svg-icons";
// import NavButton from "./NavButton";
import NavDropDown from "./NavDropDown";
import Counter from "./Counter";

import Button from "@material-ui/core/Button";

import "../Styles/NavBar.css";

export default function Nav(props) {
  const { toggleAlgorithm, incrementCounter, disableNav } = props;

  const style = {
    marginRight: "5px",
    color: disableNav ? "rgb(0, 71, 121, 0.75)" : "white",
  };

  return (
    <nav className="Nav">
      <section>
        <a href="/" className="logo">
          Pathfinder
        </a>
        <span className="spacer">&nbsp;</span>
        <Counter incrementCounter={incrementCounter} /> paths visualized
      </section>
      <ul className="nav-buttons">
        <li>
          <Button style={style} disabled={disableNav}>
            &nbsp;Tutorial&nbsp;
          </Button>
        </li>
        <span className="spacer">&nbsp;</span>
        <li>
          <NavDropDown
            toggleAlgorithm={toggleAlgorithm}
            disableNav={disableNav}
          />
        </li>
      </ul>
    </nav>
  );
}
