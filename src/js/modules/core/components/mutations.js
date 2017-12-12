

import { gql } from 'apollo-client-preset'

export const DeleteSection = gql`
  mutation DeleteSectionMutation($id: ID!) {
    deleteSection(id: $id) {
      id
      name
    }
  }
`;

export const DeleteArticle = gql`
  mutation DeleteArticleMutation($id: ID!) {
    deleteArticle(id: $id) {
      id
      title
    }
  }
`;