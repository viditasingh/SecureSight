import { prisma } from './src/lib/prisma.js'

async function testData() {
  try {
    const cameras = await prisma.camera.findMany()
    const incidents = await prisma.incident.findMany()
    
    console.log(`Found ${cameras.length} cameras and ${incidents.length} incidents`)
    
    if (cameras.length === 0) {
      console.log('No cameras found, running seed...')
      // Run seed logic here if needed
    }
  } catch (error) {
    console.error('Database error:', error)
  }
}

testData()
