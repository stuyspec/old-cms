import React from "react";
import { graphql } from "react-apollo";
import ArticlePreview from './ArticlePreview'
import { ArticlesQuery } from '../queries'

const ArticlesList = ({ data: { allArticles, loading } }) => {
  if (loading) {
    return <div> Loading... </div>;
  }
  return (
    <div>
      <h2> Articles </h2>
      {allArticles.map(article =>
        <ArticlePreview article={article} key={article.id} />
      )}
    </div>
  );
};

export default graphql(ArticlesQuery)(ArticlesList);
