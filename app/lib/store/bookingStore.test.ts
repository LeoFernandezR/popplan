import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useBookingStore } from './bookingStore'

// Mock fetch
global.fetch = vi.fn()

describe('bookingStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useBookingStore.setState({
      bookings: [],
      loading: false,
      error: null,
      creating: false,
    })
    vi.clearAllMocks()
  })

  it('initializes with empty state', () => {
    const { result } = renderHook(() => useBookingStore())
    expect(result.current.bookings).toEqual([])
    expect(result.current.loading).toBe(false)
    expect(result.current.creating).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it('fetches bookings successfully', async () => {
    const mockBookings = [
      {
        id: 'booking-1',
        eventId: 'event-1',
        userId: 'user-1',
        eventTitle: 'Event 1',
        eventDate: '2024-12-01',
        eventImage: '',
        tickets: 2,
        totalPrice: 10000,
        status: 'confirmed' as const,
        attendeeInfo: { name: 'John Doe', email: 'john@example.com' },
        createdAt: '2024-11-01',
        updatedAt: '2024-11-01',
      },
    ]

    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: { bookings: mockBookings, total: 1 },
      }),
    })

    const { result } = renderHook(() => useBookingStore())

    await result.current.fetchBookings()

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.bookings).toHaveLength(1)
    expect(result.current.bookings[0].id).toBe('booking-1')
  })

  it('creates booking successfully', async () => {
    const mockBooking = {
      id: 'booking-new',
      eventId: 'event-1',
      userId: 'user-1',
      eventTitle: 'Event 1',
      eventDate: '2024-12-01',
      eventImage: '',
      tickets: 2,
      totalPrice: 10000,
      status: 'confirmed' as const,
      attendeeInfo: { name: 'John Doe', email: 'john@example.com' },
      createdAt: '2024-11-01',
      updatedAt: '2024-11-01',
    }

    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: { booking: mockBooking },
      }),
    })

    const { result } = renderHook(() => useBookingStore())

    const payload = {
      eventId: 'event-1',
      name: 'John Doe',
      email: 'john@example.com',
      tickets: 2,
    }

    const booking = await result.current.createBooking(payload)

    await waitFor(() => {
      expect(result.current.creating).toBe(false)
    })

    expect(booking).toBeTruthy()
    expect(result.current.bookings).toHaveLength(1)
    expect(result.current.bookings[0].id).toBe('booking-new')
  })

  it('handles booking creation errors', async () => {
    ;(fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        error: { message: 'Event not found' },
      }),
    })

    const { result } = renderHook(() => useBookingStore())

    const payload = {
      eventId: 'invalid-event',
      name: 'John Doe',
      email: 'john@example.com',
      tickets: 2,
    }

    const booking = await result.current.createBooking(payload)

    await waitFor(() => {
      expect(result.current.creating).toBe(false)
    })

    expect(booking).toBe(null)
    expect(result.current.error).toBeTruthy()
  })

  it('clears error', () => {
    const { result } = renderHook(() => useBookingStore())
    
    useBookingStore.setState({ error: 'Test error' })
    
    result.current.clearError()

    expect(result.current.error).toBe(null)
  })
})

