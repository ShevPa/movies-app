export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1'

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmM4ZmUxN2U4YWNiMTBjMTc5ZTUwNjFjNDg4MjE3YiIsInN1YiI6IjY1MTE1YTg2YTkxMTdmMDBlMTkzMGY0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3w-M6vIyIng6F4D3cdJFTe6tFQK1wWS6iO3KHHe4mbY',
    },
  }

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`, this.options)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url} , recieved ${res.status}`)
    }

    return await res.json()
  }

  async getMovies() {
    return await this.getResource(`${this._baseURL}`)
  }
}
