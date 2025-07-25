// Mock data for demonstration when database is not available
export const mockIncidents = [
  {
    id: '1',
    type: 'Unauthorised Access',
    tsStart: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    tsEnd: new Date(Date.now() - 3 * 60 * 60 * 1000 + 70 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-1.png',
    resolved: false,
    camera: {
      id: '1',
      name: 'Camera - 01',
      location: 'Shop Floor',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '2',
    type: 'Unauthorised Access',
    tsStart: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    tsEnd: new Date(Date.now() - 1 * 60 * 60 * 1000 + 90 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-2.png',
    resolved: false,
    camera: {
      id: '2',
      name: 'Camera - 02',
      location: 'Back Entrance',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '3',
    type: 'Gun Threat',
    tsStart: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    tsEnd: new Date(Date.now() - 30 * 60 * 1000 + 70 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-3.png',
    resolved: false,
    camera: {
      id: '3',
      name: 'Camera - 03',
      location: 'Entrance',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '4',
    type: 'Face Recognised',
    tsStart: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    tsEnd: new Date(Date.now() - 45 * 60 * 1000 + 70 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-4.png',
    resolved: false,
    camera: {
      id: '1',
      name: 'Camera - 01',
      location: 'Shop Floor',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '5',
    type: 'Traffic Congestion',
    tsStart: new Date(Date.now() - 2.5 * 60 * 60 * 1000), // 2.5 hours ago
    tsEnd: new Date(Date.now() - 2.5 * 60 * 60 * 1000 + 120 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-5.png',
    resolved: false,
    camera: {
      id: '2',
      name: 'Camera - 02',
      location: 'Back Entrance',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '6',
    type: 'Suspicious Activity',
    tsStart: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    tsEnd: new Date(Date.now() - 15 * 60 * 1000 + 85 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-6.png',
    resolved: false,
    camera: {
      id: '3',
      name: 'Camera - 03',
      location: 'Entrance',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '7',
    type: 'Vandalism',
    tsStart: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    tsEnd: new Date(Date.now() - 4 * 60 * 60 * 1000 + 95 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-7.jpg',
    resolved: false,
    camera: {
      id: '1',
      name: 'Camera - 01',
      location: 'Shop Floor',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '8',
    type: 'Fire Alarm',
    tsStart: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    tsEnd: new Date(Date.now() - 6 * 60 * 60 * 1000 + 45 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-8.jpg',
    resolved: true,
    camera: {
      id: '2',
      name: 'Camera - 02',
      location: 'Back Entrance',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '9',
    type: 'Motion Detection',
    tsStart: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
    tsEnd: new Date(Date.now() - 1.5 * 60 * 60 * 1000 + 60 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-9.jpg',
    resolved: false,
    camera: {
      id: '3',
      name: 'Camera - 03',
      location: 'Entrance',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '10',
    type: 'Package Theft',
    tsStart: new Date(Date.now() - 7 * 60 * 60 * 1000), // 7 hours ago
    tsEnd: new Date(Date.now() - 7 * 60 * 60 * 1000 + 25 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-10.jpg',
    resolved: true,
    camera: {
      id: '1',
      name: 'Camera - 01',
      location: 'Shop Floor',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '11',
    type: 'Loitering',
    tsStart: new Date(Date.now() - 5.5 * 60 * 60 * 1000), // 5.5 hours ago
    tsEnd: new Date(Date.now() - 5.5 * 60 * 60 * 1000 + 180 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-11.jpg',
    resolved: true,
    camera: {
      id: '2',
      name: 'Camera - 02',
      location: 'Back Entrance',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '12',
    type: 'Vehicle Break-in',
    tsStart: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    tsEnd: new Date(Date.now() - 8 * 60 * 60 * 1000 + 40 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-12.jpg',
    resolved: true,
    camera: {
      id: '3',
      name: 'Camera - 03',
      location: 'Entrance',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '13',
    type: 'Face Recognised',
    tsStart: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    tsEnd: new Date(Date.now() - 12 * 60 * 60 * 1000 + 70 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-1.png',
    resolved: true,
    camera: {
      id: '1',
      name: 'Camera - 01',
      location: 'Shop Floor',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '14',
    type: 'Aggressive Behavior',
    tsStart: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
    tsEnd: new Date(Date.now() - 10 * 60 * 60 * 1000 + 120 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-2.png',
    resolved: true,
    camera: {
      id: '2',
      name: 'Camera - 02',
      location: 'Back Entrance',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '15',
    type: 'Gun Threat',
    tsStart: new Date(Date.now() - 22 * 60 * 60 * 1000), // 22 hours ago
    tsEnd: new Date(Date.now() - 22 * 60 * 60 * 1000 + 70 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-3.png',
    resolved: true,
    camera: {
      id: '3',
      name: 'Camera - 03',
      location: 'Entrance',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '16',
    type: 'Slip and Fall',
    tsStart: new Date(Date.now() - 3.5 * 60 * 60 * 1000), // 3.5 hours ago
    tsEnd: new Date(Date.now() - 3.5 * 60 * 60 * 1000 + 35 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-4.png',
    resolved: true,
    camera: {
      id: '2',
      name: 'Camera - 02',
      location: 'Back Entrance',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '17',
    type: 'Equipment Malfunction',
    tsStart: new Date(Date.now() - 9 * 60 * 60 * 1000), // 9 hours ago
    tsEnd: new Date(Date.now() - 9 * 60 * 60 * 1000 + 150 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-5.png',
    resolved: true,
    camera: {
      id: '3',
      name: 'Camera - 03',
      location: 'Entrance',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '18',
    type: 'Tailgating',
    tsStart: new Date(Date.now() - 50 * 60 * 1000), // 50 minutes ago
    tsEnd: new Date(Date.now() - 50 * 60 * 1000 + 20 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-6.png',
    resolved: false,
    camera: {
      id: '1',
      name: 'Camera - 01',
      location: 'Shop Floor',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '19',
    type: 'Workplace Violence',
    tsStart: new Date(Date.now() - 14 * 60 * 60 * 1000), // 14 hours ago
    tsEnd: new Date(Date.now() - 14 * 60 * 60 * 1000 + 45 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-7.jpg',
    resolved: true,
    camera: {
      id: '2',
      name: 'Camera - 02',
      location: 'Back Entrance',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '20',
    type: 'Perimeter Breach',
    tsStart: new Date(Date.now() - 35 * 60 * 1000), // 35 minutes ago
    tsEnd: new Date(Date.now() - 35 * 60 * 60 * 1000 + 80 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-8.jpg',
    resolved: false,
    camera: {
      id: '3',
      name: 'Camera - 03',
      location: 'Entrance',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '21',
    type: 'Medical Emergency',
    tsStart: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    tsEnd: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-9.jpg',
    resolved: true,
    camera: {
      id: '1',
      name: 'Camera - 01',
      location: 'Shop Floor',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '22',
    type: 'False Alarm',
    tsStart: new Date(Date.now() - 11 * 60 * 60 * 1000), // 11 hours ago
    tsEnd: new Date(Date.now() - 11 * 60 * 60 * 1000 + 15 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-10.jpg',
    resolved: true,
    camera: {
      id: '2',
      name: 'Camera - 02',
      location: 'Back Entrance',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '23',
    type: 'Smoke Detection',
    tsStart: new Date(Date.now() - 16 * 60 * 60 * 1000), // 16 hours ago
    tsEnd: new Date(Date.now() - 16 * 60 * 60 * 1000 + 90 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-11.jpg',
    resolved: true,
    camera: {
      id: '3',
      name: 'Camera - 03',
      location: 'Entrance',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '24',
    type: 'Cyber Security Breach',
    tsStart: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
    tsEnd: new Date(Date.now() - 20 * 60 * 1000 + 120 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-12.jpg',
    resolved: false,
    camera: {
      id: '1',
      name: 'Camera - 01',
      location: 'Shop Floor',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '25',
    type: 'Intrusion Alert',
    tsStart: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    tsEnd: new Date(Date.now() - 10 * 60 * 1000 + 90 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-1.png',
    resolved: false,
    camera: {
      id: '2',
      name: 'Camera - 02',
      location: 'Back Entrance',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '26',
    type: 'Theft Attempt',
    tsStart: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    tsEnd: new Date(Date.now() - 5 * 60 * 1000 + 40 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-2.png',
    resolved: false,
    camera: {
      id: '3',
      name: 'Camera - 03',
      location: 'Entrance',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '27',
    type: 'Emergency Exit Used',
    tsStart: new Date(Date.now() - 40 * 60 * 1000), // 40 minutes ago
    tsEnd: new Date(Date.now() - 40 * 60 * 1000 + 25 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-3.png',
    resolved: false,
    camera: {
      id: '1',
      name: 'Camera - 01',
      location: 'Shop Floor',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '28',
    type: 'Suspicious Package',
    tsStart: new Date(Date.now() - 75 * 60 * 1000), // 75 minutes ago
    tsEnd: new Date(Date.now() - 75 * 60 * 1000 + 60 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-4.png',
    resolved: false,
    camera: {
      id: '2',
      name: 'Camera - 02',
      location: 'Back Entrance',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '29',
    type: 'System Maintenance',
    tsStart: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
    tsEnd: new Date(Date.now() - 18 * 60 * 60 * 1000 + 240 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-5.png',
    resolved: true,
    camera: {
      id: '3',
      name: 'Camera - 03',
      location: 'Entrance',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  {
    id: '30',
    type: 'Access Control Failure',
    tsStart: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
    tsEnd: new Date(Date.now() - 25 * 60 * 1000 + 55 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-6.png',
    resolved: false,
    camera: {
      id: '1',
      name: 'Camera - 01',
      location: 'Shop Floor',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  }
];

export const getMockIncidents = (resolved?: string) => {
  if (resolved === 'true') {
    return mockIncidents.filter(incident => incident.resolved)
  } else if (resolved === 'false') {
    return mockIncidents.filter(incident => !incident.resolved)
  }
  return mockIncidents
};
