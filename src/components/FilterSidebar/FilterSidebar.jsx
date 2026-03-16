import React from 'react'
import './FilterSidebar.css'

const CATEGORIES = ['Electronics', 'Clothing', 'Books', 'Food', 'Sports', 'Home', 'Beauty', 'Toys']

function FilterSidebar({
  selectedCategories,
  setSelectedCategories,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  stockStatus,
  setStockStatus
}) {
  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <span className="filter-title">Filters</span>
        <button
          className="filter-clear-btn"
          onClick={() => {
            setSelectedCategories([])
            setMinPrice(0)
            setMaxPrice(2000)
            setStockStatus('all')
          }}
        >
          Clear All
        </button>
      </div>

      <div className="filter-section">
        <div className="filter-section-title">Category</div>
        {CATEGORIES.map(cat => (
          <label key={cat} className="filter-checkbox-label">
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => {
                if (selectedCategories.includes(cat)) {
                  setSelectedCategories(selectedCategories.filter(c => c !== cat))
                } else {
                  setSelectedCategories([...selectedCategories, cat])
                }
              }}
            />
            <span>{cat}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <div className="filter-section-title">Price Range (€)</div>
        <div className="filter-price-row">
          <input
            type="number"
            className="filter-price-input"
            placeholder="Min"
            value={minPrice}
            onChange={e => setMinPrice(Number(e.target.value))}
          />
          <span className="filter-price-sep">—</span>
          <input
            type="number"
            className="filter-price-input"
            placeholder="Max"
            value={maxPrice}
            onChange={e => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-section-title">Stock Status</div>
        {[
          { value: 'all', label: 'All' },
          { value: 'inStock', label: 'In Stock (>100)' },
          { value: 'lowStock', label: 'Low Stock (1–100)' },
          { value: 'outOfStock', label: 'Out of Stock' }
        ].map(option => (
          <label key={option.value} className="filter-radio-label">
            <input
              type="radio"
              name="stockStatus"
              value={option.value}
              checked={stockStatus === option.value}
              onChange={() => setStockStatus(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default FilterSidebar