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
          { id: 'c1', name: 'Container', quantity: '500 MT' },
          { id: 'c2', name: 'Bauxite', quantity: '1,000 MT' },
          { id: 'c3', name: 'n/a', quantity: '2,000 MT' },
        ],
        coordinates: { from: [-2.75, 107.75], to: [13.78, 109.23] },
        waypoints: [
          [1.0, 108.0],   // North through Java Sea
          [4.0, 109.0],   // Northeast through South China Sea
          [7.0, 110.0],   // Continue northeast avoiding land
          [10.0, 110.5],  // Towards Vietnam coast through sea
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
          [1.0, 108.0],    // North through Java Sea
          [4.0, 109.0],    // Northeast through South China Sea
          [8.0, 111.0],    // Continue northeast avoiding land masses
          [12.0, 112.0],   // Further northeast keeping offshore
          [16.0, 112.5],   // Approaching China coast through sea
          [20.0, 113.0],   // Approaching destination through sea
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
          [1.0, 108.0],    // North through Java Sea
          [4.0, 108.5],    // Continue north avoiding land
          [6.0, 106.5],    // Through Karimata Strait
          [8.0, 105.0],    // South China Sea approach
          [10.0, 103.0],   // Entering Malacca Strait
          [12.0, 102.0],   // Through Malacca Strait
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
          [1.0, 108.0],    // North through Java Sea
          [4.0, 109.0],    // Northeast through South China Sea
          [8.0, 109.5],    // Continue northeast avoiding land
          [12.0, 109.5],   // Keeping offshore in South China Sea
          [16.0, 108.5],   // Approaching Vietnam coast through sea
          [19.0, 107.5],   // Final approach to Haiphong
          [20.84, 106.68]  // Arrival at Haiphong
        ],
      },
    ]
  },
  {
    id: 'vg-3',
    name: 'Tanjung Priuk Arrivals',
    vesselCount: 5,
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
          { id: 'c61', name: 'Bauxite', quantity: '2,500 MT' },
          { id: 'c62', name: 'Cement', quantity: '3,000 MT' },
          { id: 'c63', name: 'Coal', quantity: '4,500 MT' },
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
      {
        id: 'asian-glory',
        name: 'ASIAN GLORY',
        type: 'cargo',
        dwt: '4,200',
        date: '25 Nov 25',
        from: 'Jeddah',
        to: 'Tanjung Priuk',
        duration: '13 days',
        commodities: [
          { id: 'c64', name: 'Steel Coils', quantity: '3,200 MT' },
          { id: 'c65', name: 'Petrochemicals', quantity: '1,800 MT' },
          { id: 'c66', name: 'Machinery Parts', quantity: '950 MT' },
        ],
        coordinates: { from: [21.5433, 39.1728], to: [-6.0886, 106.8863] },
        waypoints: [
          [18.0, 40.0],    // Through Red Sea
          [15.0, 45.0],    // Through Arabian Sea
          [12.0, 55.0],    // Continue towards Indian Ocean
          [8.0, 70.0],     // Through Indian Ocean
          [2.0, 90.0],     // Through Strait of Malacca
          [-3.0, 100.0],   // Enter Andaman Sea
          [-6.0886, 106.8863] // Arrival at Tanjung Priuk
        ],
      },
      {
        id: 'ever-golden',
        name: 'EVER GOLDEN',
        type: 'cargo',
        dwt: '5,100',
        date: '28 Nov 25',
        from: 'Singapore',
        to: 'Tanjung Priuk',
        duration: '3 days',
        commodities: [
          { id: 'c67', name: 'Containers', quantity: '2,100 TEU' },
          { id: 'c68', name: 'Electronics', quantity: '1,200 MT' },
          { id: 'c69', name: 'Textiles', quantity: '800 MT' },
          { id: 'c70', name: 'Plastic Goods', quantity: '650 MT' },
        ],
        coordinates: { from: [1.3521, 103.8198], to: [-6.0886, 106.8863] },
        waypoints: [
          [2.0, 104.0],    // Southeast from Singapore
          [-1.0, 105.0],   // South through Java Sea
          [-4.0, 106.0],   // Approaching Java
          [-6.0886, 106.8863] // Arrival at Tanjung Priuk
        ],
      },
      {
        id: 'pacific-concord',
        name: 'PACIFIC CONCORD',
        type: 'cargo',
        dwt: '3,800',
        date: '26 Nov 25',
        from: 'Port Klang',
        to: 'Tanjung Priuk',
        duration: '5 days',
        commodities: [
          { id: 'c71', name: 'Rubber', quantity: '2,800 MT' },
          { id: 'c72', name: 'Palm Oil', quantity: '3,500 MT' },
          { id: 'c73', name: 'Timber', quantity: '1,900 MT' },
        ],
        coordinates: { from: [2.9187, 101.6975], to: [-6.0886, 106.8863] },
        waypoints: [
          [3.5, 102.0],    // Northeast through Strait of Malacca
          [1.0, 104.0],    // Through Singapore Strait
          [-3.0, 106.0],   // South towards Java
          [-6.0886, 106.8863] // Arrival at Tanjung Priuk
        ],
      },
      {
        id: 'indonesia-marine-301',
        name: 'INDONESIA MARINE 301',
        type: 'cargo',
        dwt: '2,900',
        date: '29 Nov 25',
        from: 'Belitung Island',
        to: 'Tanjung Priuk',
        duration: '4 days',
        commodities: [
          { id: 'c74', name: 'Tin Ore', quantity: '1,400 MT' },
          { id: 'c75', name: 'Bauxite', quantity: '2,200 MT' },
          { id: 'c76', name: 'Coal', quantity: '3,100 MT' },
        ],
        coordinates: { from: [-2.75, 107.75], to: [-6.0886, 106.8863] },
        waypoints: [
          [-4.0, 107.5],   // West through Java Sea
          [-5.0, 107.0],   // Continue west towards Jakarta
          [-6.0886, 106.8863] // Arrival at Tanjung Priuk
        ],
      },
    ]
  },
  {
    id: 'vg-4',
    name: 'Tanjung Perak Departures',
    vesselCount: 4,
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
          { id: 'c77', name: 'Rubber Products', quantity: '2,200 MT' },
          { id: 'c78', name: 'Palm Oil Products', quantity: '3,400 MT' },
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
      {
        id: 'maersk-semarang',
        name: 'MAERSK SEMARANG',
        type: 'cargo',
        dwt: '4,800',
        date: '25 Nov 25',
        from: 'Tanjung Perak',
        to: 'Haiphong',
        duration: '18',
        commodities: [
          { id: 'c79', name: 'Containers', quantity: '1,800 TEU' },
          { id: 'c80', name: 'Electronics', quantity: '1,500 MT' },
          { id: 'c81', name: 'Machinery', quantity: '2,100 MT' },
          { id: 'c82', name: 'Steel Products', quantity: '3,200 MT' },
        ],
        coordinates: { from: [-7.2043, 112.7183], to: [20.84, 106.68] },
        waypoints: [
          [-3.0, 111.0],   // Northwest through Bali Sea
          [3.0, 109.0],    // Continue northwest through Java Sea
          [10.0, 109.5],   // Northeast through South China Sea
          [15.0, 108.0],   // Further northeast towards Vietnam
          [18.0, 107.5],   // Approaching Vietnam coast
          [20.84, 106.68]  // Arrival at Haiphong
        ],
      },
      {
        id: 'pelindo-surabaya-21',
        name: 'PELINDO SURABAYA 21',
        type: 'cargo',
        dwt: '2,600',
        date: '27 Nov 25',
        from: 'Tanjung Perak',
        to: 'Bangkok',
        duration: '12',
        commodities: [
          { id: 'c83', name: 'Rice', quantity: '1,800 MT' },
          { id: 'c84', name: 'Sugar', quantity: '2,500 MT' },
          { id: 'c85', name: 'Fertilizers', quantity: '1,900 MT' },
        ],
        coordinates: { from: [-7.2043, 112.7183], to: [13.75, 100.51] },
        waypoints: [
          [-2.0, 110.0],   // Northwest through Java Sea
          [2.0, 107.0],    // Continue northwest towards Sumatra
          [8.0, 102.0],    // Through Malacca Strait
          [11.0, 101.0],   // Approaching Thailand
          [13.75, 100.51]  // Arrival at Bangkok
        ],
      },
      {
        id: 'ocean-prince',
        name: 'OCEAN PRINCE',
        type: 'cargo',
        dwt: '5,200',
        date: '28 Nov 25',
        from: 'Tanjung Perak',
        to: 'Singapore',
        duration: '8',
        commodities: [
          { id: 'c86', name: 'Containers', quantity: '2,500 TEU' },
          { id: 'c87', name: 'Petroleum Products', quantity: '3,800 MT' },
          { id: 'c88', name: 'Chemicals', quantity: '2,300 MT' },
          { id: 'c89', name: 'Plastic Materials', quantity: '1,400 MT' },
        ],
        coordinates: { from: [-7.2043, 112.7183], to: [1.3521, 103.8198] },
        waypoints: [
          [-5.0, 112.0],   // Northwest in Java Sea
          [-2.0, 111.0],   // Continue northwest
          [1.3521, 103.8198] // Straight to Singapore
        ],
      },
    ]
  },
  {
    id: 'vg-5',
    name: 'Tanjung Mas Departures',
    vesselCount: 3,
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
          { id: 'c90', name: 'Plastic Products', quantity: '1,200 MT' },
          { id: 'c91', name: 'Furniture', quantity: '950 MT' },
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
      {
        id: 'east-india-carrier',
        name: 'EAST INDIA CARRIER',
        type: 'cargo',
        dwt: '3,200',
        date: '26 Nov 25',
        from: 'Tanjung Mas',
        to: 'Singapore',
        duration: '10',
        commodities: [
          { id: 'c92', name: 'Containers', quantity: '1,500 TEU' },
          { id: 'c93', name: 'Cocoa', quantity: '2,300 MT' },
          { id: 'c94', name: 'Coffee', quantity: '1,800 MT' },
          { id: 'c95', name: 'Spices', quantity: '600 MT' },
        ],
        coordinates: { from: [-6.9275, 110.3631], to: [1.3521, 103.8198] },
        waypoints: [
          [-4.0, 109.0],   // West through Java Sea
          [-1.0, 108.0],   // Continue west
          [1.3521, 103.8198] // Straight to Singapore via Straits
        ],
      },
      {
        id: 'pelindo-semarang-15',
        name: 'PELINDO SEMARANG 15',
        type: 'cargo',
        dwt: '2,800',
        date: '28 Nov 25',
        from: 'Tanjung Mas',
        to: 'Dongguan',
        duration: '22',
        commodities: [
          { id: 'c96', name: 'Textiles', quantity: '3,200 MT' },
          { id: 'c97', name: 'Garments', quantity: '2,500 MT' },
          { id: 'c98', name: 'Footwear', quantity: '1,100 MT' },
        ],
        coordinates: { from: [-6.9275, 110.3631], to: [23.02, 113.75] },
        waypoints: [
          [-2.0, 110.5],   // Northeast through Java Sea
          [5.0, 111.0],    // Continue northeast through South China Sea
          [12.0, 112.0],   // Further northeast
          [18.0, 113.0],   // Approaching China
          [23.02, 113.75]  // Arrival at Dongguan
        ],
      },
    ]
  }
];
