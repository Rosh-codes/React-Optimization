import React from 'react'
import './SortBar.css'

function SortBar({ sortField, setSortField, sortDirection, setSortDirection, resultCount }) {
  return (
    <div className="sortbar">
      <span className="sortbar-count">{resultCount} products found</span>
      <div className="sortbar-controls">
        <label className="sortbar-label">Sort by</label>
        <select
          className="sortbar-select"
          value={sortField}
          onChange={e => setSortField(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="stock">Stock</option>
          <option value="reviewCount">Reviews</option>
        </select>
        <button
          className="sortbar-direction-btn"
          onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
        >
          {sortDirection === 'asc' ? '↑ Asc' : '↓ Desc'}
        </button>
      </div>
    </div>
  )
}

export default SortBar
