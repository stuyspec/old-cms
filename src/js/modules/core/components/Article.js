import React from "react";
import { graphql } from "react-apollo";
import { gql } from "apollo-client-preset";
import injectSheet from "react-jss";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { push } from "react-router-redux"


const DeleteArticleMutation = gql`
  mutation DeleteArticleMutation($id: ID!) {
    deleteArticle(id: $id) {
      id
      title
    }
  }
`;

const styles = {
  content: {
    maxWidth: "500px"
  }
};

const Article = ({ article, classes, mutate, push }) => {
  const handleClick = () => {
    mutate({ variables: { id: article.id } })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <span>
      <h2>
        {" "}{article.title}{" "}
      </h2>
      <div className={classes.content}>
        {article.summary}
      </div>
      <button onClick={handleClick}> Delete </button>
      <button> Edit </button>
    </span>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ push }, dispatch);
};

export default connect(null, mapDispatchToProps)(
  graphql(DeleteArticleMutation)(injectSheet(styles)(Article))
);
