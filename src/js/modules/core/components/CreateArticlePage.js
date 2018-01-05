import React from "react";
import ArticleForm from "./ArticleForm";
import { CreateArticle } from "../mutations";
import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import { AllSectionsQuery } from "../queries";
import Loading from './Loading'

const CreateArticlePage = ({ push, mutate, data: { loading, allSections } }) => {
  if (loading) {
    return <Loading />;
  }
  const handleSubmit = values => {
    const contributors = values.contributors.map(
      contributor => contributor.value
    );
    mutate({
      variables: {
        ...values,
        section_id: parseInt(values.section),
        contributors
      }
    })
      .then(({ data }) => {
        push(`/articles/${data.createArticle.slug}`);
      })
      .catch(err => {
        console.error(err);
      });
  };
  const initialValues = {
    section: allSections[0].id || -1
  };
  return (
    <ArticleForm
      onSubmit={handleSubmit}
      sections={allSections}
      initialValues={initialValues}
    />
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({ push }, dispatch);
export default compose(
  graphql(AllSectionsQuery),
  graphql(CreateArticle),
  connect(null, mapDispatchToProps)
)(CreateArticlePage);
