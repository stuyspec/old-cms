import React, { Component } from "react";
import ArticleForm from "./ArticleForm";
import { CreateArticle } from "../mutations";
import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import { EditorState } from "draft-js";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import { AllSectionsQuery } from "../queries";
import Loading from "./Loading";

class CreateArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  handleChange = editorState => {
    this.setState({ editorState });
  };
  handleSubmit = values => {
    const { push, mutate } = this.props;
    const contributors = values.contributors.map(
      contributor => contributor.value
    );
    mutate({
      variables: {
        ...values,
        content: stateToHTML(this.state.editorState),
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

  render() {
    const { data: { loading, allSections } } = this.props;
    if (loading) {
      return <Loading />;
    }

    const initialValues = {
      section: allSections[0].id || -1,
    };
    return (
      <ArticleForm
        onSubmit={this.handleSubmit}
        sections={allSections}
        editorState={this.state.editorState}
        handleEditorStateChange={this.handleChange}
        initialValues={initialValues}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ push }, dispatch);
export default compose(
  graphql(AllSectionsQuery),
  graphql(CreateArticle),
  connect(null, mapDispatchToProps)
)(CreateArticlePage);
