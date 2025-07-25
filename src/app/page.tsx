'use client'

import { Navbar } from '@/components/layout/Navbar'
import { IncidentPlayer } from '@/components/incidents/IncidentPlayer'
import { IncidentList } from '@/components/incidents/IncidentList'
import { IncidentTimeline } from '@/components/incidents/IncidentTimeline'
import { IncidentWithCamera } from '@/lib/types'
import { useState, useEffect } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Home() {
  const [selectedIncident, setSelectedIncident] = useState<IncidentWithCamera | undefined>()
  
  // Fetch all incidents for the timeline
  const { data: incidents = [] } = useSWR<IncidentWithCamera[]>('/api/incidents', fetcher, {
    refreshInterval: 5000, // Refresh every 5 seconds
  })

  const handleIncidentSelect = (incident: IncidentWithCamera) => {
    setSelectedIncident(incident)
  }

  // Auto-select first incident if none selected
  useEffect(() => {
    if (incidents.length > 0 && !selectedIncident) {
      const firstUnresolved = incidents.find(inc => !inc.resolved)
      if (firstUnresolved) {
        setSelectedIncident(firstUnresolved)
      }
    }
  }, [incidents, selectedIncident])

  return (
    <div className="min-h-screen bg-black text-white font-['Inter',sans-serif]">
      <Navbar />
      
      <main className="p-3 sm:p-4 md:p-6">
        <div className="flex flex-col xl:grid xl:grid-cols-3 gap-4 md:gap-6 max-w-[2000px] mx-auto">
          {/* Main content - Incident Player */}
          <div className="xl:col-span-2 order-2 xl:order-1">
            <IncidentPlayer 
              selectedIncident={selectedIncident}
              incidents={incidents}
              onIncidentSelect={handleIncidentSelect}
            />
          </div>
          
          {/* Sidebar - Incident List with reduced height */}
          <div className="xl:col-span-1 order-1 xl:order-2">
            <IncidentList 
              onIncidentSelect={handleIncidentSelect}
              selectedIncidentId={selectedIncident?.id}
            />
          </div>
        </div>
        
        {/* Full-width Timeline outside the grid */}
        <div className="mt-4 md:mt-6">
          {incidents.length > 0 && (
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-3 sm:px-4 md:px-6">
              <IncidentTimeline
                incidents={incidents}
                onIncidentSelect={handleIncidentSelect}
                selectedIncident={selectedIncident}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
