export function Controls({
  placeFilter,
  setPlaceFilter,
  showBoundaries,
  setShowBoundaries,
  adminLevel,
  setAdminLevel,
  searchTerm,
  setSearchTerm,
  mapStyle,
  setMapStyle,
  resetView
}) {
  return (
    <div className="controls">
      <div className="control-group">
        <label htmlFor="placeFilter">
          <i className="icon-location"></i>
          <span className="label-text">Show Places / عرض الأماكن:</span>
        </label>
        <select
          id="placeFilter"
          value={placeFilter}
          onChange={(e) => setPlaceFilter(e.target.value)}
        >
          <option value="none">None / لا شيء</option>
          <option value="all">All Places / جميع الأماكن</option>
          <option value="city">Cities Only / المدن فقط</option>
          <option value="town">Towns Only / البلدات فقط</option>
          <option value="village">Villages Only / القرى فقط</option>
        </select>
      </div>
      
      <div className="control-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={showBoundaries}
            onChange={(e) => setShowBoundaries(e.target.checked)}
          />
          <i className="icon-boundaries"></i>
          <span className="label-text">Show Boundaries / عرض الحدود</span>
        </label>
      </div>
      
      <div className="control-group">
        <label htmlFor="adminLevel">
          <i className="icon-admin"></i>
          <span className="label-text">Admin Level / المستوى الإداري:</span>
        </label>
        <select
          id="adminLevel"
          value={adminLevel}
          onChange={(e) => setAdminLevel(e.target.value)}
          disabled={!showBoundaries}
        >
          <option value="admin0">Country / البلد</option>
          <option value="admin1">States / الولايات</option>
          <option value="admin2">Localities / المحليات</option>
          <option value="populated_places">City/Town Boundaries / حدود المدن والبلدات</option>
        </select>
      </div>
      
      <div className="control-group">
        <label htmlFor="mapStyle">
          <i className="icon-map"></i>
          <span className="label-text">Map Style / نمط الخريطة:</span>
        </label>
        <select
          id="mapStyle"
          value={mapStyle}
          onChange={(e) => setMapStyle(e.target.value)}
        >
          <option value="openstreetmap">OpenStreetMap</option>
          <option value="satellite">Satellite / الأقمار الصناعية</option>
          <option value="terrain">Terrain / التضاريس</option>
          <option value="dark">Dark Mode / الوضع المظلم</option>
          <option value="light">Light Mode / الوضع المضيء</option>
        </select>
      </div>
      
      <div className="control-group">
        <label htmlFor="searchPlace">
          <i className="icon-search"></i>
          <span className="label-text">Search / البحث:</span>
        </label>
        <input
          type="text"
          id="searchPlace"
          placeholder="Enter place name... / أدخل اسم المكان..."
          value={searchTerm}
          onInput={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="control-group">
        <button onClick={resetView} className="reset-btn">
          <i className="icon-reset"></i>
          <span>Reset View / إعادة تعيين</span>
        </button>
      </div>
    </div>
  )
}