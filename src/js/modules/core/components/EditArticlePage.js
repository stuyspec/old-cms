import React from "react";
import { graphql } from "react-apollo";
import {
  ArticleBySlugQuery,
  ArticleByIDQuery
} from '../queries'
import ArticleForm from "./ArticleForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import { UpdateArticle } from "../mutations";

const EditArticlePage = ({
  mutate,
  data: { loading, articleBySlug },
  push
}) => {
  const handleSubmit = values => {
    const contributors = values.contributors.map(
      contributor => contributor.value
    );
    // Actually have to convert to a real int cause GraphQL...
    mutate({
      variables: {
        ...values,
        section_id: parseInt(values.section),
        id: articleBySlug.id,
        contributors
      },
      refetchQueries: [
        {
          query: ArticleByIDQuery,
          variables: { id: articleBySlug.id }
        }
      ]
    })
    .then(() => {
      push("/articles");
    })
    .catch(err => {
      console.error(err);
    });
  };
  if (loading) {
    return <div> Loading... </div>;
  }
  const contributors = articleBySlug.contributors.map(user => ({
    value: parseInt(user.id),
    label: user.email
  }));
  const article = {
    ...articleBySlug,
    contributors
  };
  return <ArticleForm initialValues={article} onSubmit={handleSubmit} />;
};
const mapDispatchToProps = dispatch => bindActionCreators({ push }, dispatch);
const ConnectedEditArticlePage = connect(null, mapDispatchToProps)(
  graphql(UpdateArticle)(EditArticlePage)
);

export default graphql(ArticleBySlugQuery, {
  options: ({ match }) => ({ variables: { slug: match.params.slug } })
})(ConnectedEditArticlePage);
