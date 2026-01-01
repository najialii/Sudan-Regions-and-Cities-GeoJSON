export function Legend() {
  return (
    <div className="legend">
      <h4>
        <i className="icon-legend"></i>
        Legend / وسيلة الإيضاح
      </h4>
      
      <div className="legend-section">
        <strong>Places / الأماكن:</strong>
      </div>
      <div className="legend-item">
        <div className="legend-boundary solid-border" style={{ borderColor: '#e74c3c', borderWidth: '3px', backgroundColor: 'transparent' }}></div>
        <span>Cities / المدن</span>
      </div>
      <div className="legend-item">
        <div className="legend-boundary solid-border" style={{ borderColor: '#f39c12', borderWidth: '2.5px', backgroundColor: 'transparent' }}></div>
        <span>Towns / البلدات</span>
      </div>
      <div className="legend-item">
        <div className="legend-boundary solid-border" style={{ borderColor: '#27ae60', borderWidth: '2px', backgroundColor: 'transparent' }}></div>
        <span>Villages / القرى</span>
      </div>
      
      <div className="legend-section">
        <strong>Boundaries / الحدود:</strong>
      </div>
      <div className="legend-item">
        <div className="legend-boundary solid-border" style={{ borderColor: '#e74c3c', borderWidth: '4px', backgroundColor: 'transparent' }}></div>
        <span>Country Border / حدود البلد</span>
      </div>
      <div className="legend-item">
        <div className="legend-boundary solid-border" style={{ borderColor: '#3498db', borderWidth: '3px', backgroundColor: 'transparent' }}></div>
        <span>State Borders / حدود الولايات</span>
      </div>
      <div className="legend-item">
        <div className="legend-boundary dashed-border" style={{ borderColor: '#f39c12', borderWidth: '2px', backgroundColor: 'transparent' }}></div>
        <span>Locality Borders / حدود المحليات</span>
      </div>
      <div className="legend-item">
        <div className="legend-boundary dotted-border" style={{ borderColor: '#27ae60', borderWidth: '2px', backgroundColor: 'transparent' }}></div>
        <span>City/Town Boundaries / حدود المدن والبلدات</span>
      </div>
    </div>
  )
}