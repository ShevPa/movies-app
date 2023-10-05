import React from 'react'
import { Card, Tag, Space, Rate } from 'antd'
import { format } from 'date-fns'

import { GenreConsumer } from '../genre-context/genre-context'
import './movie.css'

export default class Movie extends React.Component {
  render() {
    const { posterPath, title, overview, release, rating, addMovieRating, movieId, ratedMovies, genre } = this.props
    const pictureURL = 'https://image.tmdb.org/t/p/original'

    let rateValue = 0
    if (ratedMovies.length > 0 && ratedMovies.findIndex((el) => el.idMovie === movieId) !== -1) {
      rateValue = ratedMovies.find((el) => el.idMovie === movieId).rating
    }

    let colorRate = 'rating__value_color-red'
    if (rating > 3 && rating <= 5) colorRate = 'rating__value_color-orange'
    if (rating > 5 && rating <= 7) colorRate = 'rating__value_color-yellow'
    if (rating > 7) colorRate = 'rating__value_color-green'

    let text = overview
    if (overview.length > 180) {
      text = overview.slice(0, 180)
      const lastSpace = text.lastIndexOf(' ')
      text = `${text.substring(0, lastSpace)} ...`
    }
    return (
      <GenreConsumer>
        {(genreList) => (
          <div className="movieCard">
            <Card>
              <div className="movieCard__image">
                <img src={`${pictureURL}${posterPath}`} alt={title} />
              </div>
              <div className="movieCard__description">
                <div className="rating">
                  <div className={`rating__value ${colorRate}`}>{rating.toFixed(1)}</div>
                </div>
                <h3>{title}</h3>
                <p className="movieCard__date">
                  {release === '' ? 'Unknown' : format(new Date(release), 'MMMM dd, yyyy')}
                </p>
                <div className="movieCard__genres">
                  <Space size={[0, 8]} wrap>
                    {genre.map((el) => {
                      if (genreList.find((genreItem) => genreItem.id === el) !== undefined) {
                        return <Tag key={el}>{genreList.find((genreItem) => genreItem.id === el).name}</Tag>
                      }
                      return <Tag key={el}>{null}</Tag>
                    })}
                  </Space>
                </div>
                <p className="movieCard__text">{text}</p>
                <Rate
                  count={10}
                  allowClear={false}
                  style={{
                    fontSize: '17px',
                    position: 'absolute',
                    zIndex: '10',
                    bottom: '10px',
                    right: '9px',
                  }}
                  defaultValue={rateValue !== 0 ? rateValue : null}
                  onChange={addMovieRating}
                />
              </div>
            </Card>
          </div>
        )}
      </GenreConsumer>
    )
  }
}
