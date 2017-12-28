import React from "react";
import injectSheet from "react-jss";
import { AllArticlesQuery } from "../queries";
import { graphql } from "react-apollo";
import { DeleteArticle } from "../mutations";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import { Link } from 'react-router-dom'

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
        {article.contributors.map(user =>
          <Link to={`/users/${user.slug}`} key={user.id}>
            {" "}{user.first_name} {user.last_name}{" "}
          </Link>
        )}
      </h3>
      <div>
        {article.media.medium_attachment_url &&
        <img src={article.media.medium_attachment_url} />
        }
      </div>
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
