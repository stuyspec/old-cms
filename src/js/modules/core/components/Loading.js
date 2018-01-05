import React from "react";
import injectSheet from "react-jss";

const styles = {
  spinner: {
    width: "40px",
    height: "40px",
    margin: "100px auto",
    backgroundColor: "#333",
    borderRadius: "100%",
    "-webkit-animation": "sk-scaleout 1.0s infinite ease-in-out",
    animation: "sk-scaleout 1.0s infinite ease-in-out"
  },

  "@-webkit-keyframes sk-scaleout": {
    "0%": {
      "-webkit-transform": "scale(0)"
    },
    "100%": {
      "-webkit-transform": "scale(1.0)",
      opacity: 0
    }
  },

  "@keyframes sk-scaleout": {
    "0%": {
      "-webkit-transform": "scale(0)",
      transform: "scale(0)"
    },
    "100%": {
      "-webkit-transform": "scale(1.0)",
      transform: "scale(1.0)",
      opacity: 0
    }
  }
};

const Loading = ({ classes }) => {
  return <div className={classes.spinner} />;
};

export default injectSheet(styles)(Loading);
