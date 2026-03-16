import React from 'react'
import './SearchBar.css'

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="searchbar-wrapper">
      <div className="searchbar-inner">
        <span className="searchbar-icon">🔍</span>
        <input
          type="text"
          className="searchbar-input"
          placeholder="Search products by name or brand..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            className="searchbar-clear"
            onClick={() => setSearchTerm('')}
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar