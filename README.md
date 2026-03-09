# Sudan Regions, Localities, and Cities

Complete geographic data for Sudan's 19 regions, 189 localities, and 35,573 populated places.

Data collected from OpenStreetMap (OSM) and Humanitarian OpenStreetMap Team (HOT).

## 📊 Data Files

### JSON Files
Located in `json/` folder:

- **[regions.json](json/regions.json)** - 19 regions with IDs, names (EN/AR), codes, coordinates, and area
- **[localities.json](json/localities.json)** - 189 localities with IDs, region IDs, names (EN/AR), codes, coordinates, and area
- **[cities.json](json/cities.json)** - 35,573 cities with IDs, locality IDs, region IDs, names (EN/AR), type, and coordinates

### GeoJSON Files
Located in `geojson/` folder (viewable on GitHub with interactive map):

- **[regions.geojson](geojson/regions.geojson)** - 19 regions with polygon boundaries
- **[localities.geojson](geojson/localities.geojson)** - 189 localities with polygon boundaries
- **[cities.geojson](geojson/cities.geojson)** - 35,573 cities with point coordinates

### MySQL Database
Located in `mysql/` folder:

- **[regions.sql](mysql/regions.sql)** - Regions table
- **[localities.sql](mysql/localities.sql)** - Localities table
- **[cities.sql](mysql/cities.sql)** - Cities table

Import into MySQL:
```bash
mysql -u username -p database_name < mysql/regions.sql
mysql -u username -p database_name < mysql/localities.sql
mysql -u username -p database_name < mysql/cities.sql
```

## 🗂️ Data Structure

### Hierarchy
```
Regions (19)
  └── Localities (189)
        └── Cities (35,573)
```

### Fields

**Regions:**
- `region_id` - Unique identifier
- `name_en` - English name
- `name_ar` - Arabic name
- `code` - Region code (e.g., SD01)
- `center` - [latitude, longitude]
- `area_sqkm` - Area in square kilometers

**Localities:**
- `locality_id` - Unique identifier
- `region_id` - Parent region ID
- `name_en` - English name
- `name_ar` - Arabic name
- `code` - Locality code
- `center` - [latitude, longitude]
- `area_sqkm` - Area in square kilometers

**Cities:**
- `city_id` - Unique identifier
- `locality_id` - Parent locality ID
- `region_id` - Parent region ID
- `name_en` - English name
- `name_ar` - Arabic name
- `type` - Place type (city, town, village, hamlet, etc.)
- `center` - [latitude, longitude]

## 📈 Statistics

- **19** administrative regions (states)
- **189** administrative localities
- **35,573** populated places
- **34,504** cities successfully linked to their localities and regions
- **Total Area**: 1,871,527.57 km²

## 🗺️ Usage Examples

### JavaScript/Node.js
```javascript
const regions = require('./json/regions.json');
const cities = require('./json/cities.json');

// Get all cities in a specific region
const regionId = 8; // Khartoum
const citiesInRegion = cities.filter(city => city.region_id === regionId);
```

### Python
```python
import json

with open('json/cities.json', 'r', encoding='utf-8') as f:
    cities = json.load(f)

# Get all cities in a specific locality
locality_id = 77
cities_in_locality = [c for c in cities if c['locality_id'] == locality_id]
```

### SQL
```sql
-- Get all cities in Khartoum region
SELECT * FROM cities WHERE region_id = 8;

-- Get cities with their locality and region names
SELECT 
    c.city_id,
    c.name_en as city_name,
    l.name_en as locality_name,
    r.name_en as region_name
FROM cities c
LEFT JOIN localities l ON c.locality_id = l.locality_id
LEFT JOIN regions r ON c.region_id = r.region_id;
```

## 📝 License

MIT License - See [LICENSE](LICENSE) file for details

## 🙏 Credits

Data source: OpenStreetMap (OSM) and Humanitarian OpenStreetMap Team (HOT)
