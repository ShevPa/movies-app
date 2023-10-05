export default class MovieService {
  _baseURL = 'https://api.themoviedb.org/3/'

  optionsGet = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }

  optionsPost = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
  }

  apiKey = 'afc8fe17e8acb10c179e5061c488217b'

  async getResource(url, method) {
    const res = await fetch(url, method)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url} , recieved ${res.status}`)
    }

    return await res.json()
  }

  async createGuestSession() {
    return await this.getResource(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this.apiKey}`,
      this.optionsGet
    )
  }

  async getPopularMovies(pageNumber) {
    return await this.getResource(
      `${this._baseURL}movie/popular?api_key=${this.apiKey}&language=en-US&page=${pageNumber}`,
      this.optionsGet
    )
  }

  async getSearchedMovies(searchLabel, pageNumber) {
    return await this.getResource(
      `${this._baseURL}search/movie?api_key=${this.apiKey}&query=${searchLabel}&include_adult=false&language=en-US&page=${pageNumber}`,
      this.optionsGet
    )
  }

  async addRating(moveiId, guestSessionId, value) {
    this.optionsPost.body = `{"value":${value}}`
    return await this.getResource(
      `${this._baseURL}movie/${moveiId}/rating?guest_session_id=${guestSessionId}&api_key=${this.apiKey}`,
      this.optionsPost
    )
  }

  async getRatedMovies(guestSessionId, page) {
    return await this.getResource(
      `${this._baseURL}guest_session/${guestSessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`,
      this.optionsGet
    )
  }

  async getGenreList() {
    return await this.getResource(`${this._baseURL}genre/movie/list?api_key=${this.apiKey}`, this.optionsGet)
  }
}
