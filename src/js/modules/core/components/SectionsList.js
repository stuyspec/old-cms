import React from "react";
import { gql } from "apollo-client-preset";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import { TopLevelSectionsQuery } from '../queries'
import Loading from './Loading'

const SectionsList = ({ data: { loading, topLevelSections } }) => {
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h2> Sections </h2>
      <ul>
        {topLevelSections.map(section =>
          <li key={section.id}>
            {" "}<Link to={`/sections/${section.slug}`}> {section.name} </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default graphql(TopLevelSectionsQuery)(SectionsList);
