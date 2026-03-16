import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">ReactPerf Dashboard</div>
      <div className="navbar-links">
        <NavLink
          to="/products"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Products
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Analytics
        </NavLink>
        <NavLink
          to="/saved"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Saved
        </NavLink>
        <NavLink
          to="/compare"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Compare
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar