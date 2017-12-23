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
    backgroundColor: "lightgray",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    color: "black"
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
          <div className={classes.items}>
            {children}
          </div>}
      </div>
    );
  }
}

export default injectSheet(styles)(Dropdown);
