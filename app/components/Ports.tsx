import React, { useState } from 'react';
import { Link } from 'react-router';
import { ChevronDown, ChevronRight, Search, Plus } from 'lucide-react';
import { ports as allPorts, type Port } from '../data/ports';

export function Ports() {
  const [allPortsData] = useState<Port[]>(allPorts);
  const [expanded, setExpanded] = useState({ ports: new Set<string>(), vessels: new Set<string>() });

  const togglePort = (portId: string) => {
    setExpanded(prev => {
      const newPorts = new Set(prev.ports);
      if (newPorts.has(portId)) {
        newPorts.delete(portId);
      } else {
        newPorts.add(portId);
      }
      return { ...prev, ports: newPorts };
    });
  };

  const toggleVessel = (vesselId: string) => {
    setExpanded(prev => {
      const newVessels = new Set(prev.vessels);
      if (newVessels.has(vesselId)) {
        newVessels.delete(vesselId);
      } else {
        newVessels.add(vesselId);
      }
      return { ...prev, vessels: newVessels };
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full font-sans">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ports</h1>
          <p className="text-sm text-gray-500">Overview of port activities and vessel tracking.</p>
        </div>
        <div className="flex items-center space-x-2">
           <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search ports..."
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
            <Plus size={20} />
            <span>Add Port</span>
          </button>
        </div>
      </header>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-800">
          <thead className="bg-gray-100 text-xs text-gray-600 uppercase font-semibold tracking-wider">
            <tr>
              <th scope="col" className="px-6 py-3">Port / Vessels</th>
              <th scope="col" className="px-6 py-3">Details</th>
              <th scope="col" className="px-6 py-3">Coordinates</th>
              <th scope="col" className="px-6 py-3">Vessels Count</th>
              <th scope="col" className="px-6 py-3"><span className="sr-only">Expand</span></th>
            </tr>
          </thead>
          {allPortsData.map((port) => (
            <tbody key={port.id} className="border-t border-gray-200">
              {/* Level 1: Port */}
              <tr className="bg-gray-50 font-semibold hover:bg-gray-100 cursor-pointer">
                <td className="px-6 py-3">
                   <Link to={`/voyages/${port.id}`} className="text-indigo-600 hover:underline">
                    {port.name}
                  </Link>
                </td>
                <td className="px-6 py-3 text-gray-600">{port.commodities.length} Commodities</td>
                <td className="px-6 py-3 text-gray-600">{port.coordinates.join(', ')}</td>
                <td className="px-6 py-3 text-gray-600">{port.vessels.length} Vessels</td>
                <td className="px-6 py-3 text-right">
                  <button onClick={(e) => { e.stopPropagation(); togglePort(port.id); }} className="p-1 rounded-full hover:bg-gray-200">
                    {expanded.ports.has(port.id) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </button>
                </td>
              </tr>

              {/* Level 2: Commodities */}
              {expanded.ports.has(port.id) && port.commodities.length > 0 && (
                <tr className="bg-white">
                  <td colSpan={5} className="px-6 py-4 pl-12">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <h5 className="text-xs font-semibold text-gray-500 uppercase mb-2">Commodities Currently Active</h5>
                      <table className="w-full text-sm">
                        <tbody>
                        {port.commodities.map((commodity) => (
                          <tr key={commodity.id}>
                            <td className="py-1 text-gray-700">{commodity.name}</td>
                            <td className="py-1 text-gray-700">{commodity.quantity}</td>
                          </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
