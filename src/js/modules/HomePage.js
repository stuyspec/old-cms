import React from "react";
import injectSheet from "react-jss"

const styles = {
  image: {
    maxWidth: "600px"
  }
}

const HomePage = ({ classes }) => {
  const url = "https://s3.amazonaws.com/screenshots." +
    "nicholasyang.com/Screen+Shot+2017-07-03+at+11.11.38+AM.png"
  return (
    <img className={classes.image} src={url} />
  );
};


export default injectSheet(styles)(HomePage);