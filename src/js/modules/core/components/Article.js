import React from "react";
import injectSheet from "react-jss";
import { AllArticlesQuery } from "../queries";
import { graphql } from "react-apollo";
import { DeleteArticle } from "../mutations";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import { Link } from 'react-router-dom'
import Contributors from './Contributors'

const styles = {
  content: {
    maxWidth: "500px"
  },
  featuredMedia: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};

const Article = ({ article, classes, mutate, push }) => {
  const handleDelete = () => {
    mutate({
      variables: { id: article.id },
      refetchQueries: [
        {
          query: AllArticlesQuery
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
  };
  return (
    <div>
      <h1>
        {" "}{article.title}{" "}
      </h1>
      <span>
        <button onClick={handleDelete}> Delete </button>
        <button onClick={handleEdit}> Edit </button>
      </span>
      <h2>
        {" "}{article.section.name}{" "}
      </h2>
      <h3>
        <Contributors contributors={article.contributors}/>
      </h3>
      <div className={classes.featuredMedia}>
        {article.featured_media &&
        <img src={article.featured_media.medium_attachment_url} />
        }
      </div>
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
