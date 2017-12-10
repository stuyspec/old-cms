import React, { PureComponent } from "react";
import injectSheet from "react-jss";
import connect from "react-redux/lib/connect/connect";

import { refreshWindowDimensions } from "./../actions";
import ArticlesList from './ArticlesList'

const styles = {
    appContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
}
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
          <ArticlesList />
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

export default VisibleMainApp;
