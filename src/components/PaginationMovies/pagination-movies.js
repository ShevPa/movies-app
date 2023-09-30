import React from 'react'
import { Pagination } from 'antd'

export default class PaginationMovies extends React.Component {
  render() {
    const { totalPages, setCurrentPage } = this.props
    let maxPages = totalPages
    if (maxPages > 5000) maxPages = 5000
    return (
      <div className="pagination">
        <Pagination onChange={setCurrentPage} defaultCurrent={1} total={maxPages} showSizeChanger={false} />
      </div>
    )
  }
}
