import React from "react";
import SearchResults from './SearchResults'

const SearchResultsPage = ({ match }) => {
  return(<SearchResults query={match.params.query} />)
}

export default SearchResultsPage;
