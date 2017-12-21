import React from "react";
import ArticlePreview from "./ArticlePreview";
import { Component } from "react/lib/ReactBaseClasses";
import injectSheet from "react-jss"

const styles = {
  success: {
    color: "green"
  },
  error: {
    color: "red"
  }
}

class ArticlesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      error: null
    };
  }

  displayError = error => {
    this.setState({ error });
  };

  displayResult = result => {
    this.setState({ result });
  };
  render() {
    const { classes, articles } = this.props;
    const { result, error } = this.state;
    return (
      <div>
        <h2> Articles </h2>
        {result &&
          <p className={classes.success}>
            {result.__typename} #{result.id} ({result.title}) has been deleted.
          </p>}
        {error &&
          <p className={classes.error}>
            {error.status} {error}: {error.exception}
          </p>}
        {articles.map(article =>
          <ArticlePreview
            article={article}
            key={article.id}
            displayError={this.displayError}
            displayResult={this.displayResult}
          />
        )}
      </div>
    );
  }
}

export default injectSheet(styles)(ArticlesList);
