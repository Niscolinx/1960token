import React from 'react'
import AdvancedRealChart from '../../widgets/AdvancedRealChart'
import TechnicalAnalysis from '../../widgets/LiveTicker'

function trade() {
  return (
    <div className='h-[90vh]'>trade
    <AdvancedRealChart/>
    <TechnicalAnalysis/>
    </div>
  )
}

export default trade