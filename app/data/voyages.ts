export interface Commodity {
  id: string;
  name: string;
  quantity: string;
}

export interface Vessel {
  id: string;
  name: string;
  from: string;
  to: string;
  date: string;
  dwt: string;
  duration: string;
  /** optional vessel type used for icon selection (e.g. 'cargo', 'tanker', 'passenger') */
  type?: string;
  commodities: Commodity[];
  coordinates: {
    from: [number, number];
    to: [number, number];
  };
  waypoints?: [number, number][]; // Optional intermediate points for multi-hop routes
}

export interface VoyageGroup {
  id: string;
  name: string;
  vesselCount: number;
  dateRange: string;
  vessels: Vessel[];
}


export const voyageGroups: VoyageGroup[] = [
  {
    id: 'vg-1',
    name: 'Belitung Island Departures - Q1 2024',
    vesselCount: 2,
    dateRange: 'Jan 2024 - Apr 2024',
    vessels: [
      {
        id: 'indonesia-marine-268',
        name: 'INDONESIA MARINE 268',
        type: 'cargo',
        dwt: '2,959',
        date: '23 Jan 24',
        from: 'Belitung Island',
        to: 'Qui Nhon',
        duration: '25',
        commodities: [
          { id: 'c2', name: 'Bauxite', quantity: '1,000 MT' },
        ],
        coordinates: { from: [-2.75, 107.75], to: [13.78, 109.23] },
        waypoints: [
          [2.5, 109.0],   // Northeast through sea
          [8.0, 110.5],   // Continue through sea towards Vietnam
          [13.78, 109.23] // Arrival at Qui Nhon
        ],
      },
      {
        id: 'nusantara-express-18',
        name: 'NUSANTARA EXPRESS 18',
        type: 'cargo',
        dwt: '5,083',
        date: '1 Apr 24',
        from: 'Belitung Island',
        to: 'Dongguan',
        duration: '17',
        commodities: [
          // { id: 'c3', name: 'Coal', quantity: '5,083 MT' },
        ],
        coordinates: { from: [-2.75, 107.75], to: [23.02, 113.75] },
        waypoints: [
          [2.5, 109.0],    // Northeast through sea towards Malaysia
          [8.0, 111.0],    // Continue northeast through South China Sea
          [15.0, 112.0],   // Further northeast towards Dongguan
          [20.0, 113.0],   // Approaching destination
        ],
      },
    ]
  },
  {
    id: 'vg-2',
    name: 'Belitung Island Departures - Q3 2024',
    vesselCount: 2,
    dateRange: 'Sep 2024',
    vessels: [
      {
        id: 'garuda-samudra',
        name: 'GARUDA SAMUDRA',
        type: 'cargo',
        dwt: '4,334',
        date: '6 Sep 24',
        from: 'Belitung Island',
        to: 'Bangkok',
        duration: '12',
        commodities: [
            // { id: 'c4', name: 'Steel Coils', quantity: '3,249 MT' },
        ],
        coordinates: { from: [-2.75, 107.75], to: [13.75, 100.51] },
        waypoints: [
          [2.5, 109.0],    // Northeast through sea
          [8.0, 107.5],    // Continue towards Malacca Strait area
          [12.0, 104.0],   // Through Malacca Strait
          [13.75, 100.51]  // Arrival at Bangkok
        ],
      },
      {
        id: 'pelindo-pioneer-56',
        name: 'PELINDO PIONEER 56',
        type: 'cargo',
        dwt: '2,959',
        date: '11 Sep 24',
        from: 'Belitung Island',
        to: 'Haiphong',
        duration: '36',
        commodities: [
            // { id: 'c5', name: 'Cement', quantity: '2,827 MT' },
        ],
        coordinates: { from: [-2.75, 107.75], to: [20.84, 106.68] },
        waypoints: [
          [2.5, 109.0],    // Northeast through sea
          [8.0, 109.5],    // Continue northeast
          [12.0, 109.0],   // Further northeast towards Vietnam
          [16.0, 108.0],   // Approaching Vietnam coast
          [20.84, 106.68]  // Arrival at Haiphong
        ],
      },
    ]
  },
  {
    id: 'vg-3',
    name: 'Tanjung Priuk Arrivals',
    vesselCount: 1,
    dateRange: 'Nov 2025',
    vessels: [
      {
        id: 'glovis-crystal',
        name: 'GLOVIS CRYSTAL',
        type: 'cargo',
        dwt: '3,500',
        date: '27 Nov 25',
        from: 'Dammam',
        to: 'Tanjung Priuk',
        duration: '11 days',
        commodities: [
          { id: 'c6', name: 'Containers', quantity: '1,200 TEU' },
        ],
        coordinates: { from: [26.4342, 50.1033], to: [-6.0886, 106.8863] },
        waypoints: [
          [22.0, 55.0],    // Through Arabian Sea
          [15.0, 60.0],    // Continue southwest towards Indian Ocean
          [8.0, 70.0],     // Through Indian Ocean
          [3.0, 80.0],     // Approaching Strait of Malacca
          [2.0, 90.0],     // Through Strait of Malacca
          [-2.0, 100.0],   // Enter Andaman Sea
          [-5.0, 105.0],   // Approaching Indonesia
          [-6.0886, 106.8863] // Arrival at Tanjung Priuk
        ],
      },
    ]
  },
  {
    id: 'vg-4',
    name: 'Tanjung Perak Departures',
    vesselCount: 1,
    dateRange: 'Nov 2025',
    vessels: [
      {
        id: 'vessel3',
        name: 'Vessel 3',
        type: 'other',
        dwt: '3,500',
        date: '26 Nov 25',
        from: 'Tanjung Perak',
        to: 'Dongguan',
        duration: '20',
        commodities: [
          { id: 'c7', name: 'Textiles', quantity: '1,500 MT' },
        ],
        coordinates: { from: [-7.2043, 112.7183], to: [23.02, 113.75] },
        waypoints: [
          [-2.0, 113.0],   // Northeast through Java Sea
          [5.0, 114.0],    // Continue northeast through South China Sea
          [12.0, 113.5],   // Further northeast
          [18.0, 113.75],  // Approaching destination
          [23.02, 113.75]  // Arrival at Dongguan
        ],
      },
    ]
  },
  {
    id: 'vg-5',
    name: 'Tanjung Mas Departures',
    vesselCount: 1,
    dateRange: 'Nov 2025',
    vessels: [
      {
        id: 'vessel4',
        name: 'Vessel 4',
        type: 'cargo',
        dwt: '4,000',
        date: '27 Nov 25',
        from: 'Tanjung Mas',
        to: 'Bangkok',
        duration: '15',
        commodities: [
          { id: 'c8', name: 'Electronics', quantity: '800 MT' },
        ],
        coordinates: { from: [-6.9275, 110.3631], to: [13.75, 100.51] },
        waypoints: [
          [-2.0, 110.0],   // Northwest through Java Sea
          [2.0, 107.0],    // Continue northwest towards Sumatra
          [6.0, 104.0],    // Through Malacca Strait area
          [10.0, 102.0],   // Approaching Thailand
          [13.75, 100.51]  // Arrival at Bangkok
        ],
      },
    ]
  }
];
