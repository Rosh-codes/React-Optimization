# React Optimization Thesis

## Overview

This repository contains the implementation for a bachelor thesis focused on React performance optimization.

The core idea is to start from an intentionally unoptimized e-commerce style application and compare the impact of selected optimization techniques in isolated branches.

The app uses a large local dataset (currently 5,000 generated products) to make rendering and interaction bottlenecks observable and measurable.

## Thesis Goal

The project evaluates how different optimization strategies affect:

1. Initial load and bundle characteristics
2. Rendering cost during list-heavy UI updates
3. Interaction smoothness during search, filter, sort, and scrolling

The study is designed as branch-based experiments so each optimization family can be measured independently under the same conditions.

## Tech Stack

- React 19
- React Router
- Vite
- Recharts
- ESLint
- rollup-plugin-visualizer (bundle analysis)

## Project Structure

```text
react-optimization-thesis/
|-- generate.js
|-- package.json
|-- vite.config.js
|-- src/
|   |-- App.jsx
|   |-- main.jsx
|   |-- index.css
|   |-- App.css
|   |-- data/
|   |   `-- products.json
|   |-- components/
|   |   |-- Navbar/
|   |   |-- SearchBar/
|   |   |-- FilterSidebar/
|   |   |-- SortBar/
|   |   |-- ProductCard/
|   |   `-- ComparisonTray/
|   `-- pages/
|       |-- ProductCatalogue/
|       |-- ProductDetail/
|       |-- Analytics/
|       |-- Saved/
|       `-- Compare/
`-- public/
```

### Functional Modules

- Product Catalogue: search, category filtering, price filtering, stock filtering, sorting, save, compare
- Product Detail: tabbed details + stock history chart
- Analytics: aggregate dashboard with charts and top-value table
- Saved: saved items list
- Compare: side-by-side comparison table

## Dataset and Data Generation

Data is generated locally and imported directly from JSON.

- Source file: `src/data/products.json`
- Generator script: `generate.js`
- Current generation target: 5,000 products

Each product includes:

- Basic fields: id, name, category, brand, price
- User-facing metrics: rating, reviewCount
- Inventory fields: stock, stockHistory (30-day)
- Extra metadata: sku, weight, description

To regenerate data:

```bash
node generate.js
```

## Branch Strategy (Experiment Design)

This thesis uses one branch per optimization family:

- `main`: baseline / reference implementation (intentionally unoptimized behavior)
- `opt-lazy-loading`: route-level code splitting and lazy loading experiment
- `opt-memoization`: memoization experiment (`useMemo`, `useCallback`, `React.memo` scope depending on branch implementation)
- `opt-list-virtualization`: list virtualization experiment (large list rendering optimization)

Recommended interpretation:

- Compare each optimization branch against `main`
- Keep dataset size and benchmark flow identical
- Record measurements by branch and commit hash for reproducibility

## How the App Works (High Level)

1. `App.jsx` defines routes and shared top-level state (`savedIds`, `compareIds`)
2. `ProductCatalogue` applies search/filter/sort and renders product cards
3. `ProductCard` handles save/compare actions and navigation to detail route
4. `ProductDetail` renders product metadata and chart views
5. `Analytics` calculates and renders aggregate visual metrics
6. `Saved` and `Compare` derive their views from selected id arrays

## Scripts

```bash
npm run dev         # Start development server
npm run build       # Production build
npm run preview     # Serve production build
npm run testbuild   # Clean dist then build
npm run analyze     # Build with bundle visualizer enabled
npm run analyze:open
```

Notes:

- `analyze` writes a report to `dist/stats.html`
- `analyze:open` opens that report on macOS

## Bundle Analysis Workflow

This project uses `rollup-plugin-visualizer` through Vite config.

1. Run `npm run analyze`
2. Run `npm run analyze:open`
3. Compare the treemap between branches

What to compare in the report:

- Main entry chunk size
- Largest module contributors
- Route/chunk movement after lazy loading
- Third-party library footprint changes

## Performance Benchmarking Workflow

For consistent thesis measurements:

1. Use the same machine, browser, dataset size, and power mode
2. Benchmark in production mode (`build` + `preview`) for stable runtime numbers
3. Repeat each scenario at least 3 times and report average

Suggested benchmark scenarios:

1. Initial load of `/products`
2. Search input responsiveness
3. Filter + sort interaction latency
4. Scrolling performance in catalogue
5. Route transition to analytics page

Suggested tools:

- React DevTools Profiler
- Chrome DevTools Performance
- Lighthouse
- Vite build output + visualizer report

## Running Branch Comparisons

Example branch workflow:

```bash
git switch main
npm install
npm run build

git switch opt-lazy-loading
npm run build

git switch opt-memoization
npm run build

git switch opt-list-virtualization
npm run build
```

## Reproducibility Checklist

Before collecting final numbers:

1. Confirm clean working tree (`git status`)
2. Record branch name and commit hash (`git rev-parse HEAD`)
3. Confirm dataset size is unchanged across runs
4. Use identical measurement steps and timings
5. Store raw logs/screenshots with branch labels

## Limitations

- Synthetic data may not fully represent production user behavior
- Device and browser differences can affect timings
- Some optimization gains overlap, so isolated and combined results should both be discussed

## License and Academic Use

This repository is intended for academic experimentation and performance analysis in a controlled thesis context.
