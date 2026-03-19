import React, { useCallback, useMemo, useState } from 'react'
import products from '../../data/products.json'
import ProductCard from '../../components/ProductCard/ProductCard'
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar'
import SearchBar from '../../components/SearchBar/SearchBar'
import SortBar from '../../components/SortBar/SortBar'
import ComparisonTray from '../../components/ComparisonTray/ComparisonTray'
import './ProductCatalogue.css'

function ProductCatalogue({ savedIds, setSavedIds, compareIds, setCompareIds }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(2000)
  const [stockStatus, setStockStatus] = useState('all')
  const [sortField, setSortField] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')

  const filteredProducts = useMemo(() => {
    let nextProducts = products

    if (searchTerm) {
      nextProducts = nextProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategories.length > 0) {
      nextProducts = nextProducts.filter(p =>
        selectedCategories.includes(p.category)
      )
    }

    nextProducts = nextProducts.filter(p =>
      p.price >= minPrice && p.price <= maxPrice
    )

    if (stockStatus === 'inStock') {
      nextProducts = nextProducts.filter(p => p.stock > 100)
    } else if (stockStatus === 'lowStock') {
      nextProducts = nextProducts.filter(p => p.stock > 0 && p.stock <= 100)
    } else if (stockStatus === 'outOfStock') {
      nextProducts = nextProducts.filter(p => p.stock === 0)
    }

    return [...nextProducts].sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      }
      if (sortField === 'price') {
        return sortDirection === 'asc' ? a.price - b.price : b.price - a.price
      }
      if (sortField === 'rating') {
        return sortDirection === 'asc' ? a.rating - b.rating : b.rating - a.rating
      }
      if (sortField === 'stock') {
        return sortDirection === 'asc' ? a.stock - b.stock : b.stock - a.stock
      }
      if (sortField === 'reviewCount') {
        return sortDirection === 'asc'
          ? a.reviewCount - b.reviewCount
          : b.reviewCount - a.reviewCount
      }
      return 0
    })
  }, [searchTerm, selectedCategories, minPrice, maxPrice, stockStatus, sortField, sortDirection])

  const handleSave = useCallback((productId) => {
    setSavedIds(prevSavedIds => (
      prevSavedIds.includes(productId)
        ? prevSavedIds.filter(id => id !== productId)
        : [...prevSavedIds, productId]
    ))
  }, [setSavedIds])

  const handleCompare = useCallback((productId) => {
    setCompareIds(prevCompareIds => {
      if (prevCompareIds.includes(productId)) {
        return prevCompareIds.filter(id => id !== productId)
      }
      if (prevCompareIds.length < 3) {
        return [...prevCompareIds, productId]
      }
      return prevCompareIds
    })
  }, [setCompareIds])

  return (
    <div className="catalogue-container">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="catalogue-body">
        <FilterSidebar
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          stockStatus={stockStatus}
          setStockStatus={setStockStatus}
        />
        <div className="catalogue-main">
          <SortBar
            sortField={sortField}
            setSortField={setSortField}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            resultCount={filteredProducts.length}
          />
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isSaved={savedIds.includes(product.id)}
                isCompared={compareIds.includes(product.id)}
                compareCount={compareIds.length}
                onSave={handleSave}
                onCompare={handleCompare}
              />
            ))}
          </div>
        </div>
      </div>
      {compareIds.length > 0 && (
        <ComparisonTray compareIds={compareIds} setCompareIds={setCompareIds} />
      )}
    </div>
  )
}

export default ProductCatalogue
