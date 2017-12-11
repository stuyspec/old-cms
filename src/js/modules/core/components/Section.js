import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import { gql } from "apollo-client-preset";

const SectionQuery = gql`
  query SectionQuery($slug: String!) {
    sectionBySlug(slug: $slug) {
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
    }
  }
`;
const Section = ({ pathname, data: { loading, sectionBySlug } }) => {
  if (loading) {
    return <div> Loading... </div>;
  }
  return (
    <div>
      <h2>
        My Section: {sectionBySlug.name}
      </h2>
      <ul>
        <li>
          {" "}<Link to={`/sections`}> Home </Link>
        </li>
        {sectionBySlug.subsections.map(subsection =>
          <li key={subsection.id}>
            {" "}<Link to={`${pathname}/${subsection.slug}`}>
              {" "}{subsection.name}{" "}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  pathname: state.router.location.pathname
});

export default graphql(SectionQuery, {
  options: ({ slug }) => ({ variables: { slug } })
})(connect(mapStateToProps)(Section));
