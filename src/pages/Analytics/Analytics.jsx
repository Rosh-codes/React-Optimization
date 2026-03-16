import React from 'react'
import products from '../../data/products.json'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts'
import './Analytics.css'

const CATEGORIES = ['Electronics', 'Clothing', 'Books', 'Food', 'Sports', 'Home', 'Beauty', 'Toys']
const PIE_COLORS = ['#10b981', '#f59e0b', '#ef4444']

function Analytics() {
  // INTENTIONALLY UNOPTIMIZED — all recalculates on every render
  const totalProducts = products.length

  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)

  const averageRating = (
    products.reduce((sum, p) => sum + p.rating, 0) / products.length
  ).toFixed(2)

  const outOfStockCount = products.filter(p => p.stock === 0).length

  const productsByCategory = CATEGORIES.map(cat => ({
    category: cat,
    count: products.filter(p => p.category === cat).length
  }))

  const stockStatusData = [
    { name: 'In Stock', value: products.filter(p => p.stock > 100).length },
    { name: 'Low Stock', value: products.filter(p => p.stock > 0 && p.stock <= 100).length },
    { name: 'Out of Stock', value: products.filter(p => p.stock === 0).length }
  ]

  const avgPriceByCategory = CATEGORIES.map(cat => {
    const catProducts = products.filter(p => p.category === cat)
    const avg = catProducts.reduce((sum, p) => sum + p.price, 0) / catProducts.length
    return { category: cat, avgPrice: parseFloat(avg.toFixed(2)) }
  })

  const ratingBands = [
    { band: '1–2', count: products.filter(p => p.rating >= 1 && p.rating < 2).length },
    { band: '2–3', count: products.filter(p => p.rating >= 2 && p.rating < 3).length },
    { band: '3–4', count: products.filter(p => p.rating >= 3 && p.rating < 4).length },
    { band: '4–5', count: products.filter(p => p.rating >= 4 && p.rating <= 5).length }
  ]

  const top20 = [...products]
    .sort((a, b) => (b.price * b.stock) - (a.price * a.stock))
    .slice(0, 20)

  return (
    <div className="analytics-container">
      <h1 className="page-title">Analytics</h1>

      <div className="kpi-row">
        <div className="kpi-card">
          <span className="kpi-label">Total Products</span>
          <span className="kpi-value">{totalProducts.toLocaleString()}</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Total Inventory Value</span>
          <span className="kpi-value">€{totalValue.toLocaleString('en', { maximumFractionDigits: 0 })}</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Average Rating</span>
          <span className="kpi-value">★ {averageRating}</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Out of Stock</span>
          <span className="kpi-value kpi-danger">{outOfStockCount}</span>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3 className="chart-title">Products per Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productsByCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="category" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Stock Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stockStatusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {stockStatusData.map((entry, index) => (
                  <Cell key={entry.name} fill={PIE_COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Average Price per Category (€)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={avgPriceByCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="category" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgPrice" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Products per Rating Band</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ratingBands}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="band" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="top-products-section">
        <h3 className="chart-title">Top 20 Most Valuable Products</h3>
        <table className="top-products-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Total Value</th>
            </tr>
          </thead>
          <tbody>
            {top20.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>€{p.price.toFixed(2)}</td>
                <td>{p.stock}</td>
                <td>€{(p.price * p.stock).toLocaleString('en', { maximumFractionDigits: 0 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Analytics
