import React, { Component } from "react";
import injectSheet from "react-jss";

const styles = {
  dropdown: {
    minWidth: "100px"
  },
  title: {
    color: "black",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  items: {
    backgroundColor: "whitesmoke",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    color: "black",
    position: "absolute",
    boxShadow: "0px 8px 16px rgba(0,0,0,0.2)"
  }
};

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { title, children, classes } = this.props;
    const { isOpen } = this.state;
    return (
      <div className={classes.dropdown}>
        <a className={classes.title} href="#" onClick={this.handleClick}>
          <h2>
            {" "}{title}{" "}
          </h2>
        </a>
        {isOpen &&
          <div className={classes.items} onClick={this.handleClick}>
            {children}
          </div>}
      </div>
    );
  }
}

export default injectSheet(styles)(Dropdown);
