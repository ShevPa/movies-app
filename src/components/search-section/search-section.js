import React from 'react'
import { Input } from 'antd'
import './search-section.css'

export default class SearchSection extends React.Component {
  onSubmit = (event) => {
    event.preventDefault()
  }

  render() {
    const { searchValue, getSearchValue } = this.props
    return (
      <div className="searchPanel">
        <form onSubmit={this.onSubmit}>
          <Input
            size="large"
            placeholder="Type to search..."
            value={searchValue}
            onChange={getSearchValue}
            style={{ width: '940px' }}
          />
        </form>
      </div>
    )
  }
}
