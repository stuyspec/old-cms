import React from "react";
import { UserBySlugQuery } from "../queries";
import { graphql } from "react-apollo";
import ArticlesList from './ArticlesList'
import Loading from './Loading'

const UserPage = ({ data: { loading, userBySlug } }) => {
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>
        {" "}{userBySlug.first_name} {userBySlug.last_name}{" "}
      </h1>
      <h2>
        {userBySlug.email}
      </h2>
      <ArticlesList articles={userBySlug.articles} />
    </div>
  );
};

export default graphql(UserBySlugQuery, {
  options: ({ match }) => ({ variables: { slug: match.params.slug } })
})(UserPage);
