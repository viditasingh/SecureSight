'use client'

import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { IncidentWithCamera, INCIDENT_TYPES } from '@/lib/types'
import { formatTimeRange, formatRelativeTime } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { DoorOpen,Cctv,OctagonAlert, ScanFace, TrafficCone, Clock } from 'lucide-react'

interface IncidentItemProps {
  incident: IncidentWithCamera
  onResolve: (id: string) => Promise<void>
  onSelect: (incident: IncidentWithCamera) => void
  isSelected?: boolean
}

export function IncidentItem({ incident, onResolve, onSelect, isSelected }: IncidentItemProps) {
  const [isResolving, setIsResolving] = useState(false)
  const [isResolved, setIsResolved] = useState(incident.resolved)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const incidentTypeConfig = INCIDENT_TYPES[incident.type as keyof typeof INCIDENT_TYPES]
  
  const handleResolve = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsResolving(true)
    
    try {
      await onResolve(incident.id)
      setIsResolved(!isResolved)
    } catch (error) {
      console.error('Failed to resolve incident:', error)
    } finally {
      setIsResolving(false)
    }
  }

  return (
    <div
      className={`
        group p-3 rounded-xl cursor-pointer transition-all duration-200 bg-gray-900/30 border-gray-800/50 hover:border-gray-700/70 hover:bg-gray-900/50
        ${isResolved ? 'opacity-60' : ''}
      `}
      onClick={() => onSelect(incident)}
    >
      <div className="flex items-start space-x-3">
        {/* Thumbnail */}
        <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-black/50 border border-gray-800/30 flex-shrink-0">
          <img
            src={incident.thumbnailUrl}
            alt={`${incident.type} incident`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Prevent further error events and set to fallback immediately
              e.currentTarget.onerror = null
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iODAiIGZpbGw9IiMwMDAwMDAiLz48dGV4dCB4PSI2MCIgeT0iNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNkMWQ1ZGIiIGZvbnQtZmFtaWx5PSJJbnRlciwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMCI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+'
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Type indicator and resolve button */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
                <span className="text-sm">
                  {incident.type === 'Unauthorised Access' && <DoorOpen size={16} color="#F97316" />}
                  {incident.type === 'Gun Threat' && <OctagonAlert size={16} color="#EF4444" />}
                  {incident.type === 'Face Recognised' && <ScanFace size={16} color="#ce86fe" />}
                  {incident.type === 'Traffic Congestion' && <TrafficCone size={16} color="#c9d520" />}
                </span>
              <span className="text-sm font-medium text-white">
                {incident.type}
              </span>
            </div>
            
            {!isResolved && (
              <button
                onClick={handleResolve}
                disabled={isResolving}
                className="opacity-100 transition-all duration-200 text-[#FFCC00] hover:text-[#FFD700] text-xs px-3 py-1 rounded-lg font-medium"
              >
                {isResolving ? 'Resolving...' : 'Resolve >'}
              </button>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center space-x-1 text-sm text-gray-300 mb-1">
            <Cctv size={16} color="#ffffff" className='inline-block' />
            <span>{incident.camera.location}</span>
          </div>
          
          {/* Time */}
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <Clock size={12} color="#ffffff" className='inline-block' />
            {mounted ? (
              <>
                <span>{formatTimeRange(new Date(incident.tsStart), new Date(incident.tsEnd))}</span>
                <span className="text-gray-500">
                  on {new Date(incident.tsStart).toLocaleDateString()}
                </span>
              </>
            ) : (
              <span>Loading...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
