import React from "react";
import { Field, reduxForm } from "redux-form";
import Input from "./Input";

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const validate = formValues => {
  const errors = {};
  if (!formValues.email) {
    errors.email = "Required";
  }
  if (!EMAIL_REGEX.test(formValues.email)) {
    errors.email = "Invalid email"
  }
  if (!formValues.password) {
    errors.password = "Required";
  }
  return errors;
};

const SignInForm = ({ handleSubmit, submitting }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field component={Input} name="email" label="Email" />
      <Field
        component={Input}
        type="password"
        name="password"
        label="Password"
      />
      <button type="submit" disabled={submitting}>
        Submit
      </button>
    </form>
  );
};

export default reduxForm({
  form: "signIn",
  validate
})(SignInForm);
