import React, { useState, useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface LiveMapProps {
  center: { lat: number; lng: number };
  zoom: number;
  onLocationSelect?: (location: { lat: number; lng: number }) => void;
  initialMarker?: { lat: number; lng: number } | null;
  showTracking: boolean;
}

const LiveMapBox: React.FC<LiveMapProps> = ({ center, zoom, showTracking }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [studentLocation, setStudentLocation] = useState(null)
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOXPUBLICKEY;

    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const mapInstance = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-5.8138, 35.7767],
        zoom,
        attributionControl: false,
      });

      mapInstanceRef.current = mapInstance;

      mapInstance.on('load', () => {
        const WORLD_VIEW = "MA";
        const adminLayers = [
          'admin-0-boundary',
          'admin-1-boundary',
          'admin-0-boundary-disputed',
          'admin-1-boundary-bg',
          'admin-0-boundary-bg',
          'country-label',
        ];

        adminLayers.forEach((adminLayer) => {
          if (mapInstance.getLayer(adminLayer)) {
            mapInstance.setFilter(
              adminLayer,
              ["match", ["get", "worldview"], ["all", WORLD_VIEW], true, false]
            );
          }
        });

        setIsMapLoaded(true);
        mapInstance.resize();
        mapInstance.getCanvas().style.cursor = 'pointer';
        if (showTracking) {
          const fakeRoutes = [
            {
              id: 'route-1',
              path: [
                [-5.8138, 35.7767],
                [-5.8180, 35.7790],
                [-5.8200, 35.7810],
              ],
              color: '#e495ff',
            },
            {
              id: 'route-2',
              path: [
                [-5.8138, 35.7767],
                [-5.8150, 35.7780],
                [-5.8170, 35.7795],
              ],
              color: '#ffa264',
            },
          ];

          const coordinates = fakeRoutes.flatMap(route => route.path);
          const bounds = coordinates.reduce((bounds, coord) => bounds.extend(coord), new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

          mapInstance.fitBounds(bounds, {
            padding: 50,
            maxZoom: 14,
          });

          fakeRoutes.forEach((route) => {
            mapInstance.addSource(route.id, {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: route.path,
                },
              },
            });

            mapInstance.addLayer({
              id: `layer-${route.id}`,
              type: 'line',
              source: route.id,
              layout: {},
              paint: {
                'line-color': route.color,
                'line-width': 3,
              },
            });
          });

          const fakeBuses = [
            { id: 'bus-1', lat: 35.7810, lng: -5.8200 },
            { id: 'bus-2', lat: 35.7795, lng: -5.8170 },
          ];

          const busIconUrl = 'https://cdn-icons-png.flaticon.com/512/5706/5706988.png'; // Replace with your bus icon URL

          fakeBuses.forEach((bus) => {
            const el = document.createElement('div');
            el.style.backgroundImage = `url(${busIconUrl})`;
            el.style.width = '40px';
            el.style.height = '40px';
            el.style.backgroundSize = 'cover';

            new mapboxgl.Marker({ element: el })
              .setLngLat([bus.lng, bus.lat])
              .addTo(mapInstance);
          });
        }

        mapInstance.on('click', (e) => {
          if (showTracking) return;

          if (markerRef.current) {
            markerRef.current.remove();
          }

          const marker = new mapboxgl.Marker();
          marker.setLngLat(e.lngLat).addTo(mapInstance);

          setStudentLocation(marker._lngLat);
          markerRef.current = marker;
        });
      });

      mapInstance.on('error', (e) => {
        console.error('Map loading error:', e);
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}&autocomplete=true&limit=5`
      );

      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = useCallback((suggestion: any) => {
    if (!mapInstanceRef.current) {
      console.warn('Map not initialized');
      return;
    }

    const [lng, lat] = suggestion.center;

    mapInstanceRef.current.flyTo({
      center: [lng, lat],
      zoom: Math.max(mapInstanceRef.current.getZoom(), 16),
    });

    setSearchQuery(suggestion.place_name);
    setSuggestions([]);
  }, []);



  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 1,
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '8px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
          width: '300px',
        }}
      >
        <input
          type="text"
          placeholder="Search for an address"
          value={searchQuery}
          onChange={handleInputChange}
          className='text-sm font-medium'
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            color: 'black'
          }}
        />
        {suggestions.length > 0 && (
          <ul
            style={{
              marginTop: '4px',
              listStyle: 'none',
              padding: 0,
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: 'white',
              maxHeight: '200px',
              overflowY: 'auto',
              color: 'black'
            }}
          >
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className='text-sm font-medium'
                style={{
                  padding: '8px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                }}
              >
                {suggestion.place_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div
        ref={mapContainerRef}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    </div>
  );
};

export default LiveMapBox;