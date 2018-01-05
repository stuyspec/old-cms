import React from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Component } from "react/lib/ReactBaseClasses";
import Dropdown from "./Dropdown";

const styles = {
  links: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    flex: "1 0 auto",
    flexWrap: "wrap"
  },
  link: {
    color: "black",
  },
  masthead: {
    color: "black"
  },
  headerLink: {
    color: "black",
    "&:hover": {
      textDecoration: "underline"
    }
  },
};

const Header = ({ classes }) => {
  return (
    <div>
      <Link className={classes.masthead} to="/">
        {" "}<h1> Stuyvesant Spectator CMS </h1>{" "}
      </Link>
      <div className={classes.links}>
        <Dropdown title="Create">
          <div className={classes.link}>
            <Link to="/articles/new">
              {" "}<h3> Article </h3>{" "}
            </Link>
          </div>
          <div className={classes.link}>
            <Link to="/sections/new">
              {" "}<h3> Section </h3>{" "}
            </Link>
          </div>
        </Dropdown>
        <Dropdown title="Find">
          <div className={classes.link}>
            <Link to="/articles">
              {" "}<h3> Articles </h3>{" "}
            </Link>
          </div>
          <div className={classes.link}>
            <Link to="/sections">
              {" "}<h3> Section </h3>
            </Link>
          </div>
        </Dropdown>
        <div className={classes.headerLink}>
          <Link to="/users/sign_in">
            {" "}<h2> Sign In </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default injectSheet(styles)(Header);
