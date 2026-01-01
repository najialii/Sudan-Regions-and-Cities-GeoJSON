import { useEffect, useRef } from 'preact/hooks'
import L from 'leaflet'

export function MapView({
  placeFilter,
  showBoundaries,
  adminLevel,
  searchTerm,
  mapStyle,
  setStats,
  setLoading,
  setError
}) {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const placesLayer = useRef(null)
  const boundariesLayer = useRef(null)
  const tileLayer = useRef(null)
  const placesData = useRef(null)
  const boundariesData = useRef(null)
  const adminData = useRef({}) // Store different admin level data

  // Map style configurations
  const mapStyles = {
    openstreetmap: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '© OpenStreetMap contributors'
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '© Esri, Maxar, Earthstar Geographics'
    },
    terrain: {
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '© OpenTopoMap contributors'
    },
    dark: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '© CartoDB, © OpenStreetMap contributors'
    },
    light: {
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      attribution: '© CartoDB, © OpenStreetMap contributors'
    }
  }

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      // Initialize Leaflet map
      mapInstance.current = L.map(mapRef.current).setView([15.5007, 32.5599], 6)
      
      // Add initial tile layer
      const style = mapStyles[mapStyle] || mapStyles.openstreetmap
      tileLayer.current = L.tileLayer(style.url, {
        attribution: style.attribution
      }).addTo(mapInstance.current)

      // Create layer groups
      placesLayer.current = L.layerGroup().addTo(mapInstance.current)
      boundariesLayer.current = L.layerGroup().addTo(mapInstance.current)

      // Load data
      loadData()
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [])

  // Load GeoJSON data
  const loadData = async () => {
    try {
      setLoading(true)
      
      const [
        placesResponse, 
        boundariesResponse,
        admin0Response,
        admin1Response,
        admin2Response
      ] = await Promise.all([
        fetch('/data/geojson/populated_places_points.geojson'),
        fetch('/data/geojson/populated_places_polygons.geojson'),
        fetch('/data/geojson/sdn_admin0.geojson'),
        fetch('/data/geojson/sdn_admin1.geojson'),
        fetch('/data/geojson/sdn_admin2.geojson')
      ])

      if (!placesResponse.ok || !boundariesResponse.ok || !admin0Response.ok || !admin1Response.ok || !admin2Response.ok) {
        throw new Error('Failed to load data files')
      }

      const places = await placesResponse.json()
      const boundaries = await boundariesResponse.json()
      const admin0 = await admin0Response.json()
      const admin1 = await admin1Response.json()
      const admin2 = await admin2Response.json()

      placesData.current = places
      boundariesData.current = boundaries
      adminData.current = {
        admin0,
        admin1,
        admin2,
        populated_places: boundaries
      }

      setStats(prev => ({
        ...prev,
        total: places.features.length,
        boundaries: getCurrentBoundaryData().features.length
      }))

      // Don't display anything initially - let user choose what to show
      // displayPlaces() and displayBoundaries() will be called by useEffect when needed
      
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  // Get current boundary data based on admin level
  const getCurrentBoundaryData = () => {
    return adminData.current[adminLevel] || adminData.current.admin1 || { features: [] }
  }

  // Display places on map
  const displayPlaces = () => {
    if (!placesLayer.current) return

    placesLayer.current.clearLayers()
    
    // If "none" is selected, don't show any places
    if (placeFilter === 'none') {
      setStats(prev => ({ ...prev, visible: 0 }))
      return
    }

    // Use polygon data for display if available, otherwise fall back to points
    const dataToUse = boundariesData.current || placesData.current
    if (!dataToUse) return
    
    let filteredFeatures = dataToUse.features

    // Apply filters based on place type
    if (placeFilter !== 'all') {
      filteredFeatures = filteredFeatures.filter(f => f.properties.place === placeFilter)
    }

    if (searchTerm) {
      filteredFeatures = filteredFeatures.filter(f => 
        f.properties.name && 
        f.properties.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Display places as polygon boundaries instead of circles
    L.geoJSON({ type: 'FeatureCollection', features: filteredFeatures }, {
      style: (feature) => {
        const placeType = feature.properties.place || 'unknown'
        let color, weight
        
        switch(placeType) {
          case 'city':
            color = '#e74c3c'
            weight = 3
            break
          case 'town':
            color = '#f39c12'
            weight = 2.5
            break
          case 'village':
            color = '#27ae60'
            weight = 2
            break
          default:
            color = '#95a5a6'
            weight = 1.5
        }

        return {
          color: color,
          weight: weight,
          opacity: 0.8,
          fillOpacity: 0,
          fill: false,
          lineCap: 'round',
          lineJoin: 'round'
        }
      },
      onEachFeature: (feature, layer) => {
        if (feature.properties && feature.properties.name) {
          const props = feature.properties
          const placeTypeArabic = {
            'city': 'مدينة',
            'town': 'بلدة', 
            'village': 'قرية'
          }
          
          layer.bindPopup(`
            <div style="text-align: center; font-weight: bold; margin-bottom: 8px;">
              ${props.name}
            </div>
            <div style="margin-bottom: 4px;">
              <strong>Type / النوع:</strong> ${props.place || 'Unknown'} / ${placeTypeArabic[props.place] || 'غير معروف'}
            </div>
            ${props.population ? `
            <div>
              <strong>Population / السكان:</strong> ${props.population.toLocaleString()}
            </div>` : ''}
          `)
        }
      }
    }).addTo(placesLayer.current)

    setStats(prev => ({ ...prev, visible: filteredFeatures.length }))
  }

  // Display boundaries on map
  const displayBoundaries = () => {
    if (!boundariesLayer.current) return

    boundariesLayer.current.clearLayers()
    
    const currentBoundaryData = getCurrentBoundaryData()
    if (!currentBoundaryData || !currentBoundaryData.features) return
    
    // Different styles for different admin levels - borders only, no fill
    const getStyle = () => {
      switch(adminLevel) {
        case 'admin0':
          return {
            color: '#e74c3c',
            weight: 4,
            opacity: 0.9,
            fillOpacity: 0,
            fill: false,
            dashArray: null,
            lineCap: 'round',
            lineJoin: 'round'
          }
        case 'admin1':
          return {
            color: '#3498db',
            weight: 3,
            opacity: 0.8,
            fillOpacity: 0,
            fill: false,
            dashArray: null,
            lineCap: 'round',
            lineJoin: 'round'
          }
        case 'admin2':
          return {
            color: '#f39c12',
            weight: 2,
            opacity: 0.7,
            fillOpacity: 0,
            fill: false,
            dashArray: '5, 5',
            lineCap: 'round',
            lineJoin: 'round'
          }
        default:
          return {
            color: '#27ae60',
            weight: 2,
            opacity: 0.7,
            fillOpacity: 0,
            fill: false,
            dashArray: '3, 3',
            lineCap: 'round',
            lineJoin: 'round'
          }
      }
    }
    
    L.geoJSON(currentBoundaryData, {
      style: getStyle(),
      onEachFeature: (feature, layer) => {
        const props = feature.properties
        let name = props.name || props.adm0_name || props.adm1_name || props.adm2_name || 'Unknown'
        let popupContent = `<div style="text-align: center; font-weight: bold; margin-bottom: 8px;">${name}</div>`
        
        if (props.adm1_name && adminLevel === 'admin1') {
          popupContent += `<div><strong>State / الولاية:</strong> ${props.adm1_name}</div>`
          if (props.area_sqkm) {
            popupContent += `<div><strong>Area / المساحة:</strong> ${Math.round(props.area_sqkm).toLocaleString()} km² / كم²</div>`
          }
        } else if (props.adm2_name && adminLevel === 'admin2') {
          popupContent += `<div><strong>Locality / المحلية:</strong> ${props.adm2_name}</div>`
          if (props.adm1_name) popupContent += `<div><strong>State / الولاية:</strong> ${props.adm1_name}</div>`
        }
        
        layer.bindPopup(popupContent)
      }
    }).addTo(boundariesLayer.current)
  }

  // Update places when filters change
  useEffect(() => {
    displayPlaces()
  }, [placeFilter, searchTerm])

  // Toggle boundaries
  useEffect(() => {
    if (!mapInstance.current || !boundariesLayer.current) return
    
    if (showBoundaries) {
      mapInstance.current.addLayer(boundariesLayer.current)
    } else {
      mapInstance.current.removeLayer(boundariesLayer.current)
    }
  }, [showBoundaries])

  // Update boundaries when admin level changes
  useEffect(() => {
    if (showBoundaries && adminData.current[adminLevel]) {
      displayBoundaries()
      // Update stats
      const currentData = getCurrentBoundaryData()
      setStats(prev => ({ 
        ...prev, 
        boundaries: currentData.features ? currentData.features.length : 0 
      }))
    }
  }, [adminLevel])

  // Update map style when changed
  useEffect(() => {
    if (!mapInstance.current || !tileLayer.current) return
    
    const style = mapStyles[mapStyle] || mapStyles.openstreetmap
    
    // Remove current tile layer
    mapInstance.current.removeLayer(tileLayer.current)
    
    // Add new tile layer
    tileLayer.current = L.tileLayer(style.url, {
      attribution: style.attribution
    }).addTo(mapInstance.current)
  }, [mapStyle])

  return <div id="map" ref={mapRef}></div>
}