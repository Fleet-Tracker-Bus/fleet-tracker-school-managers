import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Define TypeScript interfaces
interface LiveMapProps {
  center: { lat: number; lng: number };
  zoom: number;
}

interface Stop {
  student_id: number;
  student_name: string;
  location: [number, number];
  distance_from_previous: number;
  requires_walk: boolean;
  walking_distance: number;
}

interface Route {
  driver_id: number;
  driver_name: string;
  zone_index: number;
  total_students: number;
  total_distance_km: number;
  estimated_time_mins: number;
  estimated_fuel: number;
  stops: Stop[];
  final_destination: {
    latitude: number;
    longitude: number;
    distance_from_last_stop: number;
  };
}

const LiveMapBox: React.FC<LiveMapProps> = ({ center, zoom }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [activeRouteId, setActiveRouteId] = useState<number | null>(null);
  const [studentsRequiringWalk, setStudentsRequiringWalk] = useState<Stop[]>([]);
  const [allStudentLocations, setAllStudentLocations] = useState<[number, number][]>([]);

  // Initialize the map
  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOXPUBLICKEY;

    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const mapInstance = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [center.lng, center.lat],
        zoom,
      });

      mapInstanceRef.current = mapInstance;

      // Fetch and display routes after the map is loaded
      mapInstance.on('load', () => {
        fetchRoutesData();
      });

      // Cleanup the map instance on unmount
      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    }
  }, [center, zoom]);

  // Fetch route data from the API
  const fetchRoutesData = async () => {
    try {
      const response = await fetch('http://localhost:9999/api/routes/generate');
      const data = await response.json();
      console.log('API Response:', data); // Log the API response for debugging

      if (!data.success || !Array.isArray(data.data)) {
        console.error('Invalid route data format:', data);
        throw new Error('Invalid route data format');
      }

      const allStudentsRequiringWalk: Stop[] = [];
      const allStudentLocations: [number, number][] = [];

      const validRoutes = data.data.map((route: Route) => {
        const validStops = route.stops;
        const studentsWalking = route.stops.filter((stop) => stop.requires_walk);

        allStudentsRequiringWalk.push(...studentsWalking);
        route.stops.forEach((stop) => allStudentLocations.push(stop.location));

        return {
          ...route,
          stops: validStops,
        };
      });

      setRoutes(validRoutes);
      setStudentsRequiringWalk(allStudentsRequiringWalk);
      setAllStudentLocations(allStudentLocations);

      // Define bounds to fit all markers
      let bounds = new mapboxgl.LngLatBounds();

      // Add markers for all student home locations
      allStudentLocations.forEach((location) => {
        addStudentHomeMarker(location);
        bounds.extend(location); // Extend bounds for each student home
      });

      // Add route-specific markers and lines
      validRoutes.forEach((route: Route, index: number) => {
        const stops = route.stops.map((stop) => stop.location);
        const finalDestination: [number, number] = [
          route.final_destination.longitude,
          route.final_destination.latitude,
        ];

        const routeColor = getRouteColor(index);

        // Add driver marker
        addDriverMarker(stops[0], routeColor);

        // Add markers for each stop
        route.stops.forEach((stop, stopIndex) => {
          if (
            Array.isArray(stop.location) &&
            stop.location.length === 2 &&
            !isNaN(stop.location[0]) &&
            !isNaN(stop.location[1])
          ) {
            addStopMarker(stop.location, `${stopIndex + 1}`, routeColor, stop.requires_walk, stop.student_name);
            bounds.extend(stop.location); // Extend bounds for each stop
          } else {
            console.error('Invalid coordinates for stop:', stop);
          }
        });

        // Add final destination marker
        addStopMarker(finalDestination, 'School', routeColor, false, 'School');
        bounds.extend(finalDestination); // Extend bounds for the final destination

        // Draw the route line
        fetchRouteDirections(stops, finalDestination, index, routeColor);
      });

      // Fit the map to the bounds of all markers
      mapInstanceRef.current?.fitBounds(bounds, {
        padding: 20,
        maxZoom: 15,
      });
    } catch (error) {
      console.error('Error fetching routes:', error);
      alert(`Failed to fetch routes: ${error.message}`);
    }
  };

  // Fetch route directions from Mapbox API
  const fetchRouteDirections = async (
    stops: [number, number][],
    finalDestination: [number, number],
    routeIndex: number,
    routeColor: string
  ) => {
    const coordinates = stops.concat([finalDestination]);
    const coordinatesString = coordinates
      .map((coord) => `${coord[0]},${coord[1]}`)
      .join(';');

    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinatesString}?geometries=geojson&steps=true&access_token=${mapboxgl.accessToken}`;

    try {
      const response = await fetch(directionsUrl);
      const data = await response.json();

      if (!data.routes || data.routes.length === 0) {
        console.error('No routes found:', data);
        return;
      }

      const route = data.routes[0].geometry.coordinates;

      // Add the route line to the map
      mapInstanceRef.current?.addSource(`route-${routeIndex}`, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: route,
          },
        properties: {} // ✅ required

        },
      });

      mapInstanceRef.current?.addLayer({
        id: `route-layer-${routeIndex}`,
        type: 'line',
        source: `route-${routeIndex}`,
        paint: {
          'line-color': routeColor,
          'line-width': 4,
        },
      });
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  // Get a unique color for each route
  const getRouteColor = (index: number) => {
    const colors = ['#FF0000', '#0000FF', '#00FF00', '#FF00FF', '#00FFFF'];
    return colors[index % colors.length];
  };

  // Add a driver marker to the map
  const addDriverMarker = (coordinates: [number, number], color: string) => {
    const markerElement = document.createElement('div');
    markerElement.style.backgroundColor = color;
    markerElement.style.borderRadius = '50%';
    markerElement.style.width = '30px';
    markerElement.style.height = '30px';
    markerElement.style.display = 'flex';
    markerElement.style.alignItems = 'center';
    markerElement.style.justifyContent = 'center';
    markerElement.style.color = 'white';
    markerElement.style.fontSize = '14px';
    markerElement.textContent = ''; // No text for the driver marker

    new mapboxgl.Marker(markerElement)
      .setLngLat(coordinates)
      .addTo(mapInstanceRef.current!);
  };

  // Add a stop marker to the map
  const addStopMarker = (
    coordinates: [number, number],
    label: string,
    color: string,
    requiresWalk: boolean,
    studentName: string
  ) => {
    const markerElement = document.createElement('div');
    markerElement.style.backgroundColor = color;
    markerElement.style.borderRadius = '50%';
    markerElement.style.width = '20px';
    markerElement.style.height = '20px';
    markerElement.style.display = 'flex';
    markerElement.style.alignItems = 'center';
    markerElement.style.justifyContent = 'center';
    markerElement.style.color = 'white';
    markerElement.style.fontSize = '12px';
    markerElement.style.zIndex = 10; // Ensure markers are on top
    markerElement.textContent = label;

    // Add a border to indicate if the student needs to walk
    if (requiresWalk) {
      markerElement.style.border = '2px solid black';
    }

    // Add a popup with the student's name and stop number
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(
      `Stop ${label}: ${studentName}`
    );

    new mapboxgl.Marker(markerElement)
      .setLngLat(coordinates)
      .setPopup(popup) // Add popup to the marker
      .addTo(mapInstanceRef.current!);
  };

  // Add a marker for a student's home location
  const addStudentHomeMarker = (coordinates: [number, number]) => {
    const markerElement = document.createElement('div');
    markerElement.style.backgroundColor = '#888'; // Gray color for student homes
    markerElement.style.borderRadius = '50%';
    markerElement.style.width = '15px';
    markerElement.style.height = '15px';
    markerElement.style.display = 'flex';
    markerElement.style.alignItems = 'center';
    markerElement.style.justifyContent = 'center';
    markerElement.style.color = 'white';
    markerElement.style.fontSize = '10px';
    markerElement.style.zIndex = 5; // Ensure markers are below route markers

    new mapboxgl.Marker(markerElement)
      .setLngLat(coordinates)
      .addTo(mapInstanceRef.current!);
  };

  // Handle route click to show/hide routes
  const handleRouteClick = (routeIndex: number) => {
    setActiveRouteId(routeIndex);
    routes.forEach((_, index) => {
      const layer = mapInstanceRef.current?.getLayer(`route-layer-${index}`);
      if (layer) {
        mapInstanceRef.current?.setLayoutProperty(
          `route-layer-${index}`,
          'visibility',
          index === routeIndex ? 'visible' : 'none'
        );
      }
    });
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Sidebar for routes */}
      <div
        style={{
          width: '300px',
          overflowY: 'auto',
          padding: '10px',
          borderRight: '1px solid #ddd',
          backgroundColor: '#f8f8f8',
        }}
      >
        <h3>Routes</h3>
        {routes.map((route, index) => (
          <div
            key={index}
            style={{
              marginBottom: '10px',
              cursor: 'pointer',
              padding: '10px',
              backgroundColor: activeRouteId === index ? '#ddd' : '#fff',
              borderRadius: '5px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              color: 'black',
            }}
            onClick={() => handleRouteClick(index)}
          >
            <p>
              <strong>Driver:</strong> {route.driver_name}
            </p>
            <p>
              <strong>Time:</strong> {route.estimated_time_mins} mins
            </p>
            <p>
              <strong>Fuel:</strong> {route.estimated_fuel.toFixed(2)} L
            </p>
            <p>
              <strong>Distance:</strong> {route.total_distance_km.toFixed(2)} km
            </p>
            <p>
              <strong>Stops:</strong>
              <ul>
                {route.stops.map((stop, stopIndex) => (
                  <li key={stopIndex}>
                    Stop {stopIndex + 1}: {stop.student_name} - {stop.requires_walk ? 'Requires Walk' : 'Right Side'}
                  </li>
                ))}
              </ul>
            </p>
          </div>
        ))}

        {/* Display students requiring walk */}
        {studentsRequiringWalk.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h3>Students Requiring Walk</h3>
            <ul>
              {studentsRequiringWalk.map((student, index) => (
                <li key={index} style={{ color: 'red' }}>
                  {student.student_name} - Walking Distance: {student.walking_distance.toFixed(2)} m
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Map container */}
      <div ref={mapContainerRef} style={{ flex: 1, height: '100%' }} />
    </div>
  );
};

export default LiveMapBox;
