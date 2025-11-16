import React, { useEffect, useState } from 'react';
import type { LatLngExpression } from 'leaflet';
import { Search, Bell, Wifi, Ship, Map as MapIcon, Anchor, AlertTriangle, Check, X, Plus, Minus, LocateFixed, Maximize, ChevronDown, Info, Star, ArrowRight, Route } from 'lucide-react';

// Define a placeholder component that does nothing.
const Placeholder = () => (
  <div style={{ height: '100%', width: '100%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <p>Loading map...</p>
  </div>
);

export function LiveMap() {
  const [Map, setMap] = useState(() => Placeholder);

  useEffect(() => {
    // This effect runs only on the client
    (async () => {
      // Dynamically import the leaflet CSS
      await import('leaflet/dist/leaflet.css');
      
      // Dynamically import the react-leaflet components
      const { MapContainer, TileLayer, Marker, Popup } = await import('react-leaflet');

      const position: LatLngExpression = [-6.10, 106.88]; // Tanjung Priok Port
      const zoom = 13;
      const ships = [
        { id: 1, name: "Ever Ace", position: [-6.12, 106.89] as LatLngExpression, status: "In Transit" },
        { id: 2, name: "HMM Algeciras", position: [-6.10, 106.90] as LatLngExpression, status: "At Port" },
        { id: 3, name: "MSC Gulsun", position: [-6.09, 106.87] as LatLngExpression, status: "In Transit" },
        { id: 4, name: "CMA CGM Jacques Saadé", position: [-6.11, 106.86] as LatLngExpression, status: "Alert" },
      ];

      // Create a new component on the fly with the loaded components
      const ClientMap = () => (
        <MapContainer center={position} zoom={zoom} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 0 }}>
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
      setMap(() => ClientMap);
    })();
  }, []);

  // The Map state will be the Placeholder on the server and during the initial client render,
  // and will become the ClientMap component after the effect runs.
  return <Map />;
}