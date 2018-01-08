import { gql } from 'apollo-client-preset'

export const SectionQuery = gql`
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
        content
        slug
        title
        contributors {
          id
          first_name
          last_name
          slug
        }
      }
      parent_section {
        slug
      }
    }
  }
`;

export const TopLevelSectionsQuery = gql`
  query TopLevelSectionsQuery {
    topLevelSections {
      id
      name
      slug
    }
  }
`;

export const AllSectionsQuery = gql`
  query AllSectionsQuery {
    allSections {
      id
      name
    }
  }
`

export const AllArticlesQuery = gql`
  query ArticlesQuery {
    allArticles {
      id
      summary
      content
      slug
      title
      contributors {
        id
        first_name
        last_name
        slug
      }
      section {
        id
        name
      }
    }
  }
`;

export const ArticleBySlugQuery = gql`
query ArticleBySlugQuery($slug: String!) {
  articleBySlug(slug: $slug) {
    id
    title
    contributors {
      id
      email
      first_name
      last_name
      slug
    }
    slug
    section {
      id
      name
    }
    summary
    featured_media {
      medium_attachment_url
    }
    content
  }
}
`

export const ArticleByIDQuery = gql`
query ArticleByIDQuery($id: ID!) {
  articleByID(id: $id) {
    id
    title
    slug
    contributors {
      id
      email
      first_name
      last_name
    }
    section {
      id
    }
    summary
    content
  }
}
`
export const SearchArticlesQuery = gql`
query SearchArticlesQuery($query: String!) {
  searchArticles(query: $query) {
    searchable {
      id
      summary
      content
      slug
      title
      contributors {
        id
        email
        first_name
        last_name
      }
      section {
        id
        name
      }
    }
  }
}
`

export const AllUsersQuery = gql`
query AllUsersQuery {
  allUsers {
    id
    email
  }
}
`
export const UserBySlugQuery = gql`
query UserBySlugQuery($slug: String!) {
  userBySlug(slug: $slug) {
    id
    email
    first_name
    last_name
    articles {
      id
      summary
      content
      slug
      title
      contributors {
        id
        first_name
        last_name
        slug
      }
    }
  }
}
`