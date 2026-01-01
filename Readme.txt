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

Open the example map:

data/examples/interactive-map.html

Repository Structure
sudan-geographic-dataset/
├── data/
│   ├── geojson/
│   │   ├── populated_places_points.geojson
│   │   └── populated_places_polygons.geojson
│   ├── csv/
│   └── examples/
│       ├── interactive-map.html
│       └── python-example.py
├── docs/
│   └── data-dictionary.md
└── README.md

Interactive Web Map (Leaflet)
fetch('data/geojson/populated_places_points.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: (feature, latlng) =>
        L.circleMarker(latlng, {
          radius: feature.properties.place === 'city' ? 8 : 4,
          fillColor: '#ff7800',
          color: '#333',
          weight: 1,
          fillOpacity: 0.8
        })
    }).addTo(map);
  });

🐍 Python / GeoPandas Example
import geopandas as gpd
import matplotlib.pyplot as plt

places = gpd.read_file("data/geojson/populated_places_points.geojson")
boundaries = gpd.read_file("data/geojson/populated_places_polygons.geojson")

fig, ax = plt.subplots(figsize=(12, 8))
boundaries.plot(ax=ax, color="lightblue", edgecolor="black", alpha=0.6)
places.plot(ax=ax, color="red", markersize=15)

plt.title("Sudan: Populated Places & Administrative Boundaries")
plt.show()

QGIS Usage

Open QGIS

Go to Layer → Add Layer → Add Vector Layer

Select files from:

data/geojson/


Style, filter, and analyze as needed

Data Specifications
Coordinate Reference System

CRS: WGS 84

EPSG: 4326

Units: Decimal degrees

Precision: Up to 6 decimal places

Data Quality & Source

Source: OpenStreetMap (via HOT Export Tool)

Validation: Geometry + attribute validation

Coverage: Nationwide (Sudan)

Last update: December 2025

Consistency: Unified naming and schema

Field Schema

Detailed descriptions of all attributes are available in:

docs/data-dictionary.md


This includes:

Field names

Data types

Descriptions

Examples

Admin hierarchy references

Contributing

Contributions are welcome and encouraged.

You can help by:

Reporting missing or incorrect locations

Improving boundaries

Adding documentation

Fixing geometry or attributes

Submitting pull requests

How to contribute

Fork the repository

Create a feature branch

Commit your changes

Open a Pull Request

Development Setup
pip install geopandas matplotlib folium


Run validation or examples:

python data/examples/python-example.py

License
Open Database License (ODbL)

This dataset is released under the Open Database License v1.0.

You are free to:

✅ Use commercially or non-commercially

✅ Modify and build upon the data

✅ Redistribute it

Under the conditions:

Attribution is required

Derived databases must use the same license

Attribution
Data © OpenStreetMap contributors
Licensed under the Open Database License (ODbL)
Exported using HOT Export Tool
https://github.com/hotosm/raw-data-api

Changelog
v1.0.0 — 2025-12-02

Initial public release

Populated places (points)

Administrative boundaries (polygons)

Interactive web map example

Python analysis script

Full documentation

Support & Feedback

Have suggestions, issues, or improvements?

➡️ Open an issue
➡️ Submit a pull request
➡️ Share how you used the dataset
