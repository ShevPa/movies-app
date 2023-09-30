import React from 'react'
import { Spin, Alert } from 'antd'

import MovieService from '../../services/MovieService'
import Movie from '../Movie/movie'
import './movie-list.css'

export default class MovieList extends React.Component {
  movieService = new MovieService()

  state = {
    error: false,
    isLoaded: false,
    movies: [],
    totalResults: 0,
  }

  componentDidMount() {
    this.updateMovies()
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchValue !== prevProps.searchValue) {
      this.setState({ isLoaded: false })
      this.updateMovies()
    }
    if (this.props.currentPage !== prevProps.currentPage) {
      this.setState({ isLoaded: false })
      this.updateMovies()
    }
  }

  onError() {
    this.setState({
      error: true,
      isLoaded: false,
    })
  }

  getMoviesList(items) {
    this.setState({
      isLoaded: true,
      movies: items.results,
      totalResults: items.total_results,
    })
    this.props.getTotalPages(items)
  }

  updateMovies() {
    const { searchValue, currentPage } = this.props
    if (searchValue === '') {
      this.movieService
        .getPopularMovies(currentPage)
        .then((res) => this.getMoviesList(res))
        .catch((err) => this.onError(err))
    } else {
      this.movieService
        .getSearchedMovies(searchValue, currentPage)
        .then((res) => this.getMoviesList(res))
        .catch((err) => this.onError(err))
    }
  }

  render() {
    const { error, isLoaded, movies, totalResults } = this.state
    const hasData = !(!isLoaded || error)
    const errorMessage = error ? <ErrorView /> : null
    const content = hasData ? <MoviesView movies={movies} /> : null
    const loading = !isLoaded && !error ? <LoadingView /> : null
    const noData = isLoaded && !totalResults ? <NoDataView /> : null
    return (
      <div className="moviesList">
        {content}
        {loading}
        {errorMessage}
        {noData}
      </div>
    )
  }
}
const MoviesView = ({ movies }) => {
  return movies.map((movie) => {
    return (
      <Movie
        key={movie.id}
        posterPath={movie.poster_path}
        title={movie.title}
        overview={movie.overview}
        release={movie.release_date}
      />
    )
  })
}

const LoadingView = () => {
  return <Spin size="large" />
}
const ErrorView = () => {
  return <Alert type="error" message="Oops, something went wrong!" banner />
}
const NoDataView = () => {
  return <Alert type="error" message="Nothing was found for your query!" banner />
}
