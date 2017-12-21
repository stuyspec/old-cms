import React from 'react'
import { graphql } from 'react-apollo'
import { ArticleQuery } from '../queries'
import ArticleForm from './ArticleForm'


const EditArticlePage = ({ data: { loading, articleBySlug } }) => {
  if (loading) {
    return <div> Loading... </div>
  }
  return(<ArticleForm initialValues={articleBySlug} />)
}

export default graphql(ArticleQuery, {
  options: ({ match }) => ({ variables: { slug: match.params.slug }})
})(EditArticlePage)