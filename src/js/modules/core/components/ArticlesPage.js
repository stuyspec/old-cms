import React from "react";
import { graphql } from "react-apollo";
import { ArticlesQuery } from "../queries";
import ArticlesList from "./ArticlesList";
import SearchForm from "./SearchForm";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

const ArticlesPage = ({ push, data: { loading, allArticles } }) => {
  if (loading) {
    return <div> Loading... </div>;
  }
  const handleSearch = values => {
    push(`/search/${values.query}`);
  };

  return (
    <div>
      <SearchForm onSubmit={handleSearch} />
      <ArticlesList articles={allArticles} />
    </div>
  );
};
const mapDispatchToProps = dispatch => bindActionCreators({ push }, dispatch);

export default connect(null, mapDispatchToProps)(
  graphql(ArticlesQuery)(ArticlesPage)
);
