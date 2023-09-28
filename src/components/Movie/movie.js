import React from 'react'
import { format } from 'date-fns'
import { Card, Tag, Space } from 'antd'
import './movie.css'

export default class Movie extends React.Component {
  render() {
    const { posterPath, title, overview, release } = this.props
    const pictureURL = 'https://image.tmdb.org/t/p/original'
    let text = overview
    if (overview.length > 200) {
      text = overview.slice(0, 190)
      const lastSpace = text.lastIndexOf(' ')
      text = `${text.substring(0, lastSpace)} ...`
    }
    return (
      <div className="movieCard">
        <Card>
          <div className="movieCard__image">
            <img src={`${pictureURL}${posterPath}`} alt={title} />
          </div>
          <div className="movieCard__description">
            <h3>{title}</h3>
            <p className="movieCard__date">{release === '' ? 'Unknown' : format(new Date(release), 'MMMM dd, yyyy')}</p>
            <div className="movieCard__genres">
              <Space size={[0, 8]} wrap>
                <Tag>Action</Tag>
                <Tag>Drama</Tag>
              </Space>
            </div>
            <p className="movieCard__text">{text}</p>
          </div>
        </Card>
      </div>
    )
  }
}
