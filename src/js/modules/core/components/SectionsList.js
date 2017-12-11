import React from "react";
import { gql } from "apollo-client-preset";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";

const SectionsQuery = gql`
  query SectionsQuery {
    topLevelSections {
      id
      name
      slug
    }
  }
`;

const SectionsList = ({ data: { loading, topLevelSections } }) => {
  if (loading) {
    return <div> Loading... </div>;
  }
  return (
    <div>
      <h2> Sections </h2>
      <ul>
        {topLevelSections.map(section =>
          <li>
            {" "}<Link to={`/sections/${section.slug}`}> {section.name} </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default graphql(SectionsQuery)(SectionsList);
