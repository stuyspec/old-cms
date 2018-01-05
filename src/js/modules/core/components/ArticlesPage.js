import React from "react";
import { graphql } from "react-apollo";
import { AllArticlesQuery } from "../queries";
import ArticlesList from "./ArticlesList";
import SearchForm from "./SearchForm";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import Loading from './Loading'

const ArticlesPage = ({ push, data: { loading, allArticles } }) => {
  if (loading) {
    return <Loading />;
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
  graphql(AllArticlesQuery)(ArticlesPage)
);
