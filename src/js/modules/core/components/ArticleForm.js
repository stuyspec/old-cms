import React from "react";
import { Field, reduxForm } from "redux-form";
import Input from "./Input";
import injectSheet from "react-jss";
import ContributorsInput from "./ContributorsInput";
import { AllUsersQuery } from "../queries";
import { graphql, compose } from "react-apollo";
import Loading from "./Loading";
import { ContentEditor } from "spec-content-editor";

const styles = {
  contributors: {
    maxWidth: "500px",
    padding: "20px"
  },
  content: {
    padding: "5px",
    margin: "20px",
    minWidth: "500px",
    fontSize: "1.05em"
  },
  section: {
    margin: "20px",
    "-webkit-appearance": "menulist-button",
    height: "50px",
    fontSize: "1.05em",
    maxWidth: "300px"
  },
  articleForm: {
    display: "block",
    width: "100%",
    margin: "0"
  },
  fields: {
    display: "flex",
    flexDirection: "column"
  },
  title: {
    maxWidth: "300px"
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
  editorState,
  handleEditorStateChange,
  handleSubmit,
  submitting,
  status,
  sections
}) => {
  if (loading) {
    return <Loading />;
  }
  const users = allUsers.map(user => ({
    value: parseInt(user.id),
    label: user.email
  }));

  return (
    <div className={classes.articleForm}>
      <form onSubmit={handleSubmit}>
        <div className={classes.fields}>
          <div className={classes.title}>
            <Field name="title" type="text" label="Title" component={Input} />
          </div>
          <div className={classes.sections}>
          <Field
            className={classes.section}
            name="section"
            label="Section"
            component="select"
          >
            {sections.map(section => (
              <option value={section.id} key={section.id}>
                {" "}
                {section.name}{" "}
              </option>
            ))}
          </Field>
          </div>
          <Field
            className={classes.contributors}
            multi={true}
            name="contributors"
            label="Contributors"
            component={ContributorsInput}
            options={users}
          />
          <div className={classes.content}>
            <ContentEditor
              onChange={handleEditorStateChange}
              editorState={editorState}
            />
          </div>
          <button
            className={classes.submit}
            type="submit"
            disabled={submitting}
          >
            {" "}
            Submit{" "}
          </button>
        </div>
      </form>
      {status &&
        status.errors.map((error, index) => <p key={index}> {error} </p>)}
    </div>
  );
};

export default compose(
  graphql(AllUsersQuery),
  injectSheet(styles),
  reduxForm({
    form: "article",
    immutableProps: ["editorState"],
    validate
  })
)(ArticleForm);
