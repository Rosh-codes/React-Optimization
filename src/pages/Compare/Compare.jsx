import React from 'react'
import { useNavigate } from 'react-router-dom'
import products from '../../data/products.json'
import './Compare.css'

const CATEGORY_COLORS = {
  Electronics: '#3b82f6',
  Clothing: '#ec4899',
  Books: '#f59e0b',
  Food: '#10b981',
  Sports: '#f97316',
  Home: '#8b5cf6',
  Beauty: '#ef4444',
  Toys: '#06b6d4'
}

function Compare({ compareIds, setCompareIds }) {
  const navigate = useNavigate()

  // INTENTIONALLY UNOPTIMIZED — recalculates on every render
  const compareProducts = products.filter(p => compareIds.includes(p.id))

  if (compareIds.length === 0) {
    return (
      <div className="compare-container">
        <h1 className="page-title">Compare Products</h1>
        <div className="empty-state">
          <p>No products selected for comparison.</p>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  const bestPrice = Math.min(...compareProducts.map(p => p.price))
  const bestRating = Math.max(...compareProducts.map(p => p.rating))
  const bestStock = Math.max(...compareProducts.map(p => p.stock))

  const rows = [
    { label: 'Name', key: 'name', highlight: false },
    { label: 'Brand', key: 'brand', highlight: false },
    { label: 'Category', key: 'category', highlight: false },
    { label: 'Price', key: 'price', highlight: true, best: bestPrice, type: 'low' },
    { label: 'Rating', key: 'rating', highlight: true, best: bestRating, type: 'high' },
    { label: 'Reviews', key: 'reviewCount', highlight: false },
    { label: 'Stock', key: 'stock', highlight: true, best: bestStock, type: 'high' },
    { label: 'Weight (kg)', key: 'weight', highlight: false },
    { label: 'SKU', key: 'sku', highlight: false }
  ]

  const formatValue = (p, key) => {
    if (key === 'price') return '€' + p.price.toFixed(2)
    if (key === 'rating') return '★ ' + p.rating.toFixed(1)
    if (key === 'category') {
      return (
        <span
          className="category-badge"
          style={{ background: CATEGORY_COLORS[p.category] }}
        >
          {p.category}
        </span>
      )
    }
    return p[key]
  }

  const isBest = (p, row) => {
    if (!row.highlight) return false
    if (row.type === 'low') return p[row.key] === row.best
    if (row.type === 'high') return p[row.key] === row.best
    return false
  }

  return (
    <div className="compare-container">
      <div className="compare-header">
        <h1 className="page-title">Compare Products</h1>
        <button
          className="btn btn-danger"
          onClick={() => setCompareIds([])}
        >
          Clear All
        </button>
      </div>

      <div className="compare-table-wrapper">
        <table className="compare-table">
          <thead>
            <tr>
              <th className="compare-row-label"></th>
              {compareProducts.map(p => (
                <th key={p.id} className="compare-product-header">
                  <div className="compare-product-name">{p.name}</div>
                  <button
                    className="compare-remove-btn"
                    onClick={() => setCompareIds(compareIds.filter(id => id !== p.id))}
                  >
                    Remove
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.key}>
                <td className="compare-row-label">{row.label}</td>
                {compareProducts.map(p => (
                  <td
                    key={p.id}
                    className={`compare-cell ${isBest(p, row) ? 'best-value' : ''}`}
                  >
                    {formatValue(p, row.key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Compare
