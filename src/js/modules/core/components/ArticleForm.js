import React from "react";
import { Field, reduxForm } from "redux-form";
import Input from "./Input";

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

const ArticleForm = ({ handleSubmit, submitting, status }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Field name="title" type="text" label="Title" component={Input} />
        <Field name="content" type="text" label="Content" component={Input} />
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
    </div>
  );
};

export default reduxForm({
  form: "article",
  validate
})(ArticleForm);
