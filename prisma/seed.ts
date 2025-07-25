import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create cameras
  const cameras = await Promise.all([
    prisma.camera.create({
      data: {
        name: 'Camera - 01',
        location: 'Shop Floor',
      },
    }),
    prisma.camera.create({
      data: {
        name: 'Camera - 02',
        location: 'Back Entrance',
      },
    }),
    prisma.camera.create({
      data: {
        name: 'Camera - 03',
        location: 'Entrance',
      },
    }),
  ])

  // Create incidents with believable timestamps over 24 hours
  const baseDate = new Date('2025-07-25T14:35:00Z')
  
  const incidents = [
    // Unauthorised Access incidents
    {
      cameraId: cameras[0].id,
      type: 'Unauthorised Access',
      tsStart: new Date(baseDate.getTime() - 3 * 60 * 60 * 1000), // 3 hours ago
      tsEnd: new Date(baseDate.getTime() - 3 * 60 * 60 * 1000 + 70 * 60 * 1000),
      thumbnailUrl: '/images/thumbnails/incident-1.png',
      resolved: false,
    },
    {
      cameraId: cameras[1].id,
      type: 'Unauthorised Access',
      tsStart: new Date(baseDate.getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
      tsEnd: new Date(baseDate.getTime() - 1 * 60 * 60 * 1000 + 90 *60* 1000), 
      thumbnailUrl: '/images/thumbnails/incident-2.png',
      resolved: false,
    },
    {
      cameraId: cameras[2].id,
      type: 'Unauthorised Access',
      tsStart: new Date(baseDate.getTime() - 30 * 60 * 1000), // 30 minutes ago
      tsEnd: new Date(baseDate.getTime() - 30 * 60 * 1000 + 70 * 60 * 1000),
      thumbnailUrl: '/images/thumbnails/incident-3.png',
      resolved: false,
    },
    {
      cameraId: cameras[0].id,
      type: 'Unauthorised Access',
      tsStart: new Date(baseDate.getTime() - 10 * 60 * 1000), // 10 minutes ago
      tsEnd: new Date(baseDate.getTime() - 10 * 60 * 1000 + 70 * 60 * 1000), // 2 minutes later
      thumbnailUrl: '/images/thumbnails/incident-4.png',
      resolved: false,
    },
    
    // Gun Threat incidents
    {
      cameraId: cameras[1].id,
      type: 'Gun Threat',
      tsStart: new Date(baseDate.getTime() - 5 * 60 * 60 * 1000), // 5 hours ago
      tsEnd: new Date(baseDate.getTime() - 5 * 60 * 60 * 1000 + 70 * 60 * 1000), // 3 minutes later
      thumbnailUrl: '/images/thumbnails/incident-5.png',
      resolved: true,
    },
    {
      cameraId: cameras[2].id,
      type: 'Gun Threat',
      tsStart: new Date(baseDate.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
      tsEnd: new Date(baseDate.getTime() - 2 * 60 * 60 * 1000 + 70 * 60 * 1000), // 4 minutes later
      thumbnailUrl: '/images/thumbnails/incident-6.png',
      resolved: false,
    },
    
    // Face Recognised incidents
    {
      cameraId: cameras[0].id,
      type: 'Face Recognised',
      tsStart: new Date(baseDate.getTime() - 8 * 60 * 60 * 1000), // 8 hours ago
      tsEnd: new Date(baseDate.getTime() - 8 * 60 * 60 * 1000 + 70 * 60 * 1000), // 30 seconds later
      thumbnailUrl: '/images/thumbnails/incident-1.png',
      resolved: true,
    },
    {
      cameraId: cameras[1].id,
      type: 'Face Recognised',
      tsStart: new Date(baseDate.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
      tsEnd: new Date(baseDate.getTime() - 6 * 60 * 60 * 1000 + 70 * 60 * 1000), // 25 seconds later
      thumbnailUrl: '/images/thumbnails/incident-2.png',
      resolved: true,
    },
    {
      cameraId: cameras[2].id,
      type: 'Face Recognised',
      tsStart: new Date(baseDate.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
      tsEnd: new Date(baseDate.getTime() - 4 * 60 * 60 * 1000 + 70 * 60 * 1000), // 40 seconds later
      thumbnailUrl: '/images/thumbnails/incident-3.png',
      resolved: false,
    },
    
    // Traffic Congestion incidents
    {
      cameraId: cameras[0].id,
      type: 'Traffic Congestion',
      tsStart: new Date(baseDate.getTime() - 12 * 60 * 60 * 1000), // 12 hours ago
      tsEnd: new Date(baseDate.getTime() - 12 * 60 * 60 * 1000 + 70 * 60 * 1000), // 15 minutes later
      thumbnailUrl: '/images/thumbnails/incident-10.jpg',
      resolved: true,
    },
    {
      cameraId: cameras[1].id,
      type: 'Traffic Congestion',
      tsStart: new Date(baseDate.getTime() - 9 * 60 * 60 * 1000), // 9 hours ago
      tsEnd: new Date(baseDate.getTime() - 9 * 60 * 60 * 1000 + 70 * 60 * 1000), // 20 minutes later
      thumbnailUrl: '/images/thumbnails/incident-11.jpg',
      resolved: true,
    },
    {
      cameraId: cameras[2].id,
      type: 'Traffic Congestion',
      tsStart: new Date(baseDate.getTime() - 7 * 60 * 60 * 1000), // 7 hours ago
      tsEnd: new Date(baseDate.getTime() - 7 * 60 * 60 * 1000 + 70 * 60 * 1000), // 10 minutes later
      thumbnailUrl: '/images/thumbnails/incident-12.jpg',
      resolved: false,
    },
    
    // Additional incidents to reach 12+
    {
      cameraId: cameras[0].id,
      type: 'Unauthorised Access',
      tsStart: new Date(baseDate.getTime() - 15 * 60 * 60 * 1000), // 15 hours ago
      tsEnd: new Date(baseDate.getTime() - 15 * 60 * 60 * 1000 + 70 * 60 * 1000), // 3 minutes later
      thumbnailUrl: '/images/thumbnails/incident-4.png',
      resolved: true,
    },
    {
      cameraId: cameras[1].id,
      type: 'Face Recognised',
      tsStart: new Date(baseDate.getTime() - 20 * 60 * 60 * 1000), // 20 hours ago
      tsEnd: new Date(baseDate.getTime() - 20 * 60 * 60 * 1000 + 70 * 60 * 1000), // 35 seconds later
      thumbnailUrl: '/images/thumbnails/incident-5.png',
      resolved: true,
    },
    {
      cameraId: cameras[2].id,
      type: 'Gun Threat',
      tsStart: new Date(baseDate.getTime() - 22 * 60 * 60 * 1000), // 22 hours ago
      tsEnd: new Date(baseDate.getTime() - 22 * 60 * 60 * 1000 + 70 * 60 * 1000), // 5 minutes later
      thumbnailUrl: '/images/thumbnails/incident-6.png',
      resolved: true,
    },
  ]

  // Create all incidents
  for (const incident of incidents) {
    await prisma.incident.create({
      data: incident,
    })
  }

  console.log('Database seeded successfully!')
  console.log(`Created ${cameras.length} cameras and ${incidents.length} incidents`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
