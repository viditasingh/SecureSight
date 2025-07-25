'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { IncidentItem } from './IncidentItem'
import { useIncidents, resolveIncident } from '@/hooks/useIncidents'
import { IncidentWithCamera } from '@/lib/types'
import { useState } from 'react'
import { CheckCheck, OctagonAlert, TrafficCone, TriangleAlert } from 'lucide-react'

interface IncidentListProps {
  onIncidentSelect: (incident: IncidentWithCamera) => void
  selectedIncidentId?: string
}

export function IncidentList({ onIncidentSelect, selectedIncidentId }: IncidentListProps) {
  const { incidents, error, isLoading, mutate } = useIncidents(false) // Only unresolved incidents
  const { incidents: allIncidents } = useIncidents(true) // All incidents to get resolved count
  const [optimisticUpdates, setOptimisticUpdates] = useState<Set<string>>(new Set())

  // Calculate resolved incidents count
  const resolvedCount = allIncidents?.filter(incident => incident.resolved).length || 0

  const handleResolve = async (id: string) => {
    // Optimistic update
    setOptimisticUpdates(prev => new Set(prev).add(id))
    
    try {
      await resolveIncident(id)
      // Refresh the data
      await mutate()
    } catch (error) {
      // Revert optimistic update on error
      setOptimisticUpdates(prev => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
      throw error
    } finally {
      // Clean up optimistic update
      setTimeout(() => {
        setOptimisticUpdates(prev => {
          const next = new Set(prev)
          next.delete(id)
          return next
        })
      }, 1000)
    }
  }

  if (error) {
    return (
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-6">
          <div className="text-red-400 text-center">
            <p>Failed to load incidents</p>
            <p className="text-sm text-gray-500 mt-1">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-black/70 border-gray-900 flex flex-col backdrop-blur-xl shadow-2xl font-['Inter',sans-serif] max-h-screen xl:max-h-[calc(71vh-4rem)] rounded-2xl">
      <CardHeader className="pb-3 md:pb-4 border-b border-gray-800/50 flex-shrink-0 bg-gradient-to-r from-black/90 via-black to-black/90 p-4 md:p-6 rounded-t-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#ff0000] rounded-full flex items-center justify-center shadow-lg">
                <TriangleAlert size={24} color="#f0a3a3" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full border-2 border-black animate-pulse"></div>
            </div>
            <div>
              <CardTitle className="text-white text-lg md:text-xl font-bold tracking-tight">
                Active Incidents
              </CardTitle>
              <div className="text-xs sm:text-sm text-gray-400 mt-0.5">
                {incidents.filter(i => !optimisticUpdates.has(i.id)).length} unresolved alerts
              </div>
            </div>
          </div>
          
          {/* Enhanced Status Indicators */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="flex items-center px-2 py-2 bg-red-950 rounded-full z-10">
                <OctagonAlert size={16} color="#EF4444" />
              </div>
              <div className="flex items-center px-2 py-2 bg-green-950 rounded-full -ml-2 z-0">
                <TrafficCone size={16} color="#c9d520"/>
              </div>
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 bg-gray-800/30 border border-gray-700/50 rounded-full">
              <CheckCheck size={16} color="#04ff00" /> 
              <p className='text-xs text-gray-300 font-medium'>{resolvedCount} resolved..</p>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-3 sm:p-4 md:p-6 flex-1 min-h-0 overflow-hidden">
        <div className="h-full overflow-y-auto space-y-3 pb-4" style={{ 
          maxHeight: 'calc(100vh - 20rem)',
          scrollPaddingBottom: '1rem',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          {isLoading && incidents.length === 0 ? (
            <div className="space-y-3 md:space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex space-x-3 md:space-x-4 p-4 md:p-5 bg-gray-900/50 rounded-xl border border-gray-800/30">
                    <div className="w-12 h-9 md:w-16 md:h-12 bg-gray-700/50 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 md:h-4 bg-gray-700/50 rounded w-3/4" />
                      <div className="h-2 md:h-3 bg-gray-700/50 rounded w-1/2" />
                      <div className="h-2 md:h-3 bg-gray-700/50 rounded w-1/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            incidents
              .filter(incident => !optimisticUpdates.has(incident.id))
              .map((incident) => (
                <IncidentItem
                  key={incident.id}
                  incident={incident}
                  onResolve={handleResolve}
                  onSelect={onIncidentSelect}
                  isSelected={selectedIncidentId === incident.id}
                />
              ))
          )}
          
          {incidents.length === 0 && !isLoading && (
            <div className="text-center text-gray-400 py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                <CheckCheck size={16} color="#04ff00" />
              </div>
              <p className="text-lg font-medium text-gray-300 mb-2">All Clear!</p>
              <p className="text-sm text-gray-500">No unresolved incidents at this time</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
