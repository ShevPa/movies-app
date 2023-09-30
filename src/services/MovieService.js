export default class MovieService {
  _baseURL = 'https://api.themoviedb.org/3/'

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmM4ZmUxN2U4YWNiMTBjMTc5ZTUwNjFjNDg4MjE3YiIsInN1YiI6IjY1MTE1YTg2YTkxMTdmMDBlMTkzMGY0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3w-M6vIyIng6F4D3cdJFTe6tFQK1wWS6iO3KHHe4mbY',
    },
  }

  async getResource(url) {
    const res = await fetch(url, this.options)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url} , recieved ${res.status}`)
    }

    return await res.json()
  }

  async getPopularMovies(pageNumber) {
    return await this.getResource(`${this._baseURL}movie/popular?language=en-US&page=${pageNumber}`)
  }

  async getSearchedMovies(searchLabel, pageNumber) {
    return await this.getResource(
      `${this._baseURL}search/movie?query=${searchLabel}&include_adult=false&language=en-US&page=${pageNumber}`
    )
  }
}
