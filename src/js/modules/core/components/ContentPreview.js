import React from "react";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import injectSheet from "react-jss";

const styles = {
  contentPreview: {
    backgroundColor: "lightgray",
    maxWidth: "400px",
    margin: "20px",
    padding: "10px",
    fontSize: "1.1em"
  }
};

const ContentPreview = ({ classes, content }) => {
  return (
    <div className={classes.contentPreview}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

const selector = formValueSelector("article");

const mapStateToProps = state => ({
  content: selector(state, "content")
});

export default connect(mapStateToProps)(injectSheet(styles)(ContentPreview));
