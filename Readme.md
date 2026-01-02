# Sudan Geographic Dataset

[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)
[![Data Source](https://img.shields.io/badge/Source-OpenStreetMap-blue.svg)](https://www.openstreetmap.org/)
[![Format](https://img.shields.io/badge/Format-GeoJSON-orange.svg)](https://geojson.org/)

A comprehensive, clean dataset of Sudan's populated places and administrative boundaries in GeoJSON format, designed for mapping, analysis, and visualization applications.

## Overview

This repository provides high-quality geographic data for Sudan, including:
- **Populated Places**: Cities, towns, and villages as point features
- **Administrative Boundaries**: Regional polygons and administrative divisions
- **Ready-to-Use Examples**: Interactive maps and analysis scripts
- **Comprehensive Documentation**: Data dictionaries and usage guides

Perfect for researchers, developers, cartographers, and anyone working with Sudan geographic data.

## Quick Start

```bash
git clone https://github.com/yourusername/sudan-geographic-dataset.git
cd sudan-geographic-dataset
```

Open `data/examples/interactive-map.html` in your browser to explore the data immediately.

## Repository Structure

```
sudan-geographic-dataset/
├── data/
│   ├── geojson/                    # Primary GeoJSON datasets
│   │   ├── populated_places_points.geojson     # Cities, towns, villages
│   │   └── populated_places_polygons.geojson   #  Administrative boundaries
│   ├── csv/                        # CSV exports (auto-generated)
│   └── examples/                   # Working code examples
│       ├── interactive-map.html    # Full-featured web map
│       └── python-example.py       # Analysis and export script
├── docs/                          # Documentation
│   └── data-dictionary.md         # Field descriptions and schemas
└── README.md                      # This file
```

## Dataset Details

| Dataset | Features | Size | Use Cases |
|---------|----------|------|-----------|
| **Populated Places** | Point geometries | ~X,XXX places | City markers, location search, population analysis |
| **Administrative Boundaries** | Polygon geometries | ~XXX regions | Choropleth maps, regional statistics, boundary analysis |

### Key Features
-  **Clean, validated data** from OpenStreetMap
-  **Standardized naming** and consistent field structure  
-  **Multiple administrative levels** (states, localities, districts)
-  **Ready-to-use examples** for web and desktop applications
-  **Comprehensive documentation** with field descriptions

## Usage Examples

###  Interactive Web Mapping
```javascript
// Load and display populated places
fetch('data/geojson/populated_places_points.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, {
          radius: feature.properties.place === 'city' ? 8 : 4,
          fillColor: '#ff7800'
        });
      }
    }).addTo(map);
  });
```

###  Python Analysis
```python
import geopandas as gpd
import matplotlib.pyplot as plt

# Load datasets
places = gpd.read_file('data/geojson/populated_places_points.geojson')
boundaries = gpd.read_file('data/geojson/populated_places_polygons.geojson')

# Quick visualization
fig, ax = plt.subplots(figsize=(12, 8))
boundaries.plot(ax=ax, color='lightblue', edgecolor='black', alpha=0.7)
places.plot(ax=ax, color='red', markersize=20)
plt.title('Sudan: Populated Places and Administrative Boundaries')
plt.show()
```

###  QGIS Integration
1. Open QGIS
2. Layer → Add Layer → Add Vector Layer
3. Browse to `data/geojson/` and select desired files
4. Style and analyze as needed

## Data Specifications

### Coordinate Reference System
- **CRS**: WGS84 (EPSG:4326)
- **Units**: Decimal degrees
- **Precision**: Up to 6 decimal places

### Data Quality
- **Source**: OpenStreetMap via HOT Export Tool
- **Validation**: Automated geometry and attribute validation
- **Coverage**: Comprehensive national coverage
- **Currency**: Updated December 2025

### Field Schema
See [docs/data-dictionary.md](docs/data-dictionary.md) for complete field descriptions and data types.

## Contributing

We welcome contributions to improve data quality and coverage:

1. **Report Issues**: Found missing places or incorrect boundaries? [Open an issue](../../issues)
2. **Submit Updates**: Have corrections or additions? Submit a pull request
3. **Share Usage**: Built something cool? Let us know!

### Development Setup
```bash
# Install Python dependencies for analysis
pip install geopandas matplotlib folium

# Run data validation
python data/examples/python-example.py
```

## License & Attribution

### Data License
This dataset is made available under the [Open Database License (ODbL)](http://opendatacommons.org/licenses/odbl/1.0/):
-  **Use freely** for any purpose
-  **Share and redistribute** 
-  **Create derivative works**
-  **Attribute OpenStreetMap** contributors
-  **Share derivatives** under same license

### Attribution
```
Data © OpenStreetMap contributors, available under the Open Database License.
Exported via HOT Export Tool (https://github.com/hotosm/raw-data-api)
```

## Changelog

### v1.0.0 (2025-12-02)
- Initial release with comprehensive Sudan geographic data
- Populated places points dataset (~X,XXX features)
- Administrative boundaries polygons dataset (~XXX features)  
- Interactive web map example
- Python analysis and export tools
- Complete documentation and data dictionary

---

**Questions?** Open an issue or reach out to the maintainers.

**Found this useful?** ⭐ Star the repository and share with others!
