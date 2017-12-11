import React, { Component } from "react";
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
  },
  success: {
    color: "green",
  },
  error: {
    color: "red",
  },
};

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      error: null,
    };
  }

  handleClick = () => {
    this.props.mutate({ variables: { id: this.props.article.id } })
      .then(({ data }) => {
        this.setState({ result: data.deleteArticle });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  }

  render() {
    const { classes, article } = this.props;

    if (this.state.result) {
      const { __typename, id, title } = this.state.result;
      return <p className={classes.success}>{__typename} #{id} ({title}) has been deleted.</p>;
    } else if (this.state.error) {
      const { status, error, exception } = this.state.error;
      return <p className={classes.error}>{status} {error}: {exception}</p>
    }

    return (
      <span>
        <h2>
          {" "}{article.title}{" "}
        </h2>
        <div className={classes.content}>
          {article.summary}
        </div>
        <button onClick={this.handleClick}> Delete </button>
        <button> Edit </button>
      </span>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ push }, dispatch);
};

export default connect(null, mapDispatchToProps)(
  graphql(DeleteArticleMutation)(injectSheet(styles)(Article))
);
