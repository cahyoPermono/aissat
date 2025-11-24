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
        id: 'phu-dat-268',
        name: 'PHU DAT 268',
        dwt: '2,959',
        date: '23 Jan 24',
        from: 'Belitung Island',
        to: 'Qui Nhon',
        duration: '25',
        commodities: [
          { id: 'c1', name: 'Nickel Ore', quantity: '2,649 MT' },
          { id: 'c2', name: 'Bauxite', quantity: '1,000 MT' },
        ],
        coordinates: { from: [-2.75, 107.75], to: [13.78, 109.23] },
        waypoints: [[23.02, 113.75]], // Via Dongguan
      },
      {
        id: 'minh-truong-18',
        name: 'MINH TRUONG 18',
        dwt: '5,083',
        date: '1 Apr 24',
        from: 'Belitung Island',
        to: 'Dongguan',
        duration: '17',
        commodities: [
          { id: 'c3', name: 'Coal', quantity: '5,083 MT' },
        ],
        coordinates: { from: [-2.75, 107.75], to: [23.02, 113.75] },
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
        id: 'hoang-phuong',
        name: 'HOANG PHUONG...',
        dwt: '4,334',
        date: '6 Sep 24',
        from: 'Belitung Island',
        to: 'Bangkok',
        duration: '12',
        commodities: [
            { id: 'c4', name: 'Steel Coils', quantity: '3,249 MT' },
        ],
        coordinates: { from: [-2.75, 107.75], to: [13.75, 100.51] },
        waypoints: [[20.84, 106.68]], // Via Haiphong
      },
      {
        id: 'star-56',
        name: 'STAR 56',
        dwt: '2,959',
        date: '11 Sep 24',
        from: 'Belitung Island',
        to: 'Haiphong',
        duration: '36',
        commodities: [
            { id: 'c5', name: 'Cement', quantity: '2,827 MT' },
        ],
        coordinates: { from: [-2.75, 107.75], to: [20.84, 106.68] },
      },
    ]
  }
];
