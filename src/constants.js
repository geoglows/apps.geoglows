export const TOOLS = [
  {
    id: 'rfs',
    name: 'River Forecast System - Hydroviewer',
    description: 'Advanced real-time simulation and predictive modeling of global river networks using the GEOGLOWS framework.',
    path: '/rfs',
    iconClass: 'text-blue-400',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>`,
    tags: ['Surface Water', 'Forecasting', 'Global Scale']
  },
  {
    id: 'ggst',
    name: 'Grace Groundwater Subsetting Tool',
    description: 'Process and visualize GRACE satellite gravity anomalies to monitor regional groundwater storage changes.',
    path: '/ggst',
    iconClass: 'text-cyan-400',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 7 9 3 5 7l4 4"/><path d="m17 11 4 4-4 4-4-4"/><path d="m8 12 4 4 6-6"/><path d="m16 8 3-3"/><path d="M9 21a6 6 0 0 0-6-6"/></svg>`,
    tags: ['Groundwater', 'Remote Sensing', 'Gravity Data']
  },
  {
    id: 'gwdm',
    name: 'Groundwater Data Mapper',
    description: 'A comprehensive interface for mapping, analyzing, and managing global groundwater observation datasets.',
    path: '/gwdm',
    iconClass: 'text-indigo-400',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/></svg>`,
    tags: ['Mapping', 'Analytics', 'In-situ Data']
  }
];

export const CONTRIBUTORS = [
  'GEOGLOWS',
  'Brigham Young University'
];

export const SPONSORS = [
  'NASA',
  'NOAA',
  'Google.org'
];
