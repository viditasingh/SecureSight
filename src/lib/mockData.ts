// Mock data for demonstration when database is not available
export const mockIncidents = [
  {
    id: '1',
    type: 'Unauthorised Access',
    tsStart: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    tsEnd: new Date(Date.now() - 30 * 60 * 1000 + 70 * 60 * 1000),
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
    tsStart: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    tsEnd: new Date(Date.now() - 60 * 60 * 1000 + 90 * 60 * 1000),
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
    tsStart: new Date(Date.now() - 90 * 60 * 1000), // 90 minutes ago
    tsEnd: new Date(Date.now() - 90 * 60 * 1000 + 70 * 60 * 1000),
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
    tsStart: new Date(Date.now() - 120 * 60 * 1000), // 2 hours ago
    tsEnd: new Date(Date.now() - 120 * 60 * 1000 + 70 * 60 * 1000),
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
    tsStart: new Date(Date.now() - 150 * 60 * 1000), // 2.5 hours ago
    tsEnd: new Date(Date.now() - 150 * 60 * 1000 + 120 * 60 * 1000),
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
    type: 'Traffic Congestion',
    tsStart: new Date(Date.now() - 180 * 60 * 1000), // 3 hours ago
    tsEnd: new Date(Date.now() - 180 * 60 * 1000 + 85 * 60 * 1000),
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
    id: '13',
    type: 'Face Recognised',
    tsStart: new Date(Date.now() - 210 * 60 * 1000), // 3.5 hours ago
    tsEnd: new Date(Date.now() - 210 * 60 * 1000 + 70 * 60 * 1000),
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
    type: 'Gun Threat',
    tsStart: new Date(Date.now() - 240 * 60 * 1000), // 4 hours ago
    tsEnd: new Date(Date.now() - 240 * 60 * 1000 + 120 * 60 * 1000),
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
    tsStart: new Date(Date.now() - 270 * 60 * 1000), // 4.5 hours ago
    tsEnd: new Date(Date.now() - 270 * 60 * 1000 + 70 * 60 * 1000),
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
    id: '20',
    type: 'Unauthorised Access',
    tsStart: new Date(Date.now() - 300 * 60 * 1000), // 5 hours ago
    tsEnd: new Date(Date.now() - 300 * 60 * 1000 + 80 * 60 * 1000),
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
    id: '21',
    type: 'Face Recognised',
    tsStart: new Date(Date.now() - 330 * 60 * 1000), // 5.5 hours ago
    tsEnd: new Date(Date.now() - 330 * 60 * 1000 + 30 * 60 * 1000),
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
    id: '22',
    type: 'Gun Threat',
    tsStart: new Date(Date.now() - 360 * 60 * 1000), // 6 hours ago
    tsEnd: new Date(Date.now() - 360 * 60 * 1000 + 15 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-12.jpg',
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
    type: 'Unauthorised Access',
    tsStart: new Date(Date.now() - 390 * 60 * 1000), // 6.5 hours ago
    tsEnd: new Date(Date.now() - 390 * 60 * 1000 + 90 * 60 * 1000),
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
    type: 'Traffic Congestion',
    tsStart: new Date(Date.now() - 420 * 60 * 1000), // 7 hours ago
    tsEnd: new Date(Date.now() - 420 * 60 * 1000 + 120 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-5.png',
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
    type: 'Face Recognised',
    tsStart: new Date(Date.now() - 450 * 60 * 1000), // 7.5 hours ago
    tsEnd: new Date(Date.now() - 450 * 60 * 1000 + 90 * 60 * 1000),
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
    type: 'Traffic Congestion',
    tsStart: new Date(Date.now() - 480 * 60 * 1000), // 8 hours ago
    tsEnd: new Date(Date.now() - 480 * 60 * 1000 + 40 * 60 * 1000),
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
    type: 'Unauthorised Access',
    tsStart: new Date(Date.now() - 510 * 60 * 1000), // 8.5 hours ago
    tsEnd: new Date(Date.now() - 510 * 60 * 1000 + 25 * 60 * 1000),
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
    type: 'Face Recognised',
    tsStart: new Date(Date.now() - 540 * 60 * 1000), // 9 hours ago
    tsEnd: new Date(Date.now() - 540 * 60 * 1000 + 60 * 60 * 1000),
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
    type: 'Gun Threat',
    tsStart: new Date(Date.now() - 570 * 60 * 1000), // 9.5 hours ago
    tsEnd: new Date(Date.now() - 570 * 60 * 1000 + 240 * 60 * 1000),
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
    type: 'Traffic Congestion',
    tsStart: new Date(Date.now() - 600 * 60 * 1000), // 10 hours ago
    tsEnd: new Date(Date.now() - 600 * 60 * 1000 + 55 * 60 * 1000),
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
