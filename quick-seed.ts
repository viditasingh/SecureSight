import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.incident.deleteMany()
  await prisma.camera.deleteMany()

  // Create cameras
  const cameras = await Promise.all([
    prisma.camera.create({
      data: {
        name: 'Camera - 01',
        location: 'Shop Floor Camera A',
      },
    }),
    prisma.camera.create({
      data: {
        name: 'Camera - 02',
        location: 'Shop Floor Camera A',
      },
    }),
    prisma.camera.create({
      data: {
        name: 'Camera - 03',
        location: 'Entrance',
      },
    }),
  ])

  // Create incidents using only available images (exact file names)
  const availableImages = [
    '/images/thumbnails/incident-1.png',
    '/images/thumbnails/incident-2.png', 
    '/images/thumbnails/incident-3.png',
    '/images/thumbnails/incident-4.png',
    '/images/thumbnails/incident-5.png',
    '/images/thumbnails/incident-6.png',
    '/images/thumbnails/incident-10.jpg',
    '/images/thumbnails/incident-11.jpg',
    '/images/thumbnails/incident-12.jpg'
  ]

  const incidents = [
    {
      cameraId: cameras[0].id,
      type: 'Unauthorised Access',
      tsStart: new Date('2025-07-25T11:35:00Z'),
      tsEnd: new Date('2025-07-25T11:37:00Z'),
      thumbnailUrl: '/images/thumbnails/incident-1.png',
      resolved: false,
    },
    {
      cameraId: cameras[1].id,
      type: 'Gun Threat',
      tsStart: new Date('2025-07-25T12:35:00Z'),
      tsEnd: new Date('2025-07-25T12:37:00Z'),
      thumbnailUrl: '/images/thumbnails/incident-2.png',
      resolved: false,
    },
    {
      cameraId: cameras[2].id,
      type: 'Unauthorised Access',
      tsStart: new Date('2025-07-25T13:05:00Z'),
      tsEnd: new Date('2025-07-25T13:06:00Z'),
      thumbnailUrl: '/images/thumbnails/incident-3.png',
      resolved: false,
    },
    {
      cameraId: cameras[0].id,
      type: 'Unauthorised Access',
      tsStart: new Date('2025-07-25T13:25:00Z'),
      tsEnd: new Date('2025-07-25T13:27:00Z'),
      thumbnailUrl: '/images/thumbnails/incident-4.png',
      resolved: false,
    },
    {
      cameraId: cameras[1].id,
      type: 'Gun Threat',
      tsStart: new Date('2025-07-25T13:30:00Z'),
      tsEnd: new Date('2025-07-25T13:33:00Z'),
      thumbnailUrl: '/images/thumbnails/incident-5.png',
      resolved: false,
    },
    {
      cameraId: cameras[2].id,
      type: 'Traffic Congestion',
      tsStart: new Date('2025-07-25T13:32:00Z'),
      tsEnd: new Date('2025-07-25T13:42:00Z'),
      thumbnailUrl: '/images/thumbnails/incident-6.png',
      resolved: false,
    },
    {
      cameraId: cameras[0].id,
      type: 'Traffic Congestion',
      tsStart: new Date('2025-07-25T10:15:00Z'),
      tsEnd: new Date('2025-07-25T10:25:00Z'),
      thumbnailUrl: '/images/thumbnails/incident-10.jpg',
      resolved: false,
    },
    {
      cameraId: cameras[1].id,
      type: 'Face Recognised',
      tsStart: new Date('2025-07-25T09:20:00Z'),
      tsEnd: new Date('2025-07-25T09:21:00Z'),
      thumbnailUrl: '/images/thumbnails/incident-11.jpg',
      resolved: false,
    },
    {
      cameraId: cameras[2].id,
      type: 'Unauthorised Access',
      tsStart: new Date('2025-07-25T08:45:00Z'),
      tsEnd: new Date('2025-07-25T08:47:00Z'),
      thumbnailUrl: '/images/thumbnails/incident-12.jpg',
      resolved: false,
    },
    // Add a few more using repeated images
    {
      cameraId: cameras[0].id,
      type: 'Gun Threat',
      tsStart: new Date('2025-07-25T07:30:00Z'),
      tsEnd: new Date('2025-07-25T07:33:00Z'),
      thumbnailUrl: '/images/thumbnails/incident-1.png',
      resolved: false,
    },
    {
      cameraId: cameras[1].id,
      type: 'Face Recognised',
      tsStart: new Date('2025-07-25T06:15:00Z'),
      tsEnd: new Date('2025-07-25T06:16:00Z'),
      thumbnailUrl: '/images/thumbnails/incident-2.png',
      resolved: false,
    },
    {
      cameraId: cameras[2].id,
      type: 'Traffic Congestion',
      tsStart: new Date('2025-07-25T05:10:00Z'),
      tsEnd: new Date('2025-07-25T05:20:00Z'),
      thumbnailUrl: '/images/thumbnails/incident-3.png',
      resolved: false,
    },
  ]

  // Create incidents
  for (const incident of incidents) {
    await prisma.incident.create({
      data: incident,
    })
  }

  console.log('Database seeded successfully!')
  console.log(`Created ${cameras.length} cameras and ${incidents.length} unresolved incidents`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
