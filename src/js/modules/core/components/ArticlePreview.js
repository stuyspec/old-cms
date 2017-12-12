import React, { Component } from "react";
import { graphql } from "react-apollo";
import { gql } from "apollo-client-preset";
import injectSheet from "react-jss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import { Link } from "react-router-dom";

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
  },
  success: {
    color: "green"
  },
  error: {
    color: "red"
  },
  expand: {
    color: "blue"
  }
};

class ArticlePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      error: null,
      isExpanded: false
    };
  }

  handleClick = () => {
    this.props
      .mutate({ variables: { id: this.props.article.id } })
      .then(({ data }) => {
        this.setState({ result: data.deleteArticle });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  toggleExpand = event => {
    event.preventDefault();

    this.setState({ isExpanded: !this.state.isExpanded });
  };

  render() {
    const { classes, article } = this.props;
    const { isExpanded, error, result } = this.state;
    if (result) {
      const { __typename, id, title } = result;
      return (
        <p className={classes.success}>
          {__typename} #{id} ({title}) has been deleted.
        </p>
      );
    } else if (error) {
      const { status, error, exception } = error;
      return (
        <p className={classes.error}>
          {status} {error}: {exception}
        </p>
      );
    }

    return (
      <span>
        <Link to={`/articles/${article.slug}`}>
        <h2>
          {" "}{article.title}{" "}
        </h2>
        </Link>

        <div className={classes.content}>
          {isExpanded
            ? <div dangerouslySetInnerHTML={{ __html: article.content }} />
            : article.summary}
        </div>
        <a className={classes.expand} onClick={this.toggleExpand}>
          {isExpanded ? "Close" : "Expand"}
        </a>
        <button onClick={this.handleClick}> Delete </button>
        <Link to={`/articles/edit/${article.id}`}>
          <button>Edit</button>
        </Link>
      </span>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ push }, dispatch);
};

export default connect(null, mapDispatchToProps)(
  graphql(DeleteArticleMutation)(injectSheet(styles)(ArticlePreview))
);
