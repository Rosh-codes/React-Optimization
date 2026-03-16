import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ComparisonTray.css'

function ComparisonTray({ compareIds, setCompareIds }) {
  const navigate = useNavigate()

  return (
    <div className="comparison-tray">
      <span className="tray-count">
        {compareIds.length} of 3 selected for comparison
      </span>
      <div className="tray-actions">
        <button
          className="tray-btn tray-btn-primary"
          onClick={() => navigate('/compare')}
        >
          Compare Now
        </button>
        <button
          className="tray-btn tray-btn-secondary"
          onClick={() => setCompareIds([])}
        >
          Clear
        </button>
      </div>
    </div>
  )
}

export default ComparisonTray
