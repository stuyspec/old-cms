import React, { Component } from "react";
import { graphql } from "react-apollo";
import { gql } from "apollo-client-preset";
import injectSheet from "react-jss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import { Link } from "react-router-dom";
import { AllArticlesQuery } from "../queries";
import Contributors from './Contributors'

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
  expand: {
    color: "blue"
  }
};

class ArticlePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }

  handleClick = () => {
    const { mutate, displayResult, displayError, article } = this.props;
    mutate({
      variables: { id: article.id },
      refetchQueries: [
        {
          query: AllArticlesQuery
        }
      ]
    })
      .then(({ data }) => {
        displayResult(data.deleteArticle);
      })
      .catch(err => {
        displayError(err);
      });
  };

  toggleExpand = event => {
    event.preventDefault();
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  render() {
    const { classes, article } = this.props;
    const { isExpanded } = this.state;
    return (
      <span>
        <Link to={`/articles/${article.slug}`}>
          <h2>
            {" "}{article.title}{" "}
          </h2>
        </Link>
        <Contributors contributors={article.contributors} />
        <div className={classes.content}>
          {isExpanded
            ? <div dangerouslySetInnerHTML={{ __html: article.content }} />
            : article.summary}
        </div>
        <a className={classes.expand} onClick={this.toggleExpand}>
          {isExpanded ? "Close" : "Expand"}
        </a>
        <button onClick={this.handleClick}> Delete </button>
        <Link to={`/articles/${article.slug}/edit`}>
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
