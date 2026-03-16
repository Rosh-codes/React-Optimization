import React from 'react'
import { useNavigate } from 'react-router-dom'
import products from '../../data/products.json'
import './Saved.css'

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

function Saved({ savedIds, setSavedIds }) {
  const navigate = useNavigate()

  // INTENTIONALLY UNOPTIMIZED — recalculates on every render
  const savedProducts = products.filter(p => savedIds.includes(p.id))

  if (savedIds.length === 0) {
    return (
      <div className="saved-container">
        <h1 className="page-title">Saved Products</h1>
        <div className="empty-state">
          <p>No saved products yet. Browse the catalogue and bookmark products.</p>
          <button className="btn-primary btn" onClick={() => navigate('/products')}>
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="saved-container">
      <div className="saved-header">
        <h1 className="page-title">Saved Products ({savedProducts.length})</h1>
        <button
          className="btn btn-danger"
          onClick={() => setSavedIds([])}
        >
          Clear All
        </button>
      </div>

      <div className="saved-grid">
        {savedProducts.map(p => (
          <div
            key={p.id}
            className="saved-card"
            onClick={() => navigate('/products/' + p.id)}
          >
            <div className="saved-card-header">
              <span
                className="category-badge"
                style={{ background: CATEGORY_COLORS[p.category] }}
              >
                {p.category}
              </span>
            </div>
            <p className="saved-name">{p.name}</p>
            <p className="saved-brand">{p.brand}</p>
            <p className="saved-price">€{p.price.toFixed(2)}</p>
            <div className="saved-rating">★ {p.rating.toFixed(1)} ({p.reviewCount} reviews)</div>
            <div className="saved-stock">
              {p.stock > 100 && <span className="stock-badge stock-in">In Stock</span>}
              {p.stock > 0 && p.stock <= 100 && <span className="stock-badge stock-low">Low Stock ({p.stock} left)</span>}
              {p.stock === 0 && <span className="stock-badge stock-out">Out of Stock</span>}
            </div>
            <button
              className="saved-remove-btn"
              onClick={e => {
                e.stopPropagation()
                setSavedIds(savedIds.filter(id => id !== p.id))
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Saved
