import React from 'react'
import Article from './Article'
import { graphql } from 'react-apollo'
import { ArticleBySlugQuery } from '../queries'
import Loading from './Loading'

const ArticlePage = ({ data: { loading, articleBySlug }}) => {
  if (loading) {
    return(<Loading />)
  }
  return(
    <Article article={articleBySlug} />
  )
}

export default graphql(ArticleBySlugQuery, {
  options: ({ match }) => ({ variables: { slug: match.params.slug }})
})(ArticlePage)