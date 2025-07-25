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
    tsStart: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    tsEnd: new Date(Date.now() - 10 * 60 * 1000 + 70 * 60 * 1000),
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
    type: 'Gun Threat',
    tsStart: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    tsEnd: new Date(Date.now() - 5 * 60 * 60 * 1000 + 70 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-5.png',
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
    id: '6',
    type: 'Traffic Congestion',
    tsStart: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    tsEnd: new Date(Date.now() - 2 * 60 * 60 * 1000 + 70 * 60 * 1000),
    thumbnailUrl: '/images/thumbnails/incident-6.png',
    resolved: true,
    camera: {
      id: '3',
      name: 'Camera - 03',
      location: 'Entrance',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
]

export const getMockIncidents = (resolved?: string) => {
  if (resolved === 'true') {
    return mockIncidents.filter(incident => incident.resolved)
  } else if (resolved === 'false') {
    return mockIncidents.filter(incident => !incident.resolved)
  }
  return mockIncidents
}
