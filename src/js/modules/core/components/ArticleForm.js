import React from "react";
import { Field, reduxForm } from "redux-form";
import Input from "./Input";
import injectSheet from "react-jss";
import ContributorsInput from "./ContributorsInput";
import { AllUsersQuery } from "../queries";
import { graphql, compose } from "react-apollo";
import ContentPreview from "./ContentPreview";

const styles = {
  contributors: {
    maxWidth: "500px",
    padding: "20px"
  },
  content: {
    padding: "5px",
    margin: "20px",
    fontSize: "1.05em"
  },
  section: {
    margin: "20px",
    "-webkit-appearance": "menulist-button",
    height: "50px",
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

let ArticleForm = ({
  classes,
  data: { loading, allUsers },
  handleSubmit,
  submitting,
  status,
  sections
}) => {
  if (loading) {
    return <div> Loading... </div>;
  }
  const users = allUsers.map(user => ({
    value: parseInt(user.id),
    label: user.email
  }));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Field name="title" type="text" label="Title" component={Input} />
        <Field
          className={classes.section}
          name="section"
          label="Section"
          component="select"
        >
          {sections.map(section =>
            <option value={section.id} key={section.id}>
              {" "}{section.name}{" "}
            </option>
          )}
        </Field>
        <Field
          className={classes.contributors}
          multi={true}
          name="contributors"
          label="Contributors"
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
      <ContentPreview />
    </div>
  );
};

export default compose(
  graphql(AllUsersQuery),
  injectSheet(styles),
  reduxForm({
    form: "article",
    validate
  })
)(ArticleForm);
