import React, { Suspense, lazy, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import ProductCatalogue from './pages/ProductCatalogue/ProductCatalogue'
import './App.css'

const ProductDetail = lazy(() => import('./pages/ProductDetail/ProductDetail'))
const Analytics = lazy(() => import('./pages/Analytics/Analytics'))
const Saved = lazy(() => import('./pages/Saved/Saved'))
const Compare = lazy(() => import('./pages/Compare/Compare'))

function App() {
  const [savedIds, setSavedIds] = useState([])
  const [compareIds, setCompareIds] = useState([])

  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div className="page-loading">Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route
            path="/products"
            element={
              <ProductCatalogue
                savedIds={savedIds}
                setSavedIds={setSavedIds}
                compareIds={compareIds}
                setCompareIds={setCompareIds}
              />
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProductDetail
                savedIds={savedIds}
                setSavedIds={setSavedIds}
              />
            }
          />
          <Route path="/analytics" element={<Analytics />} />
          <Route
            path="/saved"
            element={
              <Saved
                savedIds={savedIds}
                setSavedIds={setSavedIds}
              />
            }
          />
          <Route
            path="/compare"
            element={
              <Compare
                compareIds={compareIds}
                setCompareIds={setCompareIds}
              />
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App