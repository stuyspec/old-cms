import React from "react";
import { Field, reduxForm } from "redux-form";
import Search from "../icons/Search";
import injectSheet from "react-jss";

const styles = {
  query: {
    padding: "2px",
    fontSize: "1.2em",
    margin: "3px"
  },
  submit: {
    padding: "2px",
    fontSize: "1.1em"
  }
}

const SearchForm = ({ classes, handleSubmit, submitting }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Search />
        <Field
          className={classes.query}
          name="query"
          type="text"
          component="input"
          placeholder="Enter search terms"
        />
        <button type="submit" className={classes.submit} disabled={submitting}>
          Go
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "search"
})(injectSheet(styles)(SearchForm));
