import { useState } from 'preact/hooks'
import { Header } from './components/Header'
import { Controls } from './components/Controls'
import { MapView } from './components/MapView'
import { Stats } from './components/Stats'
import { Legend } from './components/Legend'

export function App() {
  const [placeFilter, setPlaceFilter] = useState('none')
  const [showBoundaries, setShowBoundaries] = useState(false)
  const [adminLevel, setAdminLevel] = useState('admin1')
  const [searchTerm, setSearchTerm] = useState('')
  const [mapStyle, setMapStyle] = useState('openstreetmap')
  const [stats, setStats] = useState({ total: 0, visible: 0, boundaries: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const resetView = () => {
    setPlaceFilter('none')
    setSearchTerm('')
    setShowBoundaries(false)
    setAdminLevel('admin1')
    setMapStyle('openstreetmap')
  }

  return (
    <div className="app">
      <Header />
      
      <Controls
        placeFilter={placeFilter}
        setPlaceFilter={setPlaceFilter}
        showBoundaries={showBoundaries}
        setShowBoundaries={setShowBoundaries}
        adminLevel={adminLevel}
        setAdminLevel={setAdminLevel}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        mapStyle={mapStyle}
        setMapStyle={setMapStyle}
        resetView={resetView}
      />
      
      <div className="map-container">
        <MapView
          placeFilter={placeFilter}
          showBoundaries={showBoundaries}
          adminLevel={adminLevel}
          searchTerm={searchTerm}
          mapStyle={mapStyle}
          setStats={setStats}
          setLoading={setLoading}
          setError={setError}
        />
        
        <Stats 
          stats={stats}
          loading={loading}
          error={error}
        />
        
        <Legend />
      </div>
    </div>
  )
}