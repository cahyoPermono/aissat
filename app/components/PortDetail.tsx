import { useParams } from 'react-router';
import { ports } from '../data/ports';
import React, { useEffect, useState } from 'react';
import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';

// Create ship icon from PNG based on vessel type
const createShipIcon = (type?: string) => {
  const mapType = (type || 'other').toString().toLowerCase();
  const icons: Record<string, string> = {
    cargo: '/cargo.png',
    fish: '/fish.png',
    highspeed: '/highspeed.png',
    other: '/other.png',
    passenger: '/passenger.png',
    tanker: '/tanker.png',
    tug: '/tug.png',
  };

  const iconUrl = icons[mapType] || icons.other;

  return L.icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

// Simple map component for port routes
const PortMap = ({ vessels }: { vessels: any[] }) => {
  const [MapComponent, setMapComponent] = useState(() => () => <div>Loading map...</div>);

  useEffect(() => {
    (async () => {
      await import('leaflet/dist/leaflet.css');
      const { MapContainer, TileLayer, Marker, Popup, Polyline } = await import('react-leaflet');

      const ClientMap = () => {
        if (vessels.length === 0) return <div>No routes to display</div>;

        return (
          <MapContainer center={vessels[0]?.coordinates.from || [0,0]} zoom={6} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 0, borderRadius: '8px' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            {vessels.map((vessel, vesselIndex) => {
              // Build complete route: from -> waypoints -> to
              const routePoints = [vessel.coordinates.from];
              if (vessel.waypoints) {
                routePoints.push(...vessel.waypoints);
              }
              routePoints.push(vessel.coordinates.to);

              // Create segments for multi-hop display
              const segments: [number, number][][] = [];
              for (let i = 0; i < routePoints.length - 1; i++) {
                segments.push([routePoints[i], routePoints[i + 1]]);
              }

              return (
                <React.Fragment key={vessel.id}>
                  {/* Markers at all points */}
                  {routePoints.map((point, pointIndex) => {
                    let popupText = '';
                    if (pointIndex === 0) {
                      popupText = `Departure: ${vessel.from}`;
                    } else if (pointIndex === routePoints.length - 1) {
                      popupText = `Final Destination: ${vessel.to}`;
                    } else {
                      popupText = `Hop ${pointIndex}: Intermediate Point`;
                    }

                    return (
                      <Marker key={pointIndex} position={point} icon={createShipIcon((vessel as any).type)}>
                        <Popup>
                          <div>
                            <strong>{vessel.name}</strong><br />
                            {popupText}<br />
                            Hop {pointIndex + 1} of {routePoints.length}
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}

                  {/* Polylines for each segment */}
                  {segments.map((segment, segmentIndex) => (
                    <Polyline
                      key={segmentIndex}
                      positions={segment}
                      color={`hsl(${vesselIndex * 60}, 70%, ${50 + segmentIndex * 10}%)`}
                      weight={4}
                      opacity={0.8}
                    />
                  ))}
                </React.Fragment>
              );
            })}
          </MapContainer>
        );
      };

      setMapComponent(() => ClientMap);
    })();
  }, [vessels]);

  return <MapComponent />;
};

export function PortDetail() {
  const { portId } = useParams<{ portId: string }>();
  const [selectedVessel, setSelectedVessel] = useState<any>(null);

  const port = ports.find(p => p.id === portId);

  if (!port) {
    return <div style={{ padding: 20 }}>Port not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full mr-4"></div>
            <h1 className="text-4xl font-bold text-slate-800">{port.name} Port Operations</h1>
          </div>
          <p className="text-slate-600 text-lg ml-5">Real-time vessel tracking and commodity operations</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 font-medium">Active Vessels</p>
                <p className="text-3xl font-bold text-slate-800">{port.vessels.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚢</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 font-medium">Active Commodities</p>
                <p className="text-3xl font-bold text-slate-800">{port.commodities.length}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 font-medium">Port Status</p>
                <p className="text-lg font-bold text-emerald-600">Operational</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Vessels List */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <span className="mr-2">🚢</span>
                Vessels at Port
              </h2>
            </div>
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              {port.vessels.map((vessel) => (
                <div
                  key={vessel.id}
                  className={`border-2 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedVessel?.id === vessel.id
                      ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50 shadow-lg'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                  onClick={() => setSelectedVessel(vessel)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-xl text-slate-800">{vessel.name}</h3>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedVessel?.id === vessel.id ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {vessel.dwt} DWT
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center">
                      <span className="font-medium w-16">From:</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">{vessel.from}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-16">To:</span>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded">{vessel.to}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-16">Date:</span>
                      <span>{vessel.date}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-sm font-medium text-slate-700 mb-2">Cargo:</p>
                    <div className="flex flex-wrap gap-2">
                      {vessel.commodities.map((comm: any) => (
                        <span key={comm.id} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                          {comm.name}: {comm.quantity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {port.vessels.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  <span className="text-4xl block mb-2">⚓</span>
                  <p>No vessels currently at this port</p>
                </div>
              )}
            </div>
          </div>

          {/* Commodities Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <span className="mr-2">📦</span>
                Active Commodities
              </h2>
            </div>
            <div className="p-6">
              {port.commodities.length > 0 ? (
                <div className="space-y-4">
                  {port.commodities.map((commodity) => (
                    <div key={commodity.id} className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-4 border-l-4 border-blue-500">
                      <h3 className="font-semibold text-lg text-slate-800">{commodity.name}</h3>
                      <p className="text-slate-600 mt-1">
                        <span className="font-medium text-blue-600">{commodity.quantity}</span>
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <span className="text-4xl block mb-2">📦</span>
                  <p>No active commodities at this port</p>
                </div>
              )}
            </div>
          </div>
        </div>


        {/* Vessel Routes & Tracking Map */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <span className="mr-2">🗺️</span>
                Vessel Routes & Tracking
              </h2>
            </div>
            <div style={{ height: '700px' }}>
              <PortMap vessels={port.vessels} />
            </div>
          </div>

          {/* Vessel Detail Panel - Sidebar */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <span className="mr-2">🚢</span>
                Vessel Details
              </h2>
            </div>
            <div className="p-6">
              {selectedVessel ? (
                <div className="space-y-6">
                  {/* Vessel Header */}
                  <div className="text-center pb-4 border-b border-slate-200">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{selectedVessel.name}</h3>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                      {selectedVessel.dwt} DWT General Cargo Ship
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="bg-slate-50 rounded-xl p-4">
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center text-lg">
                        <span className="mr-2">⚓</span>
                        Vessel Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2">
                          <span className="text-slate-600 font-medium">Capacity:</span>
                          <span className="font-bold text-slate-800 text-lg">{selectedVessel.dwt} DWT</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-slate-600 font-medium">Type:</span>
                          <span className="font-semibold text-slate-800">General Cargo Ship</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-slate-600 font-medium">Year Built:</span>
                          <span className="font-semibold text-slate-800">2008</span>
                        </div>
                      </div>
                    </div>

                    {/* Current Status */}
                    <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4">
                      <h4 className="font-semibold text-emerald-800 mb-4 flex items-center text-lg">
                        <span className="mr-2">⚡</span>
                        Current Status
                      </h4>
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="font-bold text-emerald-700 text-lg">At Port - Loading</span>
                      </div>
                      <div className="bg-emerald-100 rounded-lg p-3">
                        <p className="text-emerald-700 font-medium">Arrival Date: {selectedVessel.date}</p>
                        <p className="text-emerald-600 text-sm mt-1">Currently performing cargo operations</p>
                      </div>
                    </div>

                    {/* Route Progress */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                      <h4 className="font-semibold text-blue-800 mb-4 flex items-center text-lg">
                        <span className="mr-2">🗺️</span>
                        Route Progress
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-blue-600 font-medium">Departure Port:</span>
                            <span className="font-bold text-slate-800">{selectedVessel.from}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-blue-600 font-medium">Destination:</span>
                            <span className="font-bold text-slate-800">{selectedVessel.to}</span>
                          </div>
                        </div>

                        {selectedVessel.waypoints && (
                          <div className="bg-amber-50 border border-amber-300 rounded-lg p-3">
                            <div className="flex justify-between items-center">
                              <span className="text-amber-700 font-medium">Intermediate Ports:</span>
                              <span className="font-bold text-amber-800">{selectedVessel.waypoints.length} stops</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Loading Progress */}
                    <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                      <h4 className="font-semibold text-amber-800 mb-4 flex items-center text-lg">
                        <span className="mr-2">📈</span>
                        Loading Operations
                      </h4>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-amber-700 font-medium">Completion Status</span>
                          <span className="text-amber-700 font-bold">65%</span>
                        </div>
                        <div className="w-full bg-amber-200 rounded-full h-3">
                          <div className="bg-amber-500 h-3 rounded-full transition-all duration-500" style={{ width: '65%' }}></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center bg-white rounded-lg p-3">
                          <span className="text-amber-700 font-medium">Time Remaining:</span>
                          <span className="font-bold text-slate-800">8 hours</span>
                        </div>
                        <div className="flex justify-between items-center bg-white rounded-lg p-3">
                          <span className="text-amber-700 font-medium">Estimated Completion:</span>
                          <span className="font-bold text-slate-800">Today 14:30 WIB</span>
                        </div>
                      </div>
                    </div>

                    {/* Commodities */}
                    <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                      <h4 className="font-semibold text-purple-800 mb-4 flex items-center text-lg">
                        <span className="mr-2">📦</span>
                        Cargo Manifest
                      </h4>
                      <div className="space-y-3">
                        {selectedVessel.commodities.map((commodity: any) => (
                          <div key={commodity.id} className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-purple-400">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-semibold text-slate-800 text-lg">{commodity.name}</h5>
                                <p className="text-slate-600 text-sm mt-1">Cargo specification and details</p>
                              </div>
                              <div className="text-right">
                                <span className="text-2xl font-bold text-purple-600">{commodity.quantity}</span>
                                <p className="text-xs text-purple-600 mt-1">metric tons</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mb-4">
                    <span className="text-6xl">🚢</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">Select a Vessel</h3>
                  <p className="text-slate-500">Click on any vessel in the list above to view detailed information</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
