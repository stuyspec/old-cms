import React from 'react'
import Article from './Article'
import { graphql } from 'react-apollo'
import { ArticleBySlugQuery } from '../queries'

const ArticlePage = ({ data: { loading, articleBySlug }}) => {
  if (loading) {
    return(<div> Loading... </div>)
  }
  return(
    <Article article={articleBySlug} />
  )
}

export default graphql(ArticleBySlugQuery, {
  options: ({ match }) => ({ variables: { slug: match.params.slug }})
})(ArticlePage)