import React, { useEffect, useState } from 'react';
import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';

interface VoyageMapProps {
  from: [number, number];
  to: [number, number];
  fromName: string;
  toName: string;
}

const MapPlaceholder = () => (
  <div style={{ height: '100%', width: '100%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
    <p style={{color: '#334155'}}>Loading map...</p>
  </div>
);

// Create ship icon from PNG
const createShipIcon = () => {
  return L.icon({
    iconUrl: '/cargo_ship.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

export function VoyageMap({ from, to, fromName, toName }: VoyageMapProps) {
  const [MapComponent, setMapComponent] = useState(() => MapPlaceholder);

  useEffect(() => {
    (async () => {
      await import('leaflet/dist/leaflet.css');
      const { MapContainer, TileLayer, Marker, Popup, Polyline } = await import('react-leaflet');

      const ClientMap = () => {
        return (
            <MapContainer center={from} zoom={8} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 0, borderRadius: '8px' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <Marker position={from} icon={createShipIcon()}>
              <Popup>{`Departure: ${fromName}`}</Popup>
            </Marker>
            <Marker position={to} icon={createShipIcon()}>
              <Popup>{`Arrival: ${toName}`}</Popup>
            </Marker>
            <Polyline positions={[from, to]} color="#2b6ef6" />
          </MapContainer>
        );
      };

      setMapComponent(() => ClientMap);
    })();
  }, [from, to, fromName, toName]);

  return <MapComponent />;
}
