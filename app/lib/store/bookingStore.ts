import { create } from 'zustand'
import type {
  Booking,
  BookingListResponse,
  BookingCreatePayload,
  BookingCreateResponse,
} from '@/app/lib/types'

interface BookingState {
  bookings: Booking[]
  loading: boolean
  error: string | null
  creating: boolean
}

interface BookingActions {
  fetchBookings: () => Promise<void>
  createBooking: (payload: BookingCreatePayload) => Promise<Booking | null>
  clearError: () => void
}

type BookingStore = BookingState & BookingActions

/**
 * Zustand store for managing bookings state
 */
export const useBookingStore = create<BookingStore>((set, get) => ({
  // Initial state
  bookings: [],
  loading: false,
  error: null,
  creating: false,

  // Actions
  fetchBookings: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/bookings')
      
      if (!response.ok) {
        throw new Error(`Failed to fetch bookings: ${response.statusText}`)
      }

      const result = await response.json()
      
      if (result.error) {
        throw new Error(result.error.message || 'Failed to fetch bookings')
      }

      const data: BookingListResponse = result.data
      set({ bookings: data.bookings, loading: false })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      set({ error: errorMessage, loading: false })
    }
  },

  createBooking: async (payload: BookingCreatePayload) => {
    set({ creating: true, error: null })
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok || result.error) {
        throw new Error(
          result.error?.message || `Failed to create booking: ${response.statusText}`
        )
      }

      const data: BookingCreateResponse = result.data
      const newBooking = data.booking

      // Add the new booking to the list
      set((state) => ({
        bookings: [newBooking, ...state.bookings],
        creating: false,
      }))

      return newBooking
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      set({ error: errorMessage, creating: false })
      return null
    }
  },

  clearError: () => {
    set({ error: null })
  },
}))

