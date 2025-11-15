import React, { useState } from 'react';
import { Ship, Map, Clock, AlertTriangle, Search, MoreHorizontal, ChevronDown, Eye, Anchor, MapPin } from 'lucide-react';
import { Modal } from './Modal';

const fleetData = [
  {
    name: 'TANTO KASIH',
    mmsi: 235827000,
    type: 'Container Ship',
    status: 'In Transit',
    location: 'Java Sea',
    speed: '18.5 kts',
    aisSource: 'Satellite',
    lastUpdate: '2 min ago',
    route: ['Singapore Port', 'Tanjung Priok', 'Shanghai Port', 'Rotterdam Port'],
  },
  {
    name: 'HF LUCKY',
    mmsi: 353136000,
    type: 'Container Ship',
    status: 'At Port',
    location: 'Tanjung Priok',
    speed: '0.0 kts',
    aisSource: 'Terrestrial',
    lastUpdate: '5 min ago',
    route: ['Surabaya Port', 'Tanjung Priok', 'Singapore Port'],
  },
  {
    name: 'DM 399',
    mmsi: 219018000,
    type: 'Deck Barge',
    status: 'Anchored',
    location: 'Tanjung Priok',
    speed: '0.2 kts',
    aisSource: 'Terrestrial',
    lastUpdate: '1 min ago',
    route: ['Batam Port', 'Tanjung Priok'],
  },
  {
    name: 'IPCM ABIMANYU V',
    mmsi: 477992900,
    type: 'Tug Boat',
    status: 'In Transit',
    location: 'Sunda Strait',
    speed: '16.8 kts',
    aisSource: 'Terrestrial',
    lastUpdate: '3 min ago',
    route: ['Merak Port', 'Tanjung Priok', 'Bakamla Port'],
  },
  {
    name: 'CMA CGM Antoine',
    mmsi: 228339600,
    type: 'Cargo Ship',
    status: 'Anchored',
    location: 'Port of Rotterdam',
    speed: '0.2 kts',
    aisSource: 'Terrestrial',
    lastUpdate: '7 min ago',
    route: ['Shanghai Port', 'Tanjung Priok', 'Port of Rotterdam'],
  },
];

type Vessel = typeof fleetData[0];

export function Fleet() {
  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);

  return (
    <>
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Fleet Management</h1>
            <p className="text-sm text-gray-500">Monitor and track your vessel fleet in real-time</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" placeholder="Search vessels, MMSI, IMO..." className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
              + Add Vessel
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard title="Total Vessels" value="247" change="+12 this month" icon={<Ship size={24} className="text-blue-500" />} />
          <StatCard title="In Transit" value="189" change="76% of fleet" icon={<Map size={24} className="text-green-500" />} />
          <StatCard title="At Port" value="46" change="19% of fleet" icon={<Anchor size={24} className="text-indigo-500" />} />
          <StatCard title="Alerts" value="12" change="Require attention" icon={<AlertTriangle size={24} className="text-red-500" />} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Fleet Filters</h2>
              <button className="text-sm font-medium text-blue-600 hover:underline">Reset All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <FilterDropdown label="Vessel Type" options={['All Types', 'Container Ship', 'Tanker', 'Cargo Ship']} />
              <FilterDropdown label="Status" options={['All Status', 'In Transit', 'At Port', 'Alert', 'Anchored']} />
              <FilterDropdown label="AIS Source" options={['All Sources', 'Satellite', 'Terrestrial']} />
              <FilterDropdown label="Flag State" options={['All Countries']} />
              <FilterDropdown label="Size Range" options={['All Sizes']} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Fleet Overview</h2>
              {/* Add List, Grid, Export buttons here */}
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase">
                <th className="py-2">Vessel</th>
                <th className="py-2">Type</th>
                <th className="py-2">Status</th>
                <th className="py-2">Location</th>
                <th className="py-2">Speed</th>
                <th className="py-2">AIS Source</th>
                <th className="py-2">Last Update</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fleetData.map((vessel, index) => (
                <tr key={index} className="border-b border-gray-200 text-sm text-gray-700">
                  <td className="py-4">
                      <p className="font-medium">{vessel.name}</p>
                      <p className="text-xs text-gray-500">MMSI: {vessel.mmsi}</p>
                  </td>
                  <td className="py-4">{vessel.type}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      vessel.status === 'In Transit' ? 'bg-green-100 text-green-800' :
                      vessel.status === 'At Port' ? 'bg-blue-100 text-blue-800' :
                      vessel.status === 'Alert' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>{vessel.status}</span>
                  </td>
                  <td className="py-4">{vessel.location}</td>
                  <td className="py-4">{vessel.speed}</td>
                  <td className="py-4">{vessel.aisSource}</td>
                  <td className="py-4">{vessel.lastUpdate}</td>
                  <td className="py-4">
                      <div className="flex items-center space-x-2">
                          <button onClick={() => setSelectedVessel(vessel)} className="text-gray-500 hover:text-gray-700"><Eye size={16} /></button>
                          <button className="text-gray-500 hover:text-gray-700"><MoreHorizontal size={16} /></button>
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-600">Showing 1 to 5 of 247 vessels</p>
              <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Previous</button>
                  <button className="px-3 py-1 border border-blue-500 bg-blue-500 text-white rounded-md text-sm">1</button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">2</button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">3</button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Next</button>
              </div>
          </div>
        </div>
      </main>
      <Modal isOpen={!!selectedVessel} onClose={() => setSelectedVessel(null)} title={`Vessel Tracking: ${selectedVessel?.name}`}>
        {selectedVessel && (
          <div className="p-2">
            <div className="flow-root">
              <ul className="-mb-8">
                {selectedVessel.route.map((port, index) => {
                  const isLast = index === selectedVessel.route.length - 1;
                  const isCurrent = selectedVessel.location === port;
                  const isCompleted = selectedVessel.route.indexOf(selectedVessel.location) > index;

                  return (
                    <li key={index}>
                      <div className="relative pb-8">
                        {!isLast ? (
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                              isCurrent ? 'bg-blue-500' : isCompleted ? 'bg-green-500' : 'bg-gray-400'
                            }`}>
                              <MapPin className="h-5 w-5 text-white" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">{port}</p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time>{isCurrent ? 'Current' : isCompleted ? 'Departed' : 'Upcoming'}</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </>
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
