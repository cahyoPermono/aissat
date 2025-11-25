import React, { useState } from 'react';
import { Link } from 'react-router';
import { ChevronDown, ChevronRight, Search, Plus } from 'lucide-react';
import { voyageGroups as allVoyageGroups } from '../data/voyages';
import type { VoyageGroup, Vessel } from '../data/voyages';

export function Voyages() {
  const [voyageGroups] = useState<VoyageGroup[]>(allVoyageGroups);
  const [expanded, setExpanded] = useState({ voyages: new Set<string>(), vessels: new Set<string>() });

  const toggleVoyage = (voyageId: string) => {
    setExpanded(prev => {
      const newVoyages = new Set(prev.voyages);
      if (newVoyages.has(voyageId)) {
        newVoyages.delete(voyageId);
      } else {
        newVoyages.add(voyageId);
      }
      return { ...prev, voyages: newVoyages };
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
          <h1 className="text-2xl font-bold text-gray-800">Voyages</h1>
          <p className="text-sm text-gray-500">A comprehensive list of all vessel voyages.</p>
        </div>
        <div className="flex items-center space-x-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search voyages..."
            className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
            <Plus size={20} />
            <span>Add Voyage</span>
          </button>
        </div>
      </header>
      
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-800">
          <thead className="bg-gray-100 text-xs text-gray-600 uppercase font-semibold tracking-wider">
            <tr>
              <th scope="col" className="px-6 py-3">Voyage / Vessel</th>
              <th scope="col" className="px-6 py-3">Details</th>
              <th scope="col" className="px-6 py-3">Date/Range</th>
              <th scope="col" className="px-6 py-3">From</th>
              <th scope="col" className="px-6 py-3">To</th>
              <th scope="col" className="px-6 py-3"><span className="sr-only">Expand</span></th>
            </tr>
          </thead>
          {voyageGroups.map((group) => (
            <tbody key={group.id} className="border-t border-gray-200">
              {/* Level 1: Voyage Group */}
              <tr className="bg-gray-50 font-semibold hover:bg-gray-100 cursor-pointer">
                <td className="px-6 py-3">
                   {/* Navigate to the first vessel in the group for voyage details */}
                   <Link to={`/voyages/${group.vessels && group.vessels.length ? group.vessels[0].id : group.id}`} className="text-indigo-600 hover:underline">
                    {group.name}
                  </Link>
                </td>
                <td className="px-6 py-3 text-gray-600">{group.vesselCount} Vessels</td>
                <td className="px-6 py-3 text-gray-600">{group.dateRange}</td>
                <td colSpan={2}></td>
                <td className="px-6 py-3 text-right">
                  <button onClick={(e) => { e.stopPropagation(); toggleVoyage(group.id); }} className="p-1 rounded-full hover:bg-gray-200">
                    {expanded.voyages.has(group.id) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </button>
                </td>
              </tr>
              
              {/* Level 2: Vessels */}
              {expanded.voyages.has(group.id) && group.vessels.map((vessel) => (
                <React.Fragment key={vessel.id}>
                  <tr className="bg-white hover:bg-gray-50 border-t border-gray-200">
                    <td className="px-6 py-4 pl-12 font-semibold text-gray-800">
                      {vessel.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{vessel.dwt} DWT</td>
                    <td className="px-6 py-4 text-gray-600">{vessel.date}</td>
                    <td className="px-6 py-4 text-gray-600">{vessel.from}</td>
                    <td className="px-6 py-4 text-gray-600">{vessel.to}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => toggleVessel(vessel.id)} className="p-1 rounded-full hover:bg-gray-200">
                        {expanded.vessels.has(vessel.id) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </button>
                    </td>
                  </tr>

                  {/* Level 3: Commodities */}
                  {expanded.vessels.has(vessel.id) && (
                     <tr className="bg-white">
                        <td colSpan={6} className="px-6 py-4 pl-20">
                          <div className="p-4 bg-gray-50 rounded-md">
                            <h5 className="text-xs font-semibold text-gray-500 uppercase mb-2">Commodities</h5>
                            <table className="w-full text-sm">
                                <tbody>
                                {vessel.commodities.map((commodity) => (
                                    <tr key={commodity.id}>
                                        <td className="py-1 text-gray-700 w-1/2">{commodity.name}</td>
                                        <td className="py-1 text-gray-700 w-1/2">{commodity.quantity}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                          </div>
                        </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
