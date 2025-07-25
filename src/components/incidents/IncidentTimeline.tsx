'use client'

import { useState, useRef, useEffect } from 'react'
import { IncidentWithCamera, INCIDENT_TYPES } from '@/lib/types'
import { Clock, Calendar, Activity, AlertTriangle, Play, Pause, SkipForward, SkipBack, Rewind, FastForward, Cctv } from 'lucide-react'

interface IncidentTimelineProps {
  incidents: IncidentWithCamera[]
  onIncidentSelect: (incident: IncidentWithCamera) => void
  selectedIncident?: IncidentWithCamera
}

export function IncidentTimeline({ incidents, onIncidentSelect, selectedIncident }: IncidentTimelineProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isDragging, setIsDragging] = useState(false)
  const [hoveredIncident, setHoveredIncident] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const timelineRef = useRef<SVGSVGElement>(null)
  const scrubberRef = useRef<number>(12) // Start at noon

  const TIMELINE_WIDTH = 4500 
  const TIMELINE_HEIGHT = 240 // Increased height
  const RULER_HEIGHT = 60
  const TRACK_HEIGHT = 35 // Increased track height for larger text
  const TRACK_SPACING = 12
  const CAMERAS = ['Camera - 01', 'Camera - 02', 'Camera - 03']

  // Helper functions
  const timeToPosition = (time: Date) => {
    const hours = time.getHours() + time.getMinutes() / 60
    return (hours / 24) * TIMELINE_WIDTH
  }

  const positionToTime = (x: number) => {
    const hours = (x / TIMELINE_WIDTH) * 24
    const hour = Math.floor(hours)
    const minute = Math.floor((hours - hour) * 60)
    const date = new Date()
    date.setHours(hour, minute, 0, 0)
    return date
  }

  const formatTime = (hour: number) => {
    if (hour === 0) return '00:00'
    if (hour === 12) return '12:00'
    return `${hour.toString().padStart(2, '0')}:00`
  }

  const getIncidentColor = (type: string, isHovered: boolean = false, isSelected: boolean = false) => {
    const config = INCIDENT_TYPES[type as keyof typeof INCIDENT_TYPES]
    const baseColor = config?.color || '#ef4444'
    
    if (isSelected) return '#fbbf24' // Golden yellow for selected
    if (isHovered) return baseColor.replace(')', ', 0.9)').replace('rgb', 'rgba')
    return baseColor
  }

  const getTimestampColor = (type: string) => {
    switch(type) {
      case 'Gun Threat': return '#ef4444' // Red
      case 'Unauthorised Access': return '#f97316' // Orange
      case 'Face Recognised': return '#3b82f6' // Blue
      case 'Traffic Congestion': return '#eab308' // Yellow
      default: return '#6b7280' // Gray
    }
  }

  // Playback control functions
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleRewind = () => {
    const newTime = new Date(currentTime)
    newTime.setMinutes(newTime.getMinutes() - 10)
    setCurrentTime(newTime)
    scrubberRef.current = newTime.getHours() + newTime.getMinutes() / 60
  }

  const handleFastForward = () => {
    const newTime = new Date(currentTime)
    newTime.setMinutes(newTime.getMinutes() + 10)
    setCurrentTime(newTime)
    scrubberRef.current = newTime.getHours() + newTime.getMinutes() / 60
  }

  const handleSkipBack = () => {
    const newTime = new Date(currentTime)
    newTime.setMinutes(newTime.getMinutes() - 1)
    setCurrentTime(newTime)
    scrubberRef.current = newTime.getHours() + newTime.getMinutes() / 60
  }

  const handleSkipForward = () => {
    const newTime = new Date(currentTime)
    newTime.setMinutes(newTime.getMinutes() + 1)
    setCurrentTime(newTime)
    scrubberRef.current = newTime.getHours() + newTime.getMinutes() / 60
  }

  const getCameraTrackY = (cameraName: string) => {
    const index = CAMERAS.indexOf(cameraName)
    return RULER_HEIGHT + 20 + index * (TRACK_HEIGHT + TRACK_SPACING)
  }

  // Enhanced drag handling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    updateScrubberPosition(e)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      updateScrubberPosition(e)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const updateScrubberPosition = (e: React.MouseEvent) => {
    if (!timelineRef.current) return
    
    const rect = timelineRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(TIMELINE_WIDTH, e.clientX - rect.left))
    const time = positionToTime(x)
    
    scrubberRef.current = time.getHours() + time.getMinutes() / 60
    setCurrentTime(time)
    
    // Find closest incident to snap to
    const closestIncident = incidents.reduce((closest, incident) => {
      const incidentTime = new Date(incident.tsStart)
      const incidentPos = timeToPosition(incidentTime)
      const currentPos = x
      
      if (!closest) return incident
      
      const closestPos = timeToPosition(new Date(closest.tsStart))
      return Math.abs(incidentPos - currentPos) < Math.abs(closestPos - currentPos) ? incident : closest
    }, null as IncidentWithCamera | null)
    
    // Snap to incident if close enough (within 40px for zoomed view precision)
    if (closestIncident) {
      const incidentPos = timeToPosition(new Date(closestIncident.tsStart))
      if (Math.abs(incidentPos - x) < 40) {
        onIncidentSelect(closestIncident)
        const incidentTime = new Date(closestIncident.tsStart)
        scrubberRef.current = incidentTime.getHours() + incidentTime.getMinutes() / 60
        setCurrentTime(incidentTime)
      }
    }
  }

  // Group incidents by camera
  const incidentsByCamera = incidents.reduce((acc, incident) => {
    const cameraName = incident.camera.name
    if (!acc[cameraName]) acc[cameraName] = []
    acc[cameraName].push(incident)
    return acc
  }, {} as Record<string, IncidentWithCamera[]>)

  return (
    <div className="bg-black border border-gray-800 rounded-2xl backdrop-blur-xl shadow-2xl font-['Inter',sans-serif] w-full">
      {/* Modern Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-3 sm:gap-0 p-3 sm:p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
          
          {/* Playback Controls - Moved to left */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-gray-900/50 border border-gray-700/50 rounded-xl p-1">
              <button
                onClick={handleRewind}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                title="Rewind 10 minutes"
              >
                <Rewind className="w-4 h-4 text-gray-300" />
              </button>
              <button
                onClick={handleSkipBack}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                title="Skip back 1 minute"
              >
                <SkipBack className="w-4 h-4 text-gray-300" />
              </button>
              <button
                onClick={handlePlayPause}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors bg-[#FFCC00]/20 border border-[#FFCC00]/30"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-[#FFCC00]" />
                ) : (
                  <Play className="w-4 h-4 text-[#FFCC00]" />
                )}
              </button>
              <button
                onClick={handleSkipForward}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                title="Skip forward 1 minute"
              >
                <SkipForward className="w-4 h-4 text-gray-300" />
              </button>
              <button
                onClick={handleFastForward}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                title="Fast forward 10 minutes"
              >
                <FastForward className="w-4 h-4 text-gray-300" />
              </button>
            </div>
            
            {/* Current Time Display */}
            <div className="px-4 py-2rounded-xl flex items-center space-x-2">
              <Clock className="w-4 h-4 text-white" />
              <span className="text-sm font-mono font-bold text-white">
                {currentTime.toLocaleTimeString('en-US', { 
                  hour12: false, 
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </span>
            </div>
          </div>
        </div>
        
        {/* Live Status - Moved to right */}
        <div className="flex items-center space-x-3">
          <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-400">Live</span>
          </div>
          <div className="px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-orange-400">
              {incidents.filter(i => !i.resolved).length} Active
            </span>
          </div>
        </div>
      </div>
      
      {/* Scrollable Timeline Container */}
      <div className="relative timeline-scroll overflow-x-auto overflow-y-hidden rounded-xl bg-black/30 border border-gray-800/30 shadow-inner mx-3 sm:mx-4 md:mx-6"
           style={{ maxHeight: '280px' }}>
        
        <div className="flex">
          {/* Camera Labels - Fixed left sidebar that stays visible during scroll */}
          <div className="flex-shrink-0 w-32 bg-black/95 border-r border-gray-700/50 z-20 sticky left-0 shadow-lg backdrop-blur-sm">
            <div style={{ height: `${RULER_HEIGHT + 20}px` }} className="border-b border-gray-800/50 bg-black/90"></div>
            {CAMERAS.map((camera, index) => {
              const hasIncidents = incidentsByCamera[camera]?.length > 0
              
              return (
                <div 
                  key={camera}
                  className="flex items-center justify-between px-3 border-b border-gray-800/30 bg-black/90"
                  style={{ 
                    height: `${TRACK_HEIGHT + TRACK_SPACING}px`
                  }}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2 mt-1">
                    <Cctv size={16} color="#ffffff" className='inline-block'/>
                    <span className="text-xs font-semibold text-gray-100 whitespace-nowrap">
                      {camera}
                    </span>
                    
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Timeline Content */}
          <div className="flex-1" style={{ minWidth: `${TIMELINE_WIDTH}px` }}>
            <svg
              ref={timelineRef}
              width={TIMELINE_WIDTH}
              height={TIMELINE_HEIGHT}
              className="cursor-crosshair"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              viewBox={`0 0 ${TIMELINE_WIDTH} ${TIMELINE_HEIGHT}`}
              preserveAspectRatio="none"
            >
            {/* Enhanced Background Grid for zoomed view */}
            <defs>
              <pattern id="grid" width="5" height="20" patternUnits="userSpaceOnUse">
                <path d="M 5 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.3" opacity="0.1"/>
              </pattern>
              <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#000000', stopOpacity: 0.8 }} />
                <stop offset="50%" style={{ stopColor: '#111111', stopOpacity: 0.9 }} />
                <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 0.8 }} />
              </linearGradient>
              <linearGradient id="goldenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#FFCC00', stopOpacity: 0.8 }} />
                <stop offset="50%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#FFCC00', stopOpacity: 0.8 }} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
          </defs>

          {/* Background */}
          <rect width={TIMELINE_WIDTH} height={TIMELINE_HEIGHT} fill="url(#timelineGradient)"/>
          <rect width={TIMELINE_WIDTH} height={TIMELINE_HEIGHT} fill="url(#grid)"/>

          {/* Zoomed-in 5-minute interval timeline */}
          {Array.from({ length: 289 }, (_, i) => {
            const totalMinutes = i * 30
            const hours = Math.floor(totalMinutes / 60)
            const minutes = totalMinutes % 60
            const x = (totalMinutes / (24 * 60)) * TIMELINE_WIDTH
            
            const isHour = minutes === 0
            const isMajor = hours % 3 === 0 && minutes === 0 // Major markers every 3 hours
            const is30Min = minutes === 30
            const is15Min = minutes === 15 || minutes === 45
            const is10Min = minutes === 10 || minutes === 20 || minutes === 40 || minutes === 50
            
            if (hours >= 24) return null // Don't show beyond 24 hours
            
            return (
              <g key={i}>
                {/* Hour lines (tallest) */}
                {isHour && (
                  <line
                    x1={x}
                    y1={0}
                    x2={x}
                    y2={RULER_HEIGHT}
                    stroke={isMajor ? '#6366f1' : '#4b5563'}
                    strokeWidth={isMajor ? 3 : 2}
                    opacity={isMajor ? 0.9 : 0.8}
                  />
                )}
                
                {/* 30-minute lines (medium-tall) */}
                {is30Min && (
                  <line
                    x1={x}
                    y1={RULER_HEIGHT - 20}
                    x2={x}
                    y2={RULER_HEIGHT}
                    stroke="#6b7280"
                    strokeWidth={1.5}
                    opacity={0.7}
                  />
                )}
                
                {/* 15-minute lines (medium) */}
                {is15Min && (
                  <line
                    x1={x}
                    y1={RULER_HEIGHT - 15}
                    x2={x}
                    y2={RULER_HEIGHT}
                    stroke="#6b7280"
                    strokeWidth={1.2}
                    opacity={0.6}
                  />
                )}
                
                {/* 10-minute lines (shorter) */}
                {is10Min && (
                  <line
                    x1={x}
                    y1={RULER_HEIGHT - 10}
                    x2={x}
                    y2={RULER_HEIGHT}
                    stroke="#6b7280"
                    strokeWidth={1}
                    opacity={0.5}
                  />
                )}
                
                {/* 5-minute lines (shortest) */}
                {!isHour && !is30Min && !is15Min && !is10Min && (
                  <line
                    x1={x}
                    y1={RULER_HEIGHT - 8}
                    x2={x}
                    y2={RULER_HEIGHT}
                    stroke="#6b7280"
                    strokeWidth={0.8}
                    opacity={0.4}
                  />
                )}
                
                {/* Hour labels */}
                {isHour && hours < 24 && (
                  <g>
                    <text
                      x={x}
                      y={RULER_HEIGHT - 30}
                      textAnchor="middle"
                      className="fill-white text-sm font-mono font-bold"
                      style={{ fontSize: '13px' }}
                    >
                      {`${hours.toString().padStart(2, '0')}:00`}
                    </text>
                  </g>
                )}
                
                {/* 30-minute labels */}
                {is30Min && hours < 24 && (
                  <text
                    x={x}
                    y={RULER_HEIGHT - 35}
                    textAnchor="middle"
                    className="fill-gray-300 text-sm font-mono font-medium"
                    style={{ fontSize: '11px' }}
                  >
                    {`${hours.toString().padStart(2, '0')}:30`}
                  </text>
                )}
                
                {/* 15-minute labels for better precision */}
                {is15Min && hours < 24 && (
                  <text
                    x={x}
                    y={RULER_HEIGHT - 30}
                    textAnchor="middle"
                    className="fill-gray-400 text-xs font-mono"
                    style={{ fontSize: '10px' }}
                  >
                    {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`}
                  </text>
                )}
                
                {/* 5-minute labels for maximum precision */}
                {!isHour && !is30Min && !is15Min && !is10Min && hours < 24 && x > 40 && x < TIMELINE_WIDTH - 40 && (
                  <text
                    x={x}
                    y={RULER_HEIGHT - 25}
                    textAnchor="middle"
                    className="fill-gray-500 text-xs font-mono"
                    style={{ fontSize: '8px' }}
                  >
                    {`${minutes.toString().padStart(2, '0')}`}
                  </text>
                )}
              </g>
            )
          }).filter(Boolean)}

          {/* Enhanced Camera tracks */}
          {CAMERAS.map((camera, index) => {
            const y = getCameraTrackY(camera)
            const hasIncidents = incidentsByCamera[camera]?.length > 0
            
            return (
              <g key={camera}>
                {/* Track background with gradient */}
                <rect
                  x={0}
                  y={y}
                  width={TIMELINE_WIDTH}
                  height={TRACK_HEIGHT}
                  fill={hasIncidents ? '#1e293b' : '#0f172a'}
                  stroke="#374151"
                  strokeWidth={1}
                  rx={4}
                  opacity={0.8}
                />
                
                {/* Track highlight */}
                <rect
                  x={0}
                  y={y}
                  width={TIMELINE_WIDTH}
                  height={2}
                  fill="url(#timelineGradient)"
                  rx={1}
                  opacity={0.5}
                />
              </g>
            )
          })}

          {/* Enhanced Incident markers */}
          {incidents.map((incident) => {
            const startTime = new Date(incident.tsStart)
            const endTime = new Date(incident.tsEnd)
            const startX = timeToPosition(startTime)
            const endX = timeToPosition(endTime)
            const width = Math.max(6, endX - startX)
            const y = getCameraTrackY(incident.camera.name)
            const isSelected = selectedIncident?.id === incident.id
            const isHovered = hoveredIncident === incident.id
            const color = getIncidentColor(incident.type, isHovered, isSelected)

            return (
              <g key={incident.id}>
                {/* Incident glow effect for selected */}
                {isSelected && (
                  <rect
                    x={startX - 2}
                    y={y}
                    width={width + 4}
                    height={TRACK_HEIGHT}
                    fill={color}
                    fillOpacity={0.3}
                    rx={6}
                    filter="url(#glow)"
                  />
                )}
                
                {/* Main incident bar */}
                <rect
                  x={startX}
                  y={y + 3}
                  width={width}
                  height={TRACK_HEIGHT - 6}
                  fill={color}
                  fillOpacity={incident.resolved ? 0.4 : 0.9}
                  stroke={isSelected ? '#fbbf24' : 'none'}
                  strokeWidth={isSelected ? 2 : 0}
                  rx={4}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    onIncidentSelect(incident)
                    setCurrentTime(startTime)
                    scrubberRef.current = startTime.getHours() + startTime.getMinutes() / 60
                  }}
                />
                
                {/* Incident priority indicator */}
                {incident.type === 'Gun Threat' && (
                  <circle
                    cx={startX + width/2}
                    cy={y + TRACK_HEIGHT/2}
                    r={3}
                    fill="#ffffff"
                    className="animate-pulse"
                  />
                )}
                
                {/* Incident label with full name - Always visible */}
                {width > 80 && (
                  <text
                    x={startX + width / 2}
                    y={y + TRACK_HEIGHT / 2 + 2}
                    textAnchor="middle"
                    className="fill-white text-sm font-semibold pointer-events-none"
                    style={{ 
                      fontSize: '12px', 
                      textShadow: '0 1px 3px rgba(0,0,0,0.9)',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    {incident.type}
                  </text>
                )}
                
                {/* Medium width - Show abbreviated text */}
                {width > 40 && width <= 80 && (
                  <text
                    x={startX + width / 2}
                    y={y + TRACK_HEIGHT / 2 + 2}
                    textAnchor="middle"
                    className="fill-white text-xs font-semibold pointer-events-none"
                    style={{ 
                      fontSize: '10px', 
                      textShadow: '0 1px 3px rgba(0,0,0,0.9)',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    {incident.type.split(' ')[0]}
                  </text>
                )}
                
                {/* Small width - Show icons */}
                {width <= 40 && width > 15 && (
                  <text
                    x={startX + width / 2}
                    y={y + TRACK_HEIGHT / 2 + 4}
                    textAnchor="middle"
                    className="fill-white text-xs font-bold pointer-events-none"
                    style={{ fontSize: '14px', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
                  >
                    {incident.type === 'Unauthorised Access' && '🚫'}
                    {incident.type === 'Gun Threat' && '🔴'}
                    {incident.type === 'Face Recognised' && '👤'}
                    {incident.type === 'Traffic Congestion' && '🚦'}
                  </text>
                )}

                {/* Timestamp always visible below incident name - Plain white with better visibility and overlap prevention */}
                {width > 20 && (
                  <text
                    x={Math.max(startX + 25, Math.min(startX + width / 2, TIMELINE_WIDTH - 25))} // Prevent edge overflow
                    y={y + TRACK_HEIGHT - 4}
                    textAnchor="middle"
                    className="text-xs font-mono pointer-events-none font-bold"
                    style={{ 
                      fontSize: width > 60 ? '9px' : '8px', 
                      textShadow: '0 1px 2px rgba(0,0,0,0.9)',
                      fontFamily: 'monospace',
                      fill: '#ffffff'
                    }}
                  >
                    {width > 40 ? 
                      startTime.toLocaleTimeString('en-US', { 
                        hour12: false, 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      }) :
                      `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`
                    }
                  </text>
                )}
              </g>
            )
          })}

          {/* Enhanced Scrubber */}
          <g className="pointer-events-none">
            {/* Scrubber line with gradient */}
            <defs>
              <linearGradient id="scrubberGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 0.8 }} />
              </linearGradient>
            </defs>
            
            <line
              x1={scrubberRef.current * TIMELINE_WIDTH / 24}
              y1={0}
              x2={scrubberRef.current * TIMELINE_WIDTH / 24}
              y2={TIMELINE_HEIGHT}
              stroke="url(#scrubberGradient)"
              strokeWidth={3}
              filter="url(#glow)"
            />
            
            {/* Scrubber handle with enhanced design */}
            <g className="cursor-grab active:cursor-grabbing">
              <circle
                cx={scrubberRef.current * TIMELINE_WIDTH / 24}
                cy={RULER_HEIGHT / 2}
                r={9}
                fill="#fbbf24"
                stroke="#1f2937"
                strokeWidth={3}
                filter="url(#glow)"
                className="drop-shadow-lg"
              />
              <circle
                cx={scrubberRef.current * TIMELINE_WIDTH / 24}
                cy={RULER_HEIGHT / 2}
                r={6}
                fill="#ffffff"
                opacity={0.9}
              />
              
            </g>
          </g>
        </svg>
          </div>
        </div>
      </div>

      {/* Enhanced Responsive Timeline legend */}
      <div className="mt-4 md:mt-6 pt-4 border-t border-gray-800/50 space-y-4 px-3 sm:px-4 md:px-6">
        {/* Legend Items - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-800/30">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-red-500 rounded-sm shadow-lg flex-shrink-0"></div>
              <span className="text-sm font-medium text-white">Critical Threat</span>
            </div>
            <span className="text-sm text-gray-300 bg-red-500/20 px-3 py-1 rounded-full font-mono">
              {incidents.filter(i => i.type === 'Gun Threat').length}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-800/30">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-orange-500 rounded-sm shadow-lg flex-shrink-0"></div>
              <span className="text-sm font-medium text-white">High Alert</span>
            </div>
            <span className="text-sm text-gray-300 bg-orange-500/20 px-3 py-1 rounded-full font-mono">
              {incidents.filter(i => i.type === 'Unauthorised Access').length}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-800/30">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-500 rounded-sm shadow-lg flex-shrink-0"></div>
              <span className="text-sm font-medium text-white">Recognition</span>
            </div>
            <span className="text-sm text-gray-300 bg-blue-500/20 px-3 py-1 rounded-full font-mono">
              {incidents.filter(i => i.type === 'Face Recognised').length}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-800/30">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-yellow-500 rounded-sm shadow-lg flex-shrink-0"></div>
              <span className="text-sm font-medium text-white">Traffic Alert</span>
            </div>
            <span className="text-sm text-gray-300 bg-yellow-500/20 px-3 py-1 rounded-full font-mono">
              {incidents.filter(i => i.type === 'Traffic Congestion').length}
            </span>
          </div>
        </div>
        
        {/* Instructions - Responsive Stack */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:space-x-8 space-y-3 sm:space-y-0 text-sm">
          <div className="flex items-center justify-center space-x-3 text-amber-400">
            <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse flex-shrink-0"></div>
            <span className="font-medium">Drag scrubber to navigate timeline</span>
          </div>
          <div className="hidden sm:flex items-center space-x-3 text-gray-400">
            <span className="text-amber-400">•</span>
            <span>Click incidents to view details</span>
          </div>
          <div className="flex sm:hidden items-center justify-center space-x-3 text-gray-400">
            <span className="text-amber-400">•</span>
            <span>Tap incidents for details</span>
          </div>
        </div>
      </div>
    </div>
  )
}
