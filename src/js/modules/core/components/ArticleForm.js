import React from "react";
import { Field, formValueSelector, reduxForm } from "redux-form";
import Input from "./Input";
import injectSheet from "react-jss";
import { connect } from "react-redux";
import ContributorsInput from './ContributorsInput'
import { UsersQuery } from '../queries'
import { graphql } from 'react-apollo'

const styles = {
  contributors: {
    maxWidth: "500px",
    padding: "20px"
  },
  content: {
    padding: "5px",
    margin: "20px",
    fontSize: "1.05em"
  }
};
const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "Required";
  }
  if (!formValues.content) {
    errors.content = "Required";
  }
  return errors;
};

const ArticleForm = ({
  classes,
  data: { loading, allUsers },
  handleSubmit,
  submitting,
  status,
  content,
}) => {
  if (loading) {
    return <div> Loading... </div>
  }
  const users = allUsers.map(user => ({
    value: parseInt(user.id),
    label: user.email
  }))

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Field
          name="title"
          type="text"
          label="Title"
          component={Input}
        />
        <Field
          className={classes.contributors}
          multi={true}
          name="contributors"
          component={ContributorsInput}
          options={users}
        />
        <Field
          className={classes.content}
          name="content"
          type="text"
          label="Content"
          component="textarea"
          rows="30"
          cols="80"
        />{" "}
        <br />
        <button type="submit" disabled={submitting}>
          {" "}Submit{" "}
        </button>
      </form>
      {status &&
        status.errors.map((error, index) =>
          <p key={index}>
            {" "}{error}{" "}
          </p>
        )}

      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
const ConnectedArticleForm = reduxForm({
  form: "editArticle",
  validate
})(injectSheet(styles)(ArticleForm));

const selector = formValueSelector("editArticle");

const mapStateToProps = state => ({
  content: selector(state, "content")
});

export default connect(mapStateToProps)(graphql(
UsersQuery
)(ConnectedArticleForm));
