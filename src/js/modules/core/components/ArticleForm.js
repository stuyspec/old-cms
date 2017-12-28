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
    fontSize: "1.05em",
    maxWidth: "500px"
  },
  articleForm: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  fields: {
    display: "flex",
    flexDirection: "column"
  },

  submit: {
    maxWidth: "80px",
    padding: "8px",
    fontSize: "1.25em",
    margin: "15px",
    backgroundColor: "white"
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
  if (!formValues.contributors) {
    errors.contributors = "Required";
  }
  return errors;
};

const ArticleForm = ({
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
    <div className={classes.articleForm}>
      <form onSubmit={handleSubmit}>
        <div className={classes.fields}>
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
            component="textarea"
            rows="30"
            cols="80"
          />
          <br />
          <button
            className={classes.submit}
            type="submit"
            disabled={submitting}
          >
            {" "}Submit{" "}
          </button>
          <ContentPreview />
        </div>
      </form>
      {status &&
        status.errors.map((error, index) =>
          <p key={index}>
            {" "}{error}{" "}
          </p>
        )}
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
