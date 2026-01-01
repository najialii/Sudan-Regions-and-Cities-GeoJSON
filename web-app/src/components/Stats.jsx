export function Stats({ stats, loading, error }) {
  return (
    <div className="stats">
      <h4>
        <i className={`icon-stats ${loading ? 'loading' : ''}`}></i>
        Map Statistics / إحصائيات الخريطة
      </h4>
      <div className="stat-item">
        <span>
          <i className="icon-location"></i>
          Total Places / إجمالي الأماكن:
        </span>
        <span className={loading ? 'loading' : error ? 'error' : ''}>
          {loading ? 'Loading... / جاري التحميل...' : error ? 'Error / خطأ' : stats.total.toLocaleString()}
        </span>
      </div>
      <div className="stat-item">
        <span>
          <i className="icon-visible"></i>
          Visible Places / الأماكن المرئية:
        </span>
        <span>{stats.visible.toLocaleString()}</span>
      </div>
      <div className="stat-item">
        <span>
          <i className="icon-boundaries"></i>
          Boundaries / الحدود:
        </span>
        <span className={loading ? 'loading' : error ? 'error' : ''}>
          {loading ? 'Loading... / جاري التحميل...' : error ? 'Error / خطأ' : stats.boundaries.toLocaleString()}
        </span>
      </div>
      {error && (
        <div className="error" style={{ marginTop: '10px', fontSize: '12px' }}>
          Error / خطأ: {error}
        </div>
      )}
    </div>
  )
}