import React from "react";
import { graphql } from "react-apollo";
import { ArticleQuery } from "../queries";
import ArticleForm from "./ArticleForm";

const EditArticlePage = ({ data: { loading, articleBySlug } }) => {
  const handleSubmit = values => {
    console.log(values);
  }
  if (loading) {
    return <div> Loading... </div>;
  }
  const contributors = articleBySlug.contributors.map(user => ({
    value: user.id,
    label: user.email
  }))
  const article = {
    ...articleBySlug,
    contributors
  }
  return (
    <ArticleForm initialValues={article} onSubmit={handleSubmit} />
  );
};

export default graphql(ArticleQuery, {
  options: ({ match }) => ({ variables: { slug: match.params.slug } })
})(EditArticlePage);
