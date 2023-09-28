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
  }

  componentDidMount() {
    this.movieService
      .getMovies()
      .then((res) => this.getMoviesList(res))
      .catch((err) => this.onError(err))
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
    })
  }

  render() {
    const { error, isLoaded, movies } = this.state
    const hasData = !(!isLoaded || error)
    const errorMessage = error ? <ErrorView /> : null
    const content = hasData ? <MoviesView movies={movies} /> : null
    const loading = !isLoaded && !error ? <LoadingView /> : null
    return (
      <div className="moviesList">
        {content}
        {loading}
        {errorMessage}
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
