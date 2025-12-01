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
    id: 'tanjung-priuk',
    name: 'Tanjung Priuk',
    coordinates: [-6.0886, 106.8863],
    vessels: [],
    commodities: []
  },
  {
    id: 'tanjung-perak',
    name: 'Tanjung Perak',
    coordinates: [-7.2043, 112.7183],
    vessels: [],
    commodities: []
  },
  {
    id: 'tanjung-mas',
    name: 'Tanjung Mas',
    coordinates: [-6.9275, 110.3631],
    vessels: [],
    commodities: []
  }
];

// Function to populate ports with data from voyageGroups
import { voyageGroups } from './voyages';

(function populatePorts() {
  voyageGroups.forEach(group => {
    group.vessels.forEach(vessel => {
      // Check if vessel is departing from or arriving to a port
      const port = ports.find(p => p.name === vessel.from || p.name === vessel.to);
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
