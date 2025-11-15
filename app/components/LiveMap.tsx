import React from 'react';
import { Search, Bell, Wifi, Ship, Map, Anchor, AlertTriangle, Check, X, Plus, Minus, LocateFixed, Maximize, ChevronDown, Info, Star, ArrowRight, Route } from 'lucide-react';

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
  return (
    <main className="flex-1 flex flex-col">
      <header className="flex justify-between items-center p-6 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Live Tracking Map</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search vessels, MMSI, IMO..." className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <Bell className="text-gray-500" size={24} />
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Live</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex relative">
        {/* Map Controls and Legend Sidebar */}
        <div className="absolute top-4 left-4 z-10 space-y-4 w-72">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
              <Map size={20} />
              <span>Map Controls</span>
            </h2>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">AIS SOURCE</p>
              <div className="flex space-x-2">
                <button className="flex items-center space-x-1 px-3 py-1 rounded-full bg-blue-500 text-white text-sm">
                  <Wifi size={16} /> <span>Satellite</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm">
                  <Wifi size={16} /> <span>Terrestrial</span>
                </button>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">VESSEL TYPE</p>
              <div className="relative">
                <select className="w-full pl-3 pr-10 py-2 text-left bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option>All Vessels</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">STATUS FILTER</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm text-gray-700">
                    <input type="checkbox" className="form-checkbox" defaultChecked />
                    <span>In Transit</span>
                  </label>
                  <span className="text-sm text-gray-500">189</span>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm text-gray-700">
                    <input type="checkbox" className="form-checkbox" defaultChecked />
                    <span>At Port</span>
                  </label>
                  <span className="text-sm text-gray-500">58</span>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm text-gray-700">
                    <input type="checkbox" className="form-checkbox" defaultChecked />
                    <span>Alerts</span>
                  </label>
                  <span className="text-sm text-red-500">12</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
              <Info size={20} />
              <span>Legend</span>
            </h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span>In Transit</span>
                <span className="ml-auto text-gray-500">189</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span>At Port</span>
                <span className="ml-auto text-gray-500">58</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span>Alert Status</span>
                <span className="ml-auto text-red-500">12</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span>Major Ports</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <span className="w-3 h-3 rounded-full border border-gray-400"></span>
                <span>Shipping Routes</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-around text-center">
              <div>
                <p className="text-sm text-gray-500">Active Now</p>
                <p className="text-2xl font-bold text-gray-800">247</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tracked 24h</p>
                <p className="text-2xl font-bold text-gray-800">1,842</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 bg-gray-100 grid grid-cols-10 grid-rows-10 gap-px p-px">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="bg-gray-50 border border-gray-100"></div>
          ))}
        </div>

        {/* Vessel Details Sidebar */}
        <div className="absolute top-4 right-4 z-10 w-80 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Ship size={20} className="text-blue-500" />
              <div>
                <p className="font-semibold text-gray-800">MSC Gülsün</p>
                <p className="text-xs text-gray-500">Container Ship</p>
              </div>
            </div>
            <X size={20} className="text-gray-400 cursor-pointer" />
          </div>
          <div className="mb-4">
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">In Transit</span>
          </div>
          <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
            <p className="text-gray-500">MMSI</p><p className="text-gray-800 font-medium text-right">235827000</p>
            <p className="text-gray-500">IMO</p><p className="text-gray-800 font-medium text-right">9839668</p>
            <p className="text-gray-500">Speed</p><p className="text-gray-800 font-medium text-right">18.5 knots</p>
            <p className="text-gray-500">Heading</p><p className="text-gray-800 font-medium text-right">285° (WNW)</p>
            <p className="text-gray-500">AIS Source</p>
            <p className="text-gray-800 font-medium text-right flex items-center justify-end space-x-1">
                <Wifi size={16} className="text-blue-500" /> <span>Satellite</span>
            </p>
          </div>
          <div className="flex justify-between items-center text-sm mb-4">
            <div>
              <p className="text-gray-500">Origin</p>
              <p className="font-medium text-gray-800">Shanghai</p>
              <p className="text-xs text-gray-500">China</p>
            </div>
            <ArrowRight size={20} className="text-gray-400" />
            <div>
              <p className="text-gray-500">Destination</p>
              <p className="font-medium text-gray-800">Rotterdam</p>
              <p className="text-xs text-gray-500">Netherlands</p>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500">ETA</p>
            <p className="font-medium text-gray-800">2d 14h</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">65% completed</p>
          </div>
          <div className="flex space-x-2">
            <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold">
              <Route size={20} /> <span>View Route</span>
            </button>
            <button className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700">
              <Star size={20} />
            </button>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-3">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivityData.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <activity.icon size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{activity.vessel}</p>
                    <p className="text-xs text-gray-500">{activity.action}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
          <button className="p-2 rounded-lg bg-white shadow-md"><Plus size={20} /></button>
          <button className="p-2 rounded-lg bg-white shadow-md"><Minus size={20} /></button>
          <button className="p-2 rounded-lg bg-white shadow-md"><LocateFixed size={20} /></button>
          <button className="p-2 rounded-lg bg-white shadow-md"><Maximize size={20} /></button>
        </div>
      </div>
    </main>
  );
}

function FilterDropdown({ label, options }: { label: string; options: string[] }) {
    return (
        <div>
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <div className="relative mt-1">
                <select className="w-full pl-3 pr-10 py-2 text-left bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    {options.map(option => <option key={option}>{option}</option>)}
                </select>
            </div>
        </div>
    );
}
