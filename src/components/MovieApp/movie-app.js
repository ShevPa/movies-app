import React from 'react'
import { debounce } from 'lodash'

import MovieList from '../MovieList/movie-list'
import PaginationMovies from '../PaginationMovies/pagination-movies'
import SearchSection from '../SearchSection/search-section'
import './movie-app.css'

export default class MovieApp extends React.Component {
  state = {
    searchValue: '',
    debouncedSearchValue: '',
    totalPages: null,
    currentPage: 1,
  }

  debounceSearchValue = debounce((value) => {
    this.setState({
      debouncedSearchValue: value,
    })
  }, 500)

  getSearchValue = (e) => {
    this.setState({
      searchValue: e.target.value,
    })
    this.debounceSearchValue(e.target.value)
  }

  setCurrentPage = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
    })
  }

  getTotalPages = (item) => {
    this.setState({
      totalPages: item.total_pages * 10,
    })
  }

  render() {
    return (
      <>
        <SearchSection getSearchValue={this.getSearchValue} searchValue={this.state.searchValue} />
        <MovieList
          searchValue={this.state.debouncedSearchValue}
          currentPage={this.state.currentPage}
          getTotalPages={this.getTotalPages}
        />
        <PaginationMovies totalPages={this.state.totalPages} setCurrentPage={this.setCurrentPage} />
      </>
    )
  }
}
