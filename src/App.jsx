import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import ProductCatalogue from './pages/ProductCatalogue/ProductCatalogue'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Analytics from './pages/Analytics/Analytics'
import Saved from './pages/Saved/Saved'
import Compare from './pages/Compare/Compare'
import './App.css'

function App() {
  const [savedIds, setSavedIds] = useState([])
  const [compareIds, setCompareIds] = useState([])

  return (
    <BrowserRouter>
      <Navbar />
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
    </BrowserRouter>
  )
}

export default App