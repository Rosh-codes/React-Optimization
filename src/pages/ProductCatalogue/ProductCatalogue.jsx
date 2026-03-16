import React, { useEffect, useRef, useState } from 'react'
import { List } from 'react-window'
import products from '../../data/products.json'
import ProductCard from '../../components/ProductCard/ProductCard'
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar'
import SearchBar from '../../components/SearchBar/SearchBar'
import SortBar from '../../components/SortBar/SortBar'
import ComparisonTray from '../../components/ComparisonTray/ComparisonTray'
import './ProductCatalogue.css'

const ROW_HEIGHT = 360

function ProductRow({ index, style, products, columnCount, savedIds, compareIds, onSave, onCompare }) {
  const start = index * columnCount
  const rowProducts = products.slice(start, start + columnCount)

  return (
    <div style={style} className="virtual-row">
      <div
        className="virtual-row-grid"
        style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
      >
        {rowProducts.map(product => (
          <div key={product.id} className="virtual-cell">
            <ProductCard
              product={product}
              isSaved={savedIds.includes(product.id)}
              isCompared={compareIds.includes(product.id)}
              compareCount={compareIds.length}
              onSave={onSave}
              onCompare={onCompare}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function ProductCatalogue({ savedIds, setSavedIds, compareIds, setCompareIds }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(2000)
  const [stockStatus, setStockStatus] = useState('all')
  const [sortField, setSortField] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')
  const catalogueMainRef = useRef(null)
  const [listHeight, setListHeight] = useState(640)
  const [columnCount, setColumnCount] = useState(3)

  // INTENTIONALLY UNOPTIMIZED — recalculates on every render
  let filteredProducts = products

  if (searchTerm) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(p =>
      selectedCategories.includes(p.category)
    )
  }

  filteredProducts = filteredProducts.filter(p =>
    p.price >= minPrice && p.price <= maxPrice
  )

  if (stockStatus === 'inStock') {
    filteredProducts = filteredProducts.filter(p => p.stock > 100)
  } else if (stockStatus === 'lowStock') {
    filteredProducts = filteredProducts.filter(p => p.stock > 0 && p.stock <= 100)
  } else if (stockStatus === 'outOfStock') {
    filteredProducts = filteredProducts.filter(p => p.stock === 0)
  }

  filteredProducts = [...filteredProducts].sort((a, b) => {
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

  // INTENTIONALLY UNOPTIMIZED — handlers recreated on every render
  const handleSave = (productId) => {
    if (savedIds.includes(productId)) {
      setSavedIds(savedIds.filter(id => id !== productId))
    } else {
      setSavedIds([...savedIds, productId])
    }
  }

  const handleCompare = (productId) => {
    if (compareIds.includes(productId)) {
      setCompareIds(compareIds.filter(id => id !== productId))
    } else if (compareIds.length < 3) {
      setCompareIds([...compareIds, productId])
    }
  }

  useEffect(() => {
    const updateLayout = () => {
      const width = catalogueMainRef.current?.clientWidth || window.innerWidth
      if (width >= 1200) {
        setColumnCount(4)
      } else if (width >= 900) {
        setColumnCount(3)
      } else if (width >= 600) {
        setColumnCount(2)
      } else {
        setColumnCount(1)
      }

      setListHeight(Math.max(420, window.innerHeight - 220))
    }

    updateLayout()
    window.addEventListener('resize', updateLayout)

    const observer = new ResizeObserver(updateLayout)
    if (catalogueMainRef.current) {
      observer.observe(catalogueMainRef.current)
    }

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateLayout)
    }
  }, [])

  const rowCount = Math.ceil(filteredProducts.length / columnCount)
  const virtualizedData = {
    products: filteredProducts,
    columnCount,
    savedIds,
    compareIds,
    onSave: handleSave,
    onCompare: handleCompare,
  }

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
        <div className="catalogue-main" ref={catalogueMainRef}>
          <SortBar
            sortField={sortField}
            setSortField={setSortField}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            resultCount={filteredProducts.length}
          />
          {filteredProducts.length === 0 ? (
            <div className="catalogue-empty">No products match your filters.</div>
          ) : (
            <div className="product-list-virtualized">
              <List
                rowCount={rowCount}
                rowHeight={ROW_HEIGHT}
                rowComponent={ProductRow}
                rowProps={virtualizedData}
                overscanCount={3}
                style={{ height: listHeight, width: '100%' }}
              />
            </div>
          )}
        </div>
      </div>
      {compareIds.length > 0 && (
        <ComparisonTray compareIds={compareIds} setCompareIds={setCompareIds} />
      )}
    </div>
  )
}

export default ProductCatalogue
