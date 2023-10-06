import React from 'react'
import { debounce } from 'lodash'
import { Tabs } from 'antd'

import MovieList from '../movie-list/movie-list'
import PaginationMovies from '../pagination-movie/pagination-movies'
import SearchSection from '../search-section/search-section'
import './movie-app.css'
import MovieService from '../../services/movie-service'
import { GenreProvider } from '../genre-context/genre-context'

export default class MovieApp extends React.Component {
  state = {
    searchValue: '',
    debouncedSearchValue: '',
    totalPages: null,
    currentPage: 1,
    isRatedActive: false,
    guestID: null,
    ratedMovies: [],
    genreList: [],
  }

  movieService = new MovieService()

  debounceSearchValue = debounce((value) => {
    this.setState({
      debouncedSearchValue: value,
    })
  }, 500)

  componentDidMount() {
    this.movieService.createGuestSession().then((response) =>
      this.setState({
        guestID: response.guest_session_id,
      })
    )
    this.movieService.getGenreList().then((response) => {
      this.setState({
        genreList: response.genres,
      })
    })
  }

  addMovieRating = (idMovie, rating) => {
    const { guestID } = this.state
    this.movieService.addRating(idMovie, guestID, rating)
    this.setState(({ ratedMovies }) => {
      const newMovies = [...ratedMovies]
      if (ratedMovies.find((el) => el.idMovie === idMovie) === undefined) {
        return {
          ratedMovies: [
            ...newMovies,
            {
              idMovie,
              rating,
            },
          ],
        }
      }
      return {
        ratedMovies: newMovies.map((el) => {
          if (el.idMovie === idMovie) {
            el.rating = rating
          }
          return el
        }),
      }
    })
  }

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

  onTabChange = (key) => {
    this.setState({
      isRatedActive: key,
    })
  }

  render() {
    const items = [
      {
        key: 'false',
        label: 'Search',
        children: (
          <>
            <SearchSection getSearchValue={this.getSearchValue} searchValue={this.state.searchValue} />
            <MovieList
              searchValue={this.state.debouncedSearchValue}
              currentPage={this.state.currentPage}
              getTotalPages={this.getTotalPages}
              addMovieRating={this.addMovieRating}
              guestID={this.state.guestID}
              isRatedActive={this.state.isRatedActive}
              ratedMovies={this.state.ratedMovies}
            />
            <PaginationMovies totalPages={this.state.totalPages} setCurrentPage={this.setCurrentPage} />
          </>
        ),
      },
      {
        key: 'true',
        label: 'Rated',
        children: (
          <>
            <MovieList
              searchValue={this.state.debouncedSearchValue}
              currentPage={this.state.currentPage}
              getTotalPages={this.getTotalPages}
              addMovieRating={this.addMovieRating}
              guestID={this.state.guestID}
              isRatedActive={this.state.isRatedActive}
              ratedMovies={this.state.ratedMovies}
            />
            <PaginationMovies totalPages={this.state.totalPages} setCurrentPage={this.setCurrentPage} />
          </>
        ),
      },
    ]
    return (
      <GenreProvider value={this.state.genreList}>
        <Tabs
          defaultActiveKey="false"
          items={items}
          onChange={this.onTabChange}
          destroyInactiveTabPane="true"
          tabBarStyle={{ width: '150px', alignSelf: 'center', margin: '0', marginBottom: '20px' }}
        />
      </GenreProvider>
    )
  }
}
