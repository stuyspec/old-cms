import React from "react";
import ArticlesList from "./ArticlesList";
import { graphql } from "react-apollo";
import { SearchArticlesQuery } from "../queries";
import Loading from './Loading'

const SearchResults = ({ data: { loading, searchArticles } }) => {
  if (loading) {
    return <Loading />;
  }
  const articles = searchArticles.map(
    searchArticles => searchArticles.searchable
  );
  return (
    <div>
      <ArticlesList articles={articles} />
    </div>
  );
};

export default graphql(SearchArticlesQuery, {
  options: ({ query }) => ({
    variables: {
      query
    }
  })
})(SearchResults);
