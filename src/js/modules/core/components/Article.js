import React from "react";
import injectSheet from "react-jss";
import { ArticlesQuery } from "../queries";
import { graphql } from "react-apollo";
import { DeleteArticle } from "../mutations";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { push } from "react-router-redux"

const styles = {
  content: {
    maxWidth: "500px"
  }
};

const Article = ({ article, classes, mutate, push }) => {
  const handleDelete = () => {
    mutate({
      variables: { id: article.id },
      refetchQueries: [
        {
          query: ArticlesQuery
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

  const handleEdit = () => {
    push(`/articles/${article.slug}/edit`);
  }
  return (
    <div>
      <h1>
        {" "}{article.title}{" "}
      </h1>
      <button onClick={handleDelete}> Delete </button>
      <button onClick={handleEdit}> Edit </button>
      <div
        className={classes.content}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ push }, dispatch);
};

const ConnectedArticle = connect(null, mapDispatchToProps)(Article);
export default graphql(DeleteArticle)(injectSheet(styles)(ConnectedArticle));
