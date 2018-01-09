import React from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { compose } from "react-apollo";
import Dropdown from "./Dropdown";
import { connect } from "react-redux";

const styles = {
  header: {
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    zIndex: "100"
  },
  links: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    flex: "1 0 auto",
    flexWrap: "wrap"
  },
  masthead: {
    fontSize: "1.5em",
    fontFamily: "Old English Text MT",
  },
  headerLink: {
    color: "black",
    "&:hover": {
      textDecoration: "underline"
    }
  }
};

const Header = ({ classes, session }) => {
  return (
    <div className={classes.header}>
      <Link className={classes.masthead} to="/">
        {" "}<h1> The Stuyvesant Spectator </h1>{" "}
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
        {session
          ? <div className={classes.headerLink}>
              <Link to="/users/sign_out">
                {" "}<h2> Sign Out </h2>
              </Link>
            </div>
          : <div className={classes.headerLink}>
              <Link to="/users/sign_in">
                {" "}<h2> Sign In </h2>
              </Link>
            </div>}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  session: state.core.session
});
export default compose(injectSheet(styles), connect(mapStateToProps))(Header);
