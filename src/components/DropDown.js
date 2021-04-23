import React, { useState, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    color: "white",
  },
  select: {
    margin: "10px",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function Dropdown(props) {
  const { toggleAlgorithm, disableNav } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleAlgToggle = (algorithm) => {
    setOpen(false);

    toggleAlgorithm(algorithm);
  };

  const manageIconMount = () => {
    return open ? (
      <FontAwesomeIcon icon={faCaretUp} />
    ) : (
      <FontAwesomeIcon icon={faCaretDown} />
    );
  };

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const prevOpen = useRef(open);

  return (
    <div className={classes.root}>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.root}
        disabled={disableNav}
      >
        &nbsp;Select Algorithm&nbsp;&nbsp;{manageIconMount()}&nbsp;
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    className={classes.select}
                    onClick={() => handleAlgToggle("DJIKSTRA")}
                  >
                    Dijkstra
                  </MenuItem>
                  <MenuItem
                    className={classes.select}
                    onClick={() => handleAlgToggle("DEPTH-FIRST")}
                  >
                    Depth First
                  </MenuItem>
                  <MenuItem
                    className={classes.select}
                    onClick={() => handleAlgToggle("BREADTH-FIRST")}
                  >
                    Breadth First
                  </MenuItem>
                  <MenuItem
                    className={classes.select}
                    onClick={() => handleAlgToggle("A-STAR")}
                  >
                    A*
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
