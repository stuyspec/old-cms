import React from 'react';
import { Field, reduxForm } from 'redux-form'
import Search from '../icons/Search'


const SearchForm = ({ handleSubmit, submitting }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Search/>
        <Field
          name="query"
          type="text"
          component="input"
          placeholder="Enter search terms"
        />
        <button
          type="submit"
          disabled={submitting}
        >
          Go
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "search",
})(SearchForm);