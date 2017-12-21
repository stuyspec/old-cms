import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import ArticlePreview from "./ArticlePreview";
import injectSheet from "react-jss";
import { DeleteSection } from '../mutations'
import { SectionQuery, SectionsQuery } from '../queries'

const styles = {
  sectionsLink: {
    textDecoration: "none",
    color: "black",
    "&:visited": {
      textDecoration: "none"
    },
    "&:hover": {
      textDecoration: "underline",
      textDecorationColor: "black"
    }
  }
};

const Section = ({
  classes,
  mutate,
  pathname,
  push,
  data: { loading, sectionBySlug }
}) => {
  const handleClick = () => {
    mutate({
      variables: { id: sectionBySlug.id },
      refetchQueries: [
        {
          query: SectionsQuery
        }
      ]
    })
      .then(() => {
        push("/sections");
      })
      .catch(err => {
        console.error(err);
      });
  };
  if (loading) {
    return <div> Loading... </div>;
  }
  return (
    <div>
      <h2>
        {sectionBySlug.name}
      </h2>
      <div className={classes.sectionsLink}>
        <h3>
          {" "}<Link to={`/sections`}> Top Level Sections </Link>
        </h3>
      </div>
      <button onClick={handleClick}> Delete </button>
      <ul>
        {sectionBySlug.parent_section &&
          <li>
            {" "}<Link to={`/sections/${sectionBySlug.parent_section.slug}`}>
              {" "}Back{" "}
            </Link>
          </li>}
        {sectionBySlug.subsections.map(subsection =>
          <li key={subsection.id}>
            {" "}<Link to={`${pathname}/${subsection.slug}`}>
              {" "}{subsection.name}{" "}
            </Link>
          </li>
        )}
      </ul>
      <div>
        {sectionBySlug.articles.map(article => <ArticlePreview article={article} />)}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  pathname: state.router.location.pathname
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ push }, dispatch);
};

const StyledSection = injectSheet(styles)(Section);

export default graphql(DeleteSection)(
  graphql(SectionQuery, {
    options: ({ slug }) => ({ variables: { slug } })
  })(connect(mapStateToProps, mapDispatchToProps)(StyledSection))
);
