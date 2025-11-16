import React, { useEffect, useState } from 'react';
import type { LatLngExpression } from 'leaflet';
import { Search, Bell, Wifi, Ship, Map as MapIcon, Anchor, AlertTriangle, Check, X, Plus, Minus, LocateFixed, Maximize, ChevronDown, Info, Star, ArrowRight, Route } from 'lucide-react';
import { MapOnly } from './MapOnly'; // Import the new MapOnly component

const recentActivityData = [
  {
    vessel: 'Ever Given',
    action: 'Departed Singapore',
    time: '5 minutes ago',
    icon: Ship,
  },
  {
    vessel: 'COSCO Shipping',
    action: 'Arrived at Hong Kong',
    time: '12 minutes ago',
    icon: Anchor,
  },
  {
    vessel: 'Maersk Viking',
    action: 'Speed deviation alert',
    time: '18 minutes ago',
    icon: AlertTriangle,
  },
];

export function LiveMap() {
  const position: LatLngExpression = [-6.10, 106.88];
  const zoom = 13;
  const ships = [
    { id: 1, name: "Ever Ace", position: [-6.12, 106.89] as LatLngExpression, status: "In Transit" },
    { id: 2, name: "HMM Algeciras", position: [-6.10, 106.90] as LatLngExpression, status: "At Port" },
    { id: 3, name: "MSC Gulsun", position: [-6.09, 106.87] as LatLngExpression, status: "In Transit" },
    { id: 4, name: "CMA CGM Jacques Saadé", position: [-6.11, 106.86] as LatLngExpression, status: "Alert" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* The main content area where the map and sidebars will live */}
      <main className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200 z-20">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Live Tracking Map</h1>
            <p className="text-sm text-gray-500">Real-time vessel positions via AIS</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" placeholder="Search vessels, MMSI, IMO..." className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <Bell className="text-gray-500" size={24} />
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Live</span>
            </div>
          </div>
        </header>

        <div className="flex-1 flex relative overflow-hidden">
          {/* Map Area */}
          <div className="flex-1 h-full">
            <MapOnly center={position} zoom={zoom} ships={ships} /> {/* Use MapOnly here */}
          </div>

          {/* Left Sidebar */}
          <div className="absolute top-4 left-4 z-10 space-y-4 w-72">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2"><MapIcon size={20} /><span>Map Controls</span></h2>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">AIS SOURCE</p>
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-1 rounded-full bg-indigo-500 text-white text-sm"><Wifi size={16} /> <span>Satellite</span></button>
                  <button className="flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm"><Wifi size={16} /> <span>Terrestrial</span></button>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">VESSEL TYPE</p>
                <div className="relative">
                  <select className="w-full pl-3 pr-10 py-2 text-left bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                    <option>All Vessels</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">STATUS FILTER</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between"><label className="flex items-center space-x-2 text-sm text-gray-700"><input type="checkbox" className="form-checkbox text-indigo-600" defaultChecked /><span>In Transit</span></label><span className="text-sm text-gray-500">189</span></div>
                  <div className="flex items-center justify-between"><label className="flex items-center space-x-2 text-sm text-gray-700"><input type="checkbox" className="form-checkbox text-indigo-600" defaultChecked /><span>At Port</span></label><span className="text-sm text-gray-500">58</span></div>
                  <div className="flex items-center justify-between"><label className="flex items-center space-x-2 text-sm text-gray-700"><input type="checkbox" className="form-checkbox text-indigo-600" defaultChecked /><span>Alerts</span></label><span className="text-sm text-red-500">12</span></div>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2"><Info size={20} /><span>Legend</span></h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between"><span><span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>In Transit</span><span>189</span></div>
                <div className="flex items-center justify-between"><span><span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>At Port</span><span>58</span></div>
                <div className="flex items-center justify-between"><span><span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>Alert Status</span><span className="text-red-500">12</span></div>
                <div className="flex items-center justify-between"><span><span className="inline-block w-3 h-3 rounded-full bg-purple-500 mr-2"></span>Major Ports</span></div>
                <div className="flex items-center justify-between"><span><span className="inline-block w-3 h-3 rounded-full border border-gray-400 mr-2"></span>Shipping Routes</span></div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-around text-center">
                <div><p className="text-sm text-gray-500">Active Now</p><p className="text-2xl font-bold text-gray-800">247</p></div>
                <div><p className="text-sm text-gray-500">Tracked 24h</p><p className="text-2xl font-bold text-gray-800">1,842</p></div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="absolute top-4 right-4 z-10 w-80 bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2"><Ship size={20} className="text-indigo-500" /><div><p className="font-semibold text-gray-800">MSC Gülsün</p><p className="text-xs text-gray-500">Container Ship</p></div></div>
              <X size={20} className="text-gray-400 cursor-pointer" />
            </div>
            <div className="mb-4"><span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">In Transit</span></div>
            <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
              <p className="text-gray-500">MMSI</p><p className="text-gray-800 font-medium text-right">235827000</p>
              <p className="text-gray-500">IMO</p><p className="text-gray-800 font-medium text-right">9839668</p>
              <p className="text-gray-500">Speed</p><p className="text-gray-800 font-medium text-right">18.5 knots</p>
              <p className="text-gray-500">Heading</p><p className="text-gray-800 font-medium text-right">285° (WNW)</p>
              <p className="text-gray-500">AIS Source</p><p className="text-gray-800 font-medium text-right flex items-center justify-end space-x-1"><Wifi size={16} className="text-indigo-500" /> <span>Satellite</span></p>
            </div>
            <div className="flex justify-between items-center text-sm mb-4"><div className="text-center"><p className="text-gray-500">Origin</p><p className="font-medium text-gray-800">Shanghai</p><p className="text-xs text-gray-500">China</p></div><ArrowRight size={20} className="text-gray-400" /><div className="text-center"><p className="text-gray-500">Destination</p><p className="font-medium text-gray-800">Rotterdam</p><p className="text-xs text-gray-500">Netherlands</p></div></div>
            <div className="mb-4"><p className="text-sm text-gray-500">ETA</p><p className="font-medium text-gray-800">2d 14h</p><div className="w-full bg-gray-200 rounded-full h-2 mt-1"><div className="bg-indigo-600 h-2 rounded-full" style={{ width: '65%' }}></div></div><p className="text-xs text-gray-500 mt-1">65% completed</p></div>
            <div className="flex space-x-2"><button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold"><Route size={20} /> <span>View Route</span></button><button className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700"><Star size={20} /></button></div>
            <div className="mt-6"><h3 className="font-semibold text-gray-800 mb-3">Recent Activity</h3><div className="space-y-3">{recentActivityData.map((activity, index) => (<div key={index} className="flex items-start space-x-3"><div className="bg-gray-100 p-2 rounded-full"><activity.icon size={16} className="text-gray-500" /></div><div><p className="text-sm font-medium text-gray-800">{activity.action}</p><p className="text-xs text-gray-500">{activity.vessel}</p></div><p className="text-xs text-gray-400 ml-auto">{activity.time}</p></div>))}</div></div>
          </div>

          {/* Bottom Map Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
            <button className="p-2 rounded-lg bg-white shadow-md"><Plus size={20} /></button>
            <button className="p-2 rounded-lg bg-white shadow-md"><Minus size={20} /></button>
            <button className="p-2 rounded-lg bg-white shadow-md"><LocateFixed size={20} /></button>
            <button className="p-2 rounded-lg bg-white shadow-md"><Maximize size={20} /></button>
          </div>
        </div>
      </main>
    </div>
  );
}