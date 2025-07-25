import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { mockIncidents } from '@/lib/mockData'

interface RouteParams {
  params: Promise<{ id: string }>
}

// Add CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 200, headers: corsHeaders })
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { error: 'Incident ID is required' },
        { status: 400, headers: corsHeaders }
      )
    }

    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      console.log('DATABASE_URL not configured, simulating resolve with mock data')
      const mockIncident = mockIncidents.find(inc => inc.id === id)
      if (!mockIncident) {
        return NextResponse.json(
          { error: 'Incident not found' },
          { status: 404, headers: corsHeaders }
        )
      }
      
      // Return the mock incident with toggled resolved status
      const updatedMockIncident = {
        ...mockIncident,
        resolved: !mockIncident.resolved
      }
      
      return NextResponse.json(updatedMockIncident, { headers: corsHeaders })
    }

    // First, check if the incident exists
    const existingIncident = await prisma.incident.findUnique({
      where: { id },
      include: { camera: true },
    })

    if (!existingIncident) {
      return NextResponse.json(
        { error: 'Incident not found' },
        { status: 404, headers: corsHeaders }
      )
    }

    // Toggle the resolved status
    const updatedIncident = await prisma.incident.update({
      where: { id },
      data: {
        resolved: !existingIncident.resolved,
      },
      include: {
        camera: true,
      },
    })

    return NextResponse.json(updatedIncident, { headers: corsHeaders })
  } catch (error) {
    console.error('Error updating incident:', error)
    console.log('Database error, simulating resolve with mock data')
    
    // Fallback to mock data simulation
    try {
      const { id } = await params
      const mockIncident = mockIncidents.find(inc => inc.id === id)
      if (!mockIncident) {
        return NextResponse.json(
          { error: 'Incident not found' },
          { status: 404, headers: corsHeaders }
        )
      }
      
      // Return the mock incident with toggled resolved status
      const updatedMockIncident = {
        ...mockIncident,
        resolved: !mockIncident.resolved
      }
      
      return NextResponse.json(updatedMockIncident, { headers: corsHeaders })
    } catch (mockError) {
      console.error('Error with mock resolve:', mockError)
      return NextResponse.json(
        { error: 'Failed to update incident' },
        { status: 500, headers: corsHeaders }
      )
    }
  }
}
