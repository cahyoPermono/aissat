import type { Vessel, Commodity } from './voyages';

export interface Port {
  id: string;
  name: string;
  coordinates: [number, number];
  vessels: Vessel[];
  commodities: Commodity[];
}

export const ports: Port[] = [
  {
    id: 'belitung-island',
    name: 'Belitung Island',
    coordinates: [-2.75, 107.75],
    vessels: [], // Will be populated
    commodities: [] // Will be aggregated
  },
  {
    id: 'qui-nhon',
    name: 'Qui Nhon',
    coordinates: [13.78, 109.23],
    vessels: [],
    commodities: []
  },
  {
    id: 'dongguan',
    name: 'Dongguan',
    coordinates: [23.02, 113.75],
    vessels: [],
    commodities: []
  },
  {
    id: 'bangkok',
    name: 'Bangkok',
    coordinates: [13.75, 100.51],
    vessels: [],
    commodities: []
  },
  {
    id: 'haiphong',
    name: 'Haiphong',
    coordinates: [20.84, 106.68],
    vessels: [],
    commodities: []
  }
];

// Function to populate ports with data from voyageGroups
import { voyageGroups } from './voyages';

(function populatePorts() {
  voyageGroups.forEach(group => {
    group.vessels.forEach(vessel => {
      // Check if vessel is currently at a port (assuming 'from' indicates current location)
      const port = ports.find(p => p.name === vessel.from);
      if (port) {
        port.vessels.push(vessel);
        // Add commodities to port's commodities if not already present
        vessel.commodities.forEach(commodity => {
          if (!port.commodities.find(c => c.id === commodity.id)) {
            port.commodities.push(commodity);
          }
        });
      }
    });
  });
})();
