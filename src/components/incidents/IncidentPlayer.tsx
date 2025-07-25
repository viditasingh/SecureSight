'use client'

import { Card } from '@/components/ui/Card'
// import { IncidentTimeline } from './IncidentTimeline' // Future use
import { IncidentWithCamera } from '@/lib/types'
import { CalendarDays, Disc } from 'lucide-react'
import Image from 'next/image'

interface IncidentPlayerProps {
  selectedIncident?: IncidentWithCamera
  incidents?: IncidentWithCamera[]
  onIncidentSelect?: (incident: IncidentWithCamera) => void
}

export function IncidentPlayer({ selectedIncident }: IncidentPlayerProps) {
  return (
    <div>
      {/* Main Video Player */}
      <Card className="bg-black border-gray-800 overflow-hidden shadow-2xl">
        <div className="relative aspect-video bg-black flex items-center justify-center">
          {selectedIncident ? (
            <div className="relative w-full h-full group">
              <Image
                src={selectedIncident.thumbnailUrl}
                alt={`${selectedIncident.type} incident`}
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzAwMDAwMCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmZmZmIiBmb250LWZhbWlseT0iSW50ZXIsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='
                }}
              />
              
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
              
              {/* Incident info overlay */}
              <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4">
                <div className="text-white font-['Inter',sans-serif]">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-white mb-1 md:mb-2">{selectedIncident.type}</div>
                  
                  {/* Camera info and date in a flex container to prevent overlap */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    <div className="px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-semibold bg-black/60 text-gray-200 backdrop-blur-sm border border-gray-600/50 font-['Inter',sans-serif] w-fit flex items-center space-x-2">
                      <Disc size={16} color="#f50000" className="flex-shrink-0"/> 
                      <span>{selectedIncident.camera.name}</span>
                    </div>
                    
                  </div>
                </div>
              </div>

              {/* Status badge */}
              <div className="absolute top-2 right-2 md:top-4 md:right-4">
                <div className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-semibold backdrop-blur-sm border font-['Inter',sans-serif] ${
                  selectedIncident.resolved 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                }`}>
                  {selectedIncident.resolved ? '✓ Resolved' : '⚠ Active'}
                </div>
              </div>

              <div className="absolute top-2 left-2 md:top-4 md:left-4">
                <div className="px-2 py-1 md:px-3 md:py-1 rounded text-xs font-semibold bg-black/60 text-gray-200 backdrop-blur-sm border border-gray-600/50 font-['Inter',sans-serif]">
                  <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-300">
                     <CalendarDays size={16} className="flex-shrink-0"/> 
                     <span>{new Date(selectedIncident.tsStart).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Other Camera Thumbnails - Horizontally aligned and bigger */}
              <div className="absolute bottom-4 right-4 flex flex-row space-x-3">
                {['Camera - 01', 'Camera - 02', 'Camera - 03']
                  .filter(cameraName => cameraName !== selectedIncident.camera.name)
                  .map((cameraName, index) => {
                    // Use different thumbnail images for each camera
                    const thumbnailImages = [
                      '/images/thumbnails/incident-2.png',
                      '/images/thumbnails/incident-3.png', 
                      '/images/thumbnails/incident-4.png'
                    ];
                    
                    return (
                      <div 
                        key={cameraName}
                        className="relative w-40 h-24 md:w-48 md:h-28 rounded-lg border-2 border-gray-600/70 overflow-hidden bg-black/80 backdrop-blur-sm hover:border-amber-500/70 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-amber-500/20"
                      >
                        <Image
                          src={thumbnailImages[index]}
                          alt={cameraName}
                          fill
                          className="object-cover  transition-opacity duration-300"
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTI4IDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTI4IiBoZWlnaHQ9IjgwIiBmaWxsPSIjMTExODI3Ii8+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNDAiIHI9IjE2IiBmaWxsPSIjNEI1NTYzIi8+Cjx0ZXh0IHg9IjY0IiB5PSI0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzlDQTNBRiIgZm9udC1mYW1pbHk9IkludGVyLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIj7wn5O5PC90ZXh0Pgo8L3N2Zz4='
                          }}
                        />
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
                        
                        {/* Camera label */}
                        <div className="absolute bottom-1 left-1 right-1">
                          <span className="text-xs font-semibold text-white bg-black/70 px-2 py-0.5 rounded text-center block backdrop-blur-sm">
                            {cameraName.replace('Camera - ', 'CAM ')}
                          </span>
                        </div>
                        
                        {/* Status indicator */}
                        <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full border border-black/50 shadow-sm"></div>
                        
                      </div>
                    )
                  })}
              </div>
            </div>
          ) : (
            <div className="text-center text-white p-4 md:p-8 font-['Inter',sans-serif]">
              <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-gray-900 rounded-full flex items-center justify-center border-2 border-gray-700">
                <span className="text-2xl md:text-4xl">📹</span>
              </div>
              <div className="text-lg md:text-xl font-semibold mb-2 text-white">SecureSight CCTV</div>
              <div className="text-sm text-gray-400">Select an incident from the timeline to begin playback</div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
