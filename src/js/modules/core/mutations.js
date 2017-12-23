

import { gql } from 'apollo-client-preset'

export const DeleteSection = gql`
  mutation DeleteSection($id: ID!) {
    deleteSection(id: $id) {
      id
      name
    }
  }
`;

export const DeleteArticle = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id) {
      id
      title
    }
  }
`;


export const CreateArticle = gql`
  mutation CreateArticle(
             $content: String!,
             $title: String!,
             $section_id: Int!,
             $contributors: [Int]!,
             $volume: Int,
             $issue: Int
           ) {
    createArticle(
      content: $content,
      title: $title,
      section_id: $section_id,
      contributors: $contributors,
      volume: $volume,
      issue: $issue
    ) {
      slug
    }
  }
`

export const UpdateArticle = gql`
  mutation UpdateArticle(
    $id: ID!,       
    $content: String!,
    $title: String!,
    $section_id: Int!,
    $contributors: [Int]!,
    $volume: Int,
    $issue: Int
  ) {
    updateArticle(
      id: $id,
      content: $content,
      title: $title,
      section_id: $section_id,
      contributors: $contributors,
      volume: $volume,
      issue: $issue
    ) {
      title
      section {
        name
      }
    }
  }
`