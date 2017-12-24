import React from "react";
import { graphql, compose } from "react-apollo";
import {
  ArticleBySlugQuery,
  ArticleByIDQuery,
  AllSectionsQuery
} from "../queries";
import ArticleForm from "./ArticleForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import { UpdateArticle } from "../mutations";

const EditArticlePage = ({ mutate, article, sections, push }) => {
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
          variables: { id: article.articleBySlug.id }
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
  if (sections.loading || article.loading) {
    return <div> Loading... </div>;
  }
  const contributors = article.articleBySlug.contributors.map(user => ({
    value: parseInt(user.id),
    label: user.email
  }));

  const articleWithContributors = {
    ...article.articleBySlug,
    contributors
  };
  return (
    <ArticleForm
      initialValues={articleWithContributors}
      onSubmit={handleSubmit}
      sections={sections.allSections}
    />
  );
};
const mapDispatchToProps = dispatch => bindActionCreators({ push }, dispatch);

export default compose(
  graphql(ArticleBySlugQuery, {
    options: ({ match }) => ({ variables: { slug: match.params.slug } }),
    name: "article"
  }),
  graphql(AllSectionsQuery, {
    name: "sections"
  }),
  connect(null, mapDispatchToProps),
  graphql(UpdateArticle)
)(EditArticlePage);
