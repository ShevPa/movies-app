import React from 'react'

import MovieService from '../../services/MovieService'
import Movie from '../Movie/movie'
import './movie-list.css'

export default class MovieList extends React.Component {
  movieService = new MovieService()

  state = {
    error: null,
    isLoaded: false,
    movies: [],
  }

  componentDidMount() {
    this.movieService
      .getMovies()
      .then((res) => this.getMoviesList(res))
      .catch((err) => this.showError(err))
  }

  getMoviesList(items) {
    this.setState({
      isLoaded: true,
      movies: items.results,
    })
  }

  showError(err) {
    this.setState({
      error: err,
      isLoaded: false,
    })
  }

  render() {
    const { error, isLoaded, movies } = this.state
    const movieList = movies.map((movie) => {
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
    if (error) {
      return <div>Ошибка: {error.message}</div>
    }
    if (!isLoaded) {
      return <div>Загрузка...</div>
    }
    return <div className="moviesList">{movieList}</div>
  }
}
