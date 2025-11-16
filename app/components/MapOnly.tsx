import React, { useEffect, useState } from 'react';
import type { LatLngExpression } from 'leaflet';

interface MapOnlyProps {
  center: LatLngExpression;
  zoom: number;
  ships: { id: number; name: string; position: LatLngExpression; status: string }[];
}

// Define a placeholder component that does nothing.
const MapPlaceholder = () => (
  <div style={{ height: '100%', width: '100%', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <p>Loading map...</p>
  </div>
);

export function MapOnly({ center, zoom, ships }: MapOnlyProps) {
  const [MapComponent, setMapComponent] = useState(() => MapPlaceholder);

  useEffect(() => {
    (async () => {
      // Dynamically import the leaflet CSS
      await import('leaflet/dist/leaflet.css');
      
      // Dynamically import the react-leaflet components
      const { MapContainer, TileLayer, Marker, Popup } = await import('react-leaflet');

      // Create a new component on the fly with the loaded components
      const ClientMap = () => (
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 0 }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {ships.map(ship => (
            <Marker key={ship.id} position={ship.position}>
              <Popup>
                <b>{ship.name}</b><br />
                Status: {ship.status}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      );

      // Set the new component to be rendered
      setMapComponent(() => ClientMap);
    })();
  }, [center, zoom, ships]); // Add dependencies to useEffect

  // The MapComponent state will be the Placeholder on the server and during the initial client render,
  // and will become the ClientMap component after the effect runs.
  return <MapComponent />;
}
