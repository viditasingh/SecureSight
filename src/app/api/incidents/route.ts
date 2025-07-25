import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getMockIncidents } from '@/lib/mockData'

// Add CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 200, headers: corsHeaders })
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const resolved = searchParams.get('resolved')
    
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      console.log('DATABASE_URL not configured, using mock data')
      const mockData = getMockIncidents(resolved || undefined)
      return NextResponse.json(mockData, { headers: corsHeaders })
    }

    const where = resolved !== null 
      ? { resolved: resolved === 'true' }
      : {}

    const incidents = await prisma.incident.findMany({
      where,
      include: {
        camera: true,
      },
      orderBy: {
        tsStart: 'desc',
      },
    })

    // If database is empty, fall back to mock data
    if (incidents.length === 0) {
      console.log('Database is empty, falling back to mock data')
      const mockData = getMockIncidents(resolved || undefined)
      return NextResponse.json(mockData, { headers: corsHeaders })
    }

    return NextResponse.json(incidents, { headers: corsHeaders })
  } catch (error) {
    console.error('Error fetching incidents:', error)
    console.log('Database error, falling back to mock data')
    
    // Fallback to mock data if database fails
    try {
      const { searchParams } = new URL(request.url)
      const resolved = searchParams.get('resolved')
      const mockData = getMockIncidents(resolved || undefined)
      return NextResponse.json(mockData, { headers: corsHeaders })
    } catch (mockError) {
      console.error('Error with mock data:', mockError)
      return NextResponse.json(
        { error: 'Failed to fetch incidents' },
        { status: 500, headers: corsHeaders }
      )
    }
  }
}
