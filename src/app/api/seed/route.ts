import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Add CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders })
}

export async function POST(request: NextRequest) {
  try {
    // Check if database already has data
    const existingIncidents = await prisma.incident.count()
    if (existingIncidents > 0) {
      return NextResponse.json(
        { message: `Database already contains ${existingIncidents} incidents` },
        { headers: corsHeaders }
      )
    }

    // Create cameras
    const cameras = await Promise.all([
      prisma.camera.create({
        data: {
          name: 'Camera - 01',
          location: 'Main Entrance',
        },
      }),
      prisma.camera.create({
        data: {
          name: 'Camera - 02',
          location: 'Parking Lot',
        },
      }),
      prisma.camera.create({
        data: {
          name: 'Camera - 03',
          location: 'Back Exit',
        },
      }),
    ])

    // Create incidents
    const baseTime = new Date('2025-01-25T08:00:00Z')
    const incidents = []

    for (let i = 0; i < 15; i++) {
      const incidentTypes = ['Unauthorised Access', 'Gun Threat', 'Face Recognised', 'Traffic Congestion']
      const type = incidentTypes[i % incidentTypes.length]
      const camera = cameras[i % cameras.length]
      const startTime = new Date(baseTime.getTime() + i * 45 * 60 * 1000) // 45 min intervals
      const endTime = new Date(startTime.getTime() + (5 + Math.random() * 10) * 60 * 1000) // 5-15 min duration

      const incident = await prisma.incident.create({
        data: {
          type,
          cameraId: camera.id,
          tsStart: startTime,
          tsEnd: endTime,
          thumbnailUrl: `/images/thumbnails/incident-${(i % 12) + 1}.${i < 6 ? 'png' : 'jpg'}`,
          resolved: Math.random() > 0.6, // 40% resolved
        },
      })
      incidents.push(incident)
    }

    return NextResponse.json(
      { 
        message: 'Database seeded successfully!',
        cameras: cameras.length,
        incidents: incidents.length
      },
      { headers: corsHeaders }
    )
  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json(
      { error: 'Failed to seed database: ' + (error as Error).message },
      { status: 500, headers: corsHeaders }
    )
  }
}
