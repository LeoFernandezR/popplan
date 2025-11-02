import { create } from 'zustand'
import type { Event, EventListResponse } from '@/app/lib/types'

interface EventState {
  events: Event[]
  selectedEvent: Event | null
  loading: boolean
  error: string | null
}

interface EventActions {
  fetchEvents: () => Promise<void>
  fetchEventById: (id: string) => Promise<void>
  clearError: () => void
  clearSelectedEvent: () => void
}

type EventStore = EventState & EventActions

/**
 * Zustand store for managing events state
 */
export const useEventStore = create<EventStore>((set) => ({
  // Initial state
  events: [],
  selectedEvent: null,
  loading: false,
  error: null,

  // Actions
  fetchEvents: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/events')
      
      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.statusText}`)
      }

      const result = await response.json()
      
      if (result.error) {
        throw new Error(result.error.message || 'Failed to fetch events')
      }

      const data: EventListResponse = result.data
      set({ events: data.events, loading: false })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      set({ error: errorMessage, loading: false })
    }
  },

  fetchEventById: async (id: string) => {
    set({ loading: true, error: null, selectedEvent: null })
    try {
      const response = await fetch(`/api/events/${id}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Event not found')
        }
        throw new Error(`Failed to fetch event: ${response.statusText}`)
      }

      const result = await response.json()
      
      if (result.error) {
        throw new Error(result.error.message || 'Failed to fetch event')
      }

      const event = result.data.event
      set({ selectedEvent: event, loading: false })
      
      // Also update events array if this event is not already in it
      set((state) => {
        const eventExists = state.events.some((e) => e.id === event.id)
        if (!eventExists) {
          return { events: [...state.events, event] }
        }
        return {}
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      set({ error: errorMessage, loading: false })
    }
  },

  clearError: () => {
    set({ error: null })
  },

  clearSelectedEvent: () => {
    set({ selectedEvent: null })
  },
}))

