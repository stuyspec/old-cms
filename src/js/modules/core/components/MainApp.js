import React, { PureComponent } from "react";
import injectSheet from "react-jss";
import connect from "react-redux/lib/connect/connect";

import { refreshWindowDimensions } from "./../actions";
import { withRouter } from "react-router-dom";
import Header from "./Header";

const styles = {
  appContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "50px",
    backgroundColor: "maroon"
  },
  mainContent: {
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    backgroundColor: "white",
    borderRadius: "10px",
    margin: "25px",
    padding: "20px"
  }
};
class MainApp extends PureComponent {
  onResizeWindow = () => {
    this.props.onResizeWindow();
  };
  componentDidMount() {
    window.addEventListener("resize", this.onResizeWindow);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.onResizeWindow);
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.appContainer}>
        <Header />
        <div className={classes.mainContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const VisibleMainApp = connect(
  (state, ownProps) => ({
    language: state.core.language,
    viewportWidth: state.core.viewportWidth,
    viewportHeight: state.core.viewportHeight
  }),
  dispatch => ({
    onResizeWindow: () => {
      dispatch(refreshWindowDimensions());
    }
  })
)(injectSheet(styles)(MainApp));

export default withRouter(VisibleMainApp);
