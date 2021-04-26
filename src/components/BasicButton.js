import React from "react";
import Button from "@material-ui/core/Button";
import { theme } from "../Styles/buttonTheme";
import { ThemeProvider } from "@material-ui/core/styles";

const style = {
  marginRight: "10px",
  marginLeft: "10px",
};

export default function BasicButton(props) {
  const { text, onClick, size, color, inProgress } = props;

  const manageDisable = () => {
    if (text === "Reset Grid") {
      if (inProgress === true) {
        return true;
      } else {
        return false;
      }
    } else {
      return inProgress;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        size={size}
        color={color}
        style={style}
        onClick={onClick}
        disableElevation
      >
        {text}
      </Button>
    </ThemeProvider>
  );
}
