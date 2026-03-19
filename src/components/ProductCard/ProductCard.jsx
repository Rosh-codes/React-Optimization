import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ProductCard.css'

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

function ProductCard({ product, isSaved, isCompared, compareCount, onSave, onCompare }) {
  const navigate = useNavigate()

  const getStockBadge = () => {
    if (product.stock > 100) {
      return <span className="stock-badge stock-in">In Stock</span>
    } else if (product.stock > 0) {
      return <span className="stock-badge stock-low">Low Stock ({product.stock} left)</span>
    } else {
      return <span className="stock-badge stock-out">Out of Stock</span>
    }
  }

  return (
    <div
      className="product-card"
      onClick={() => navigate('/products/' + product.id)}
    >
      <div className="product-card-header">
        <span
          className="category-badge"
          style={{ background: CATEGORY_COLORS[product.category] }}
        >
          {product.category}
        </span>
        <button
          className="bookmark-btn"
          onClick={e => { e.stopPropagation(); onSave(product.id) }}
          title={isSaved ? 'Remove from saved' : 'Save product'}
        >
          {isSaved ? '🔖' : '🏷️'}
        </button>
      </div>

      <h3 className="product-name">{product.name}</h3>
      <p className="product-brand">{product.brand}</p>

      <div className="product-price">€{product.price.toFixed(2)}</div>

      <div className="product-rating">
        ★ {product.rating.toFixed(1)}
        <span className="review-count">({product.reviewCount} reviews)</span>
      </div>

      <div className="product-stock">
        {getStockBadge()}
      </div>

      <div
        className="product-compare"
        onClick={e => e.stopPropagation()}
      >
        <label className="compare-label">
          <input
            type="checkbox"
            checked={isCompared}
            disabled={!isCompared && compareCount >= 3}
            onChange={() => onCompare(product.id)}
          />
          <span>Compare</span>
        </label>
      </div>
    </div>
  )
}

export default React.memo(ProductCard)
