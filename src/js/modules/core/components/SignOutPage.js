import React, { Component } from "react";
import { delay } from "../utils";
import { deleteSession } from "../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import injectSheet from "react-jss";

const styles = {
  alert: {
    color: "red",
    fontSize: "1.2em"
  }
};

class SignOut extends Component {
  componentDidMount() {
    const { deleteSession, push } = this.props;
    deleteSession();
    localStorage.removeItem("client")
    localStorage.removeItem("token")
    localStorage.removeItem("uid")
    localStorage.removeItem("expiry")
    delay(1000).then(() => {
      push("/");
    });
  }

  render() {
    const { classes } = this.props;
    return <div className={classes.alert}>Signed out!</div>;
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ deleteSession, push }, dispatch);

export default connect(null, mapDispatchToProps)(
    injectSheet(styles)(SignOut)
);
