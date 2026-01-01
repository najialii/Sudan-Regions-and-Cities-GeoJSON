# 🇸🇩 Sudan Open Geographic Dataset

[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)
[![Data Source](https://img.shields.io/badge/Source-OpenStreetMap-blue.svg)](https://www.openstreetmap.org/)
[![Format](https://img.shields.io/badge/Format-GeoJSON-orange.svg)](https://geojson.org/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/yourusername/sudan-geographic-dataset/graphs/commit-activity)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> **A comprehensive, validated, and developer-ready dataset of Sudan's populated places and administrative boundaries.**

---

## 📖 Table of Contents
- [Overview](#overview)
- [Dataset Contents](#dataset-contents)
- [Data Dictionary Preview](#data-dictionary-preview)
- [Quick Start](#quick-start)
- [Usage Examples](#usage-examples)
    - [Web Mapping (Leaflet/Mapbox)](#web-mapping-leafletmapbox)
    - [Data Analysis (Python/Pandas)](#data-analysis-pythonpandas)
- [Repository Structure](#repository-structure)
- [Data Quality & Source](#data-quality--source)
- [License & Attribution](#license--attribution)

---

## Overview

This repository provides high-fidelity geographic data for the Republic of Sudan. Unlike raw exports, this dataset has been cleaned and organized for immediate use in software development, GIS analysis, and cartography.

**Key Features:**
* ✅ **Cleaned Geometry:** Validated GeoJSON files compatible with Leaflet, Mapbox, QGIS, and ArcGIS.
* ✅ **Bilingual Support:** Includes Arabic (`name:ar`) and English (`name:en`) labels where available.
* ✅ **Hierarchical Data:** Distinguishes between States (Wilayat), Localities, and Towns.
* ✅ **Developer Ready:** Includes scripts for converting data to CSV or SQL formats.

## Dataset Contents

We provide data in **GeoJSON** format (WGS84 / EPSG:4326).

| Filename | Type | Count (approx) | Description |
| :--- | :--- | :--- | :--- |
| `populated_places_points.geojson` | Point | ~12,500 | Cities, towns, villages, and hamlets. |
| `admin_boundaries_polygons.geojson`| Polygon | ~18 | State (Wilayat) boundaries. |
| `localities_polygons.geojson` | Polygon | ~189 | Localities (Mahaliyas) boundaries. |

## Data Dictionary Preview

Below is the schema for the `properties` object within the GeoJSON files.

| Key | Type | Example | Description |
| :--- | :--- | :--- | :--- |
| `osm_id` | Integer | `342211` | Unique OpenStreetMap ID. |
| `name` | String | `Khartoum` | Primary name (usually English or transliterated). |
| `name:ar` | String | `الخرطوم` | Name in Arabic script. |
| `place` | String | `city` | Classification: `city`, `town`, `village`, `hamlet`. |
| `population`| Integer | `5345000` | Population estimate (where available). |
| `is_in` | String | `Khartoum State`| Parent administrative region. |

> 📄 **Full Documentation:** See [docs/data-dictionary.md](docs/data-dictionary.md) for the complete schema.

---

## Quick Start

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/sudan-geographic-dataset.git](https://github.com/yourusername/sudan-geographic-dataset.git)
cd sudan-geographic-dataset

```

### 2. Visualize Immediately

Open the built-in viewer to inspect the data without writing code:

```bash
# Mac/Linux
open data/examples/interactive-map.html

# Windows
start data/examples/interactive-map.html

```

---

## Usage Examples

### Web Mapping (Leaflet/Mapbox)

Directly import the GeoJSON into your frontend application.

```javascript
// Example: Rendering Sudan Cities with Leaflet.js
fetch('data/geojson/populated_places_points.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: (feature, latlng) => {
        // Style based on city type
        const radius = feature.properties.place === 'city' ? 10 : 5;
        const color = feature.properties.place === 'city' ? '#D62828' : '#F77F00';
        
        return L.circleMarker(latlng, {
          radius: radius,
          fillColor: color,
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        }).bindPopup(`<b>${feature.properties.name}</b><br>${feature.properties['name:ar'] || ''}`);
      }
    }).addTo(map);
  });

```

### Data Analysis (Python/Pandas)

Ideal for data science or converting to Excel/SQL.

```python
import geopandas as gpd
import matplotlib.pyplot as plt

# 1. Load the dataset
gdf = gpd.read_file('data/geojson/populated_places_points.geojson')

# 2. Filter for major cities only
major_cities = gdf[gdf['place'] == 'city']

# 3. Plotting
fig, ax = plt.subplots(figsize=(10, 10))
boundaries = gpd.read_file('data/geojson/admin_boundaries_polygons.geojson')
boundaries.plot(ax=ax, color='#f0f0f0', edgecolor='#333')
major_cities.plot(ax=ax, color='red', markersize=50, alpha=0.7)

plt.title(f"Distribution of {len(major_cities)} Major Cities in Sudan")
plt.show()

```

---

## Repository Structure

```text
sudan-geographic-dataset/
├── 📂 data/
│   ├── 📂 geojson/           # PRIMARY DATA (Master files)
│   ├── 📂 csv/               # Derived CSV files (for Excel/SQL)
│   └── 📂 examples/          # Demo scripts (HTML, Python, R)
├── 📂 docs/
│   └── data-dictionary.md    # Detailed field definitions
├── 📂 scripts/               # Maintenance scripts (update, validate, clean)
├── .gitignore
└── README.md

```

## Data Quality & Source

* **Source:** [OpenStreetMap](https://www.openstreetmap.org/) (OSM) contributors.
* **Export Tool:** HOT Export Tool & Overpass Turbo.
* **Last Update:** December 2025.
* **Validation:**
* Duplicate nodes removed.
* Orphaned geometries fixed.
* `place` tags standardized.



## Contributing

We welcome contributions! Please follow these steps:

1. **Issues:** If you find a missing village or incorrect boundary, please [open an issue](https://www.google.com/search?q=issues/new).
2. **Pull Requests:** If you can fix the data, fork the repo, make changes to the GeoJSON, and submit a PR.

## License & Attribution

This dataset is made available under the **Open Database License (ODbL)**.

**You are free to:**

* **Share:** To copy, distribute and use the database.
* **Create:** To produce works from the database.
* **Adapt:** To modify, transform and build upon the database.

**Under the following conditions:**

* **Attribution:** You must attribute the share-alike license to "OpenStreetMap contributors".
* **Share-Alike:** If you publicly use any adapted version of this database, or works produced from an adapted database, you must also offer that database under the ODbL.

### Citation

If you use this dataset in a research paper or commercial project, please include:

Map data © OpenStreetMap contributors, available under the Open Database License. Data processing by [Name of Entity/Repo].
