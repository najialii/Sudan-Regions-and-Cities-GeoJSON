#!/usr/bin/env python3
"""
Sudan Geographic Data - Python Example
Simple script to load and analyze the GeoJSON data
"""

import geopandas as gpd
import pandas as pd
from pathlib import Path

def load_sudan_data():
    """Load the Sudan geographic datasets"""
    data_dir = Path(__file__).parent.parent / 'geojson'
    
    # Load points and polygons
    points = gpd.read_file(data_dir / 'populated_places_points.geojson')
    polygons = gpd.read_file(data_dir / 'populated_places_polygons.geojson')
    
    return points, polygons

def analyze_data(points, polygons):
    """Basic analysis of the datasets"""
    print("=== Sudan Geographic Data Analysis ===\n")
    
    # Points analysis
    print(f"📍 Populated Places: {len(points):,}")
    if 'place' in points.columns:
        place_counts = points['place'].value_counts()
        print("   By type:")
        for place_type, count in place_counts.items():
            print(f"   - {place_type}: {count:,}")
    
    print(f"\n🗺️  Administrative Boundaries: {len(polygons):,}")
    if 'admin_level' in polygons.columns:
        admin_counts = polygons['admin_level'].value_counts().sort_index()
        print("   By admin level:")
        for level, count in admin_counts.items():
            print(f"   - Level {level}: {count:,}")
    
    # Coordinate bounds
    bounds = points.total_bounds
    print(f"\n📐 Geographic Extent:")
    print(f"   West: {bounds[0]:.4f}°")
    print(f"   South: {bounds[1]:.4f}°") 
    print(f"   East: {bounds[2]:.4f}°")
    print(f"   North: {bounds[3]:.4f}°")

def export_to_csv(points, polygons):
    """Export data to CSV format"""
    csv_dir = Path(__file__).parent.parent / 'csv'
    csv_dir.mkdir(exist_ok=True)
    
    # Export points (drop geometry for CSV)
    points_df = points.drop('geometry', axis=1)
    points_df['longitude'] = points.geometry.x
    points_df['latitude'] = points.geometry.y
    points_df.to_csv(csv_dir / 'populated_places_points.csv', index=False)
    
    # Export polygons (just attributes)
    polygons_df = polygons.drop('geometry', axis=1)
    polygons_df.to_csv(csv_dir / 'populated_places_polygons.csv', index=False)
    
    print(f"\n💾 CSV files exported to: {csv_dir}")

if __name__ == "__main__":
    try:
        # Load data
        points, polygons = load_sudan_data()
        
        # Analyze
        analyze_data(points, polygons)
        
        # Export to CSV
        export_to_csv(points, polygons)
        
    except Exception as e:
        print(f"Error: {e}")
        print("Make sure you have geopandas installed: pip install geopandas")