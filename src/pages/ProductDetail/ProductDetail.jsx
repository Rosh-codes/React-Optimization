import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import products from '../../data/products.json'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'
import './ProductDetail.css'

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

function ProductDetail({ savedIds, setSavedIds }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="detail-container">
        <div className="detail-not-found">
          <p>Product not found.</p>
          <button className="detail-back-btn" onClick={() => navigate('/products')}>
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  const isSaved = savedIds.includes(product.id)

  const handleSave = () => {
    if (isSaved) {
      setSavedIds(savedIds.filter(id => id !== product.id))
    } else {
      setSavedIds([...savedIds, product.id])
    }
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 8)

  const getStockLabel = () => {
    if (product.stock > 100) return { label: 'In Stock', cls: 'stock-in' }
    if (product.stock > 0) return { label: `Low Stock (${product.stock} left)`, cls: 'stock-low' }
    return { label: 'Out of Stock', cls: 'stock-out' }
  }

  const stockInfo = getStockLabel()

  return (
    <div className="detail-container">
      <button className="detail-back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail-header card">
        <div className="detail-header-top">
          <span
            className="category-badge"
            style={{ background: CATEGORY_COLORS[product.category] }}
          >
            {product.category}
          </span>
          <span className={`stock-badge ${stockInfo.cls}`}>{stockInfo.label}</span>
        </div>
        <h1 className="detail-name">{product.name}</h1>
        <p className="detail-brand">{product.brand}</p>
        <div className="detail-meta">
          <span className="detail-price">€{product.price.toFixed(2)}</span>
          <span className="detail-rating">★ {product.rating.toFixed(1)} ({product.reviewCount} reviews)</span>
        </div>
        <button
          className={`detail-save-btn ${isSaved ? 'saved' : ''}`}
          onClick={handleSave}
        >
          {isSaved ? '🔖 Saved' : '🏷️ Save Product'}
        </button>
      </div>

      <div className="detail-tabs">
        {['overview', 'specifications', 'stockHistory', 'related'].map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'overview' && 'Overview'}
            {tab === 'specifications' && 'Specifications'}
            {tab === 'stockHistory' && 'Stock History'}
            {tab === 'related' && 'Related Products'}
          </button>
        ))}
      </div>

      <div className="detail-tab-content card">
        {activeTab === 'overview' && (
          <div className="tab-overview">
            <p className="detail-description">{product.description}</p>
            <div className="overview-stats">
              <div className="stat-item">
                <span className="stat-label">SKU</span>
                <span className="stat-value">{product.sku}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Weight</span>
                <span className="stat-value">{product.weight} kg</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Brand</span>
                <span className="stat-value">{product.brand}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Stock</span>
                <span className="stat-value">{product.stock} units</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Rating</span>
                <span className="stat-value">{product.rating} / 5</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Reviews</span>
                <span className="stat-value">{product.reviewCount}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'specifications' && (
          <table className="spec-table">
            <tbody>
              <tr><td>Name</td><td>{product.name}</td></tr>
              <tr><td>Brand</td><td>{product.brand}</td></tr>
              <tr><td>Category</td><td>{product.category}</td></tr>
              <tr><td>Price</td><td>€{product.price.toFixed(2)}</td></tr>
              <tr><td>Rating</td><td>{product.rating} / 5</td></tr>
              <tr><td>Reviews</td><td>{product.reviewCount}</td></tr>
              <tr><td>Stock</td><td>{product.stock} units</td></tr>
              <tr><td>SKU</td><td>{product.sku}</td></tr>
              <tr><td>Weight</td><td>{product.weight} kg</td></tr>
            </tbody>
          </table>
        )}

        {activeTab === 'stockHistory' && (
          <div className="stock-chart">
            <h3 className="chart-title">30-Day Stock History</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={product.stockHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" label={{ value: 'Day', position: 'insideBottom', offset: -4 }} />
                <YAxis label={{ value: 'Stock', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line type="monotone" dataKey="stock" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'related' && (
          <div className="related-grid">
            {relatedProducts.map(p => (
              <div
                key={p.id}
                className="related-card"
                onClick={() => navigate('/products/' + p.id)}
              >
                <span
                  className="category-badge"
                  style={{ background: CATEGORY_COLORS[p.category] }}
                >
                  {p.category}
                </span>
                <p className="related-name">{p.name}</p>
                <p className="related-price">€{p.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail
