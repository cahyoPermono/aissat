import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Ship, Anchor, AlertTriangle, Map, Wifi, Dot, Search, Bell, ChevronsUpDown, ArrowUp, ArrowDown, MoreHorizontal } from 'lucide-react';
import { useIsClient } from '../hooks/useIsClient';
import { LiveMap } from './LiveMap';
import { MapOnly } from './MapOnly';
import type { LatLngExpression } from 'leaflet';

const vesselData = [
  { name: 'MV OCEAN EMERALD', mmsi: 235827000, status: 'In Transit', origin: 'Shanghai', destination: 'Rotterdam', speed: '18.5 kn', eta: '2d 14h', source: 'Satellite' },
  { name: 'MERATUS KARIMUN', mmsi: 353136000, status: 'In Transit', origin: 'Singapore', destination: 'Hamburg', speed: '21.2 kn', eta: '3d 8h', source: 'Terrestrial' },
  { name: 'BOKA WINGER', mmsi: 477825600, status: 'At Port', origin: 'Dubai', destination: 'Dubai', speed: '0.0 kn', eta: 'Docked', source: 'Terrestrial' },
  { name: 'ACX PEARL', mmsi: 477925500, status: 'In Transit', origin: 'Hong Kong', destination: 'Los Angeles', speed: '19.8 kn', eta: '5d 2h', source: 'Satellite' },
  { name: 'ALS CERES', mmsi: 220567000, status: 'Alert', origin: 'Mumbai', destination: 'Jeddah', speed: '15.3 kn', eta: '1d 18h', source: 'Satellite' },
];

const loadingData = [
  { vessel: 'MV OCEAN EMERALD', origin: 'Shanghai', activity: 'Unloading', progress: 75 },
  { vessel: 'MERATUS KARIMUN', origin: 'Singapore', activity: 'Loading', progress: 50 },
  { vessel: 'BOKA WINGER', origin: 'Dubai', activity: 'Unloading', progress: 20 },
  { vessel: 'ACX PEARL', origin: 'Hong Kong', activity: 'Loading', progress: 90 },
  { vessel: 'ALS CERES', origin: 'Mumbai', activity: 'Unloading', progress: 10 },
];

const commodityData = [
  { vessel: 'MV OCEAN EMERALD', commodity: 'Crude Oil', weight: '250,000 DWT', origin: 'Tanjung Priok', destination: 'Singapore - HK' },
  { vessel: 'MERATUS KARIMUN', commodity: 'Containers', weight: '8,000 TEU', origin: 'Tanjung Priok', destination: 'Singapore - HK' },
  { vessel: 'BOKA WINGER', commodity: 'Bulk Cargo', weight: '75,000 DWT', origin: 'Tanjung Priok', destination: 'Singapore - HK' },
  { vessel: 'ACX PEARL', commodity: 'General Cargo', weight: '25,000 DWT', origin: 'Tanjung Priok', destination: 'Singapore - HK' },
  { vessel: 'ALS CERES', commodity: 'Chemicals', weight: '50,000 DWT', origin: 'Tanjung Priok', destination: 'Singapore - HK' },
];

const vesselActivityData = [
    { time: '00:00', value: 150 },
    { time: '02:00', value: 140 },
    { time: '04:00', value: 160 },
    { time: '06:00', value: 170 },
    { time: '08:00', value: 190 },
    { time: '10:00', value: 200 },
    { time: '12:00', value: 210 },
    { time: '14:00', value: 220 },
    { time: '16:00', value: 230 },
    { time: '18:00', value: 225 },
    { time: '20:00', value: 210 },
    { time: '22:00', value: 190 },
];

const portDistributionData = [
    { name: 'Shanghai', value: 18.2 },
    { name: 'Singapore', value: 15.4 },
    { name: 'Rotterdam', value: 13.0 },
    { name: 'Dubai', value: 11.3 },
    { name: 'Los Angeles', value: 10.1 },
    { name: 'Hamburg', value: 8.91 },
    { name: 'Others', value: 23.1 },
];

const COLORS = ['#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE', '#E0E7FF', '#EEF2FF', '#F8FAFC'];

export function Dashboard() {
  const isClient = useIsClient();

  const dashboardShips = [
    { id: 1, name: "Ever Ace", position: [-6.12, 106.89] as LatLngExpression, status: "In Transit" },
    { id: 2, name: "HMM Algeciras", position: [-6.10, 106.90] as LatLngExpression, status: "At Port" },
    { id: 3, name: "MSC Gulsun", position: [-6.09, 106.87] as LatLngExpression, status: "In Transit" },
    { id: 4, name: "CMA CGM Jacques Saadé", position: [-6.11, 106.86] as LatLngExpression, status: "Alert" },
  ];

  return (
    <main className="flex-1 p-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Fleet Overview</h1>
          <p className="text-sm text-gray-500">Real-time vessel tracking and monitoring</p>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search vessels..." className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="text-gray-500" size={24} />
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">System Online</span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard title="Active Vessels" value="247" change="+12%" from="last week" icon={<Ship size={24} className="text-blue-500" />} />
        <StatCard title="In Transit" value="189" change="+8%" from="last week" icon={<Map size={24} className="text-green-500" />} />
        <StatCard title="At Port" value="58" change="No change" from="" icon={<Anchor size={24} className="text-indigo-500" />} />
        <StatCard title="Alerts" value="12" change="+3 critical" from="" icon={<AlertTriangle size={24} className="text-red-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Live Vessel Tracking</h2>
          <p className="text-sm text-gray-500 mb-4">Real-time AIS data visualization</p>
          <div className="h-96 rounded-lg overflow-hidden">
            <MapOnly center={[-6.10, 106.88]} zoom={13} ships={dashboardShips} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">AIS System Status</h2>
          <p className="text-sm text-gray-500 mb-4">Real-time monitoring</p>
          <div className="space-y-4">
            <AISStatus title="Satellite AIS" coverage="Global" vessels="247" updateRate="2-5 min" signal="Excellent" />
            <AISStatus title="Terrestrial AIS" coverage="Coastal" vessels="156" updateRate="10-30 sec" signal="Excellent" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Vessel Activity (24h)</h2>
          <p className="text-sm text-gray-500 mb-4">Hourly tracking data</p>
          <div style={{ height: 300 }}>
            {isClient && (
              <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vesselActivityData}>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Port Distribution</h2>
          <p className="text-sm text-gray-500 mb-4">Current vessel locations</p>
          <div style={{ height: 300 }}>
            {isClient && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={portDistributionData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" label>
                    {portDistributionData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Active Vessels</h2>
            <p className="text-sm text-gray-500">Real-time vessel monitoring</p>
          </div>
          <a href="#" className="text-sm font-medium text-blue-600 hover:underline">View All →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase">
                <th className="py-2">Vessel</th>
                <th className="py-2">MMSI</th>
                <th className="py-2">Status</th>
                <th className="py-2">Origin</th>
                <th className="py-2">Destination</th>
                <th className="py-2">Speed</th>
                <th className="py-2">ETA</th>
                <th className="py-2">AIS Source</th>
              </tr>
            </thead>
            <tbody>
            {vesselData.map((vessel, index) => (
              <tr key={index} className="border-b border-gray-200 text-sm text-gray-700">
                <td className="py-4 flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                        vessel.status === 'In Transit' ? 'bg-blue-100' :
                        vessel.status === 'At Port' ? 'bg-indigo-100' : 'bg-red-100'
                    }`}>
                        <Ship size={16} className={
                            vessel.status === 'In Transit' ? 'text-blue-500' :
                            vessel.status === 'At Port' ? 'text-indigo-500' : 'text-red-500'
                        } />
                    </div>
                    <div>
                        <p className="font-medium">{vessel.name}</p>
                        <p className="text-xs text-gray-500">Container Ship</p>
                    </div>
                </td>
                <td className="py-4">{vessel.mmsi}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    vessel.status === 'In Transit' ? 'bg-green-100 text-green-800' :
                    vessel.status === 'At Port' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>{vessel.status}</span>
                </td>
                <td className="py-4">{vessel.origin}</td>
                <td className="py-4">{vessel.destination}</td>
                <td className="py-4">{vessel.speed}</td>
                <td className="py-4">{vessel.eta}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    vessel.source === 'Satellite' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>{vessel.source}</span>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Loading and Unloading Activities</h2>
            <p className="text-sm text-gray-500">Current port activities</p>
          </div>
          <a href="#" className="text-sm font-medium text-blue-600 hover:underline">View All →</a>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-500 uppercase">
              <th className="py-2">Vessel</th>
              <th className="py-2">Origin Port</th>
              <th className="py-2">Activity</th>
              <th className="py-2">Progress</th>
            </tr>
          </thead>
          <tbody>
            {loadingData.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 text-sm text-gray-700">
                <td className="py-4">{item.vessel}</td>
                <td className="py-4">{item.origin}</td>
                <td className="py-4">{item.activity}</td>
                <td className="py-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${item.progress}%` }}></div>
                  </div>
                  <span className="text-xs text-gray-500">{item.progress}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Commodities</h2>
            <p className="text-sm text-gray-500">Commodity information</p>
          </div>
          <a href="#" className="text-sm font-medium text-blue-600 hover:underline">View All →</a>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-500 uppercase">
              <th className="py-2">Vessel</th>
              <th className="py-2">Commodity</th>
              <th className="py-2">Weight</th>
              <th className="py-2">Origin Port</th>
              <th className="py-2">Destination Port</th>
            </tr>
          </thead>
          <tbody>
            {commodityData.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 text-sm text-gray-700">
                <td className="py-4">{item.vessel}</td>
                <td className="py-4">{item.commodity}</td>
                <td className="py-4">{item.weight}</td>
                <td className="py-4">{item.origin}</td>
                <td className="py-4">{item.destination}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function StatCard({ title, value, change, from, icon }: { title: string; value: string; change: string; from: string; icon: React.ReactNode }) {
  const isPositive = change.startsWith('+');
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        <div className="text-sm text-gray-500 mt-2">
          <span className={isPositive ? 'text-green-500' : 'text-red-500'}>{change}</span>
          {from && <span> from {from}</span>}
        </div>
      </div>
      <div className="bg-gray-100 p-3 rounded-lg">
        {icon}
      </div>
    </div>
  );
}

function AISStatus({ title, coverage, vessels, updateRate, signal }: { title: string; coverage: string; vessels: string; updateRate: string; signal: string; }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          {title.includes('Satellite') ? <Wifi size={16} className="text-blue-500" /> : <Wifi size={16} className="text-purple-500" />}
          <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>
        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">Online</span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <p className="text-gray-500">Coverage</p><p className="text-gray-800 font-medium text-right">{coverage}</p>
        <p className="text-gray-500">Vessels Tracked</p><p className="text-gray-800 font-medium text-right">{vessels}</p>
        <p className="text-gray-500">Update Rate</p><p className="text-gray-800 font-medium text-right">{updateRate}</p>
        <p className="text-gray-500">Signal Quality</p><p className="text-gray-800 font-medium text-right">{signal}</p>
      </div>
    </div>
  );
}
