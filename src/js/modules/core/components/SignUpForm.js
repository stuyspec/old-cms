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
  if (formValues.password && formValues.password.length < 8) {
    errors.password = "Must be at least 8 characters";
  }
  if (formValues.password !== formValues.passwordConfirmation) {
    errors.passwordConfirmation = "Must be the same as password";
  }
  return errors;
};

const SignUpForm = ({ handleSubmit, submitting }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field component={Input} name="email" label="Email" />
      <Field
        component={Input}
        type="password"
        name="password"
        label="Password"
      />
      <Field
        component={Input}
        type="password"
        name="password_confirmation"
        label="Password confirmation"
      />
      <button type="submit" disabled={submitting}>
        Submit
      </button>
    </form>
  );
};

export default reduxForm({
  form: "signUp",
  validate
})(SignUpForm);