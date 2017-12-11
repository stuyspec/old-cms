import React from "react";
import { gql } from "apollo-client-preset";
import { graphql } from "react-apollo";
import Article from './Article'

const ArticlesQuery = gql`
  query ArticlesQuery {
    allArticles {
      id
      summary
      title
      section {
        name
      }
    }
  }
`;


const ArticlesList = ({ data: { allArticles, loading } }) => {
  if (loading) {
    return <div> Loading... </div>;
  }
  return (
    <div>
      <h2> Articles </h2>
      {allArticles.map(article =>
        <Article article={article} key={article.id} />
      )}
    </div>
  );
};

export default graphql(ArticlesQuery)(ArticlesList);
