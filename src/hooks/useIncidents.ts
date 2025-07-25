import useSWR from 'swr'
import { IncidentWithCamera } from '@/lib/types'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch incidents')
  }
  return res.json()
}

export function useIncidents(resolved?: boolean) {
  const url = resolved !== undefined 
    ? `/api/incidents?resolved=${resolved}`
    : '/api/incidents'
    
  const { data, error, isLoading, mutate } = useSWR<IncidentWithCamera[]>(
    url,
    fetcher,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
    }
  )

  return {
    incidents: data || [],
    error,
    isLoading,
    mutate,
  }
}

export async function resolveIncident(id: string): Promise<IncidentWithCamera> {
  const res = await fetch(`/api/incidents/${id}/resolve`, {
    method: 'PATCH',
  })
  
  if (!res.ok) {
    throw new Error('Failed to resolve incident')
  }
  
  return res.json()
}
