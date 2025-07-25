export type IncidentType = 'Unauthorised Access' | 'Gun Threat' | 'Face Recognised' | 'Traffic Congestion'

export interface Camera {
  id: string
  name: string
  location: string
  createdAt: Date
  updatedAt: Date
}

export interface Incident {
  id: string
  cameraId: string
  camera: Camera
  type: IncidentType
  tsStart: Date
  tsEnd: Date
  thumbnailUrl: string
  resolved: boolean
  createdAt: Date
  updatedAt: Date
}

export interface IncidentWithCamera extends Incident {
  camera: Camera
}

export const INCIDENT_TYPES: { [key in IncidentType]: { color: string; icon: string; bgColor: string } } = {
  'Unauthorised Access': { 
    color: 'text-orange-400', 
    icon: '🚫', 
    bgColor: 'bg-orange-500/20 border-orange-500/50' 
  },
  'Gun Threat': { 
    color: 'text-red-400', 
    icon: '�', 
    bgColor: 'bg-red-500/20 border-red-500/50' 
  },
  'Face Recognised': { 
    color: 'text-blue-400', 
    icon: '👤', 
    bgColor: 'bg-blue-500/20 border-blue-500/50' 
  },
  'Traffic Congestion': { 
    color: 'text-green-400', 
    icon: '🚦', 
    bgColor: 'bg-green-500/20 border-green-500/50' 
  },
}
