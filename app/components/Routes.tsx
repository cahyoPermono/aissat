import React from 'react';
import { Ship, Map, Clock, AlertTriangle, Search, MoreHorizontal, ChevronDown } from 'lucide-react';

const routeData = [
  {
    name: 'Asia-Europe Route',
    id: 'RT-2401',
    status: 'Active',
    ports: ['Shanghai Port', 'Tanjung Perak', 'Singapore Port', 'Rotterdam Port'],
    departure: 'Jan 15, 2024',
    eta: 'Feb 2, 2024',
    distance: '10,847 NM',
    duration: '18 days',
    progress: 67,
    source: 'Satellite',
    sourceUpdate: '3 min ago',
  },
  {
    name: 'Trans-Pacific Route',
    id: 'RT-2398',
    status: 'Active',
    ports: ['Los Angeles Port', 'Tanjung Perak', 'Singapore Port'],
    departure: 'Jan 18, 2024',
    eta: 'Feb 1, 2024',
    distance: '7,245 NM',
    duration: '14 days',
    progress: 42,
    source: 'Terrestrial',
    sourceUpdate: '5 min ago',
  },
  {
    name: 'Mediterranean Route',
    id: 'RT-2405',
    status: 'Delayed',
    ports: ['Piraeus Port', 'Tanjung Perak', 'Genoa Port'],
    departure: 'Jan 12, 2024',
    eta: 'Jan 25, 2024',
    distance: '1,245 NM',
    duration: '5 days',
    progress: 81,
    source: 'Satellite',
    sourceUpdate: '1 min ago',
  },
];

export function Routes() {
  return (
    <main className="flex-1 p-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Route Management</h1>
          <p className="text-sm text-gray-500">Plan, monitor and optimize vessel routes in real-time</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search routes, ports, vessels..." className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
            + Create Route
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard title="Active Routes" value="142" change="+8 this week" icon={<Map size={24} className="text-blue-500" />} />
        <StatCard title="Avg. Distance" value="3,847" change="nautical miles" icon={<Ship size={24} className="text-green-500" />} />
        <StatCard title="Avg. Duration" value="12.4" change="days per route" icon={<Clock size={24} className="text-indigo-500" />} />
        <StatCard title="Delays" value="7" change="Need attention" icon={<AlertTriangle size={24} className="text-red-500" />} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Route Filters</h2>
            <button className="text-sm font-medium text-blue-600 hover:underline">Reset All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <FilterDropdown label="Route Status" options={['All Status', 'Active', 'Completed', 'Delayed']} />
            <FilterDropdown label="Origin Port" options={['All Ports', 'Shanghai', 'Los Angeles', 'Piraeus']} />
            <FilterDropdown label="Destination" options={['All Ports', 'Rotterdam', 'Singapore', 'Genoa']} />
            <FilterDropdown label="Distance Range" options={['All Distances']} />
            <FilterDropdown label="Time Period" options={['Last 7 Days', 'Last 30 Days', 'Last 90 Days']} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {routeData.map((route, index) => (
          <RouteCard key={index} route={route} />
        ))}
      </div>
    </main>
  );
}

function StatCard({ title, value, change, icon }: { title: string; value: string; change: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        <p className="text-sm text-gray-500 mt-2">{change}</p>
      </div>
      <div className="bg-gray-100 p-3 rounded-lg">
        {icon}
      </div>
    </div>
  );
}

function FilterDropdown({ label, options }: { label: string; options: string[] }) {
    return (
        <div>
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <div className="relative mt-1">
                <select className="w-full pl-3 pr-10 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    {options.map(option => <option key={option}>{option}</option>)}
                </select>
            </div>
        </div>
    );
}

function RouteCard({ route }: { route: typeof routeData[0] }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-gray-800">{route.name}</h3>
                    <p className="text-sm text-gray-500">Route ID: {route.id}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    route.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>{route.status}</span>
            </div>

            <div className="flex items-center space-x-4 mb-4">
                <div className="flex-shrink-0">
                    <div className="h-full flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                        <div className="w-px h-16 bg-gray-300 my-1"></div>
                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    </div>
                </div>
                <div className="w-full">
                    <div>
                        <p className="font-semibold text-gray-800">{route.ports[0]}</p>
                        <p className="text-sm text-gray-500">Departed: {route.departure}</p>
                    </div>
                    <div className="mt-8">
                        <p className="font-semibold text-gray-800">{route.ports[route.ports.length - 1]}</p>
                        <p className="text-sm text-gray-500">ETA: {route.eta}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div>
                    <p className="text-sm text-gray-500">Distance</p>
                    <p className="font-semibold text-gray-800">{route.distance}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-800">{route.duration}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Progress</p>
                    <p className="font-semibold text-gray-800">{route.progress}%</p>
                </div>
            </div>

            <div className="flex justify-between items-center text-sm">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    route.source === 'Satellite' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                }`}>{route.source}</span>
                <span className="text-gray-500">Updated {route.sourceUpdate}</span>
                <a href="#" className="font-bold text-blue-600 hover:underline">View Details →</a>
            </div>
        </div>
    );
}
