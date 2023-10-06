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
      <form className="searchPanel" onSubmit={this.onSubmit}>
        <Input
          className="searchPanel__input"
          size="large"
          placeholder="Type to search..."
          value={searchValue}
          onChange={getSearchValue}
        />
      </form>
    )
  }
}
