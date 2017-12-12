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
      }
      parent_section {
        slug
      }
    }
  }
`;

export const SectionsQuery = gql`
  query SectionsQuery {
    topLevelSections {
      id
      name
      slug
    }
  }
`;

export const ArticlesQuery = gql`
  query ArticlesQuery {
    allArticles {
      id
      summary
      content
      slug
      title
      section {
        name
      }
    }
  }
`;

export const ArticleQuery = gql`
query ArticleQuery($slug: String!) {
  articleBySlug(slug: $slug) {
    id
    title
    contributors {
      first_name
      last_name
    }
    summary
    content
  }
}  
`

