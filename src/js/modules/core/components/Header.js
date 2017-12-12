import React from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

const styles = {
  link: {
    color: "black",
    paddingLeft: "5px",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  routes: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    flex: "1 0 auto",
    flexWrap: "wrap"
  }
};

const Header = ({ classes }) => {
  return (
    <div>
      <Link className={classes.link} to="/">
        {" "}<h1> Stuyvesant Spectator CMS </h1>{" "}
      </Link>
      <div className={classes.routes}>
        <Link to="/sections">
          {" "}<h2 className={classes.link}> Sections </h2>{" "}
        </Link>
        <Link to="/articles">
          {" "}<h2 className={classes.link}> Articles </h2>{" "}
        </Link>
      </div>
    </div>
  );
};

export default injectSheet(styles)(Header);
