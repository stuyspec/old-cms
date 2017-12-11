import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import { gql } from "apollo-client-preset";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import Article from "./Article";
import injectSheet from "react-jss";

const SectionQuery = gql`
  query SectionQuery($slug: String!) {
    sectionBySlug(slug: $slug) {
      id
      name
      subsections {
        id
        name
        slug
      }
      articles {
        id
        summary
        title
      }
      parent_section {
        slug
      }
    }
  }
`;

const DeleteSectionMutation = gql`
  mutation DeleteSectionMutation($id: ID!) {
    deleteSection(id: $id) {
      id
      name
    }
  }
`;

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
  data: { loading, sectionBySlug }
}) => {
  const handleClick = () => {
    mutate({ variables: { id: sectionBySlug.id } })
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
        {sectionBySlug.articles.map(article => <Article article={article} />)}
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

export default graphql(DeleteSectionMutation)(
  graphql(SectionQuery, {
    options: ({ slug }) => ({ variables: { slug } })
  })(connect(mapStateToProps, mapDispatchToProps)(StyledSection))
);
