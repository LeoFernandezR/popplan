import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useEventStore } from './eventStore'

// Mock fetch
global.fetch = vi.fn()

describe('eventStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useEventStore.setState({
      events: [],
      selectedEvent: null,
      loading: false,
      error: null,
    })
    vi.clearAllMocks()
  })

  it('initializes with empty state', () => {
    const { result } = renderHook(() => useEventStore())
    expect(result.current.events).toEqual([])
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it('fetches events successfully', async () => {
    const mockEvents = [
      { id: '1', title: 'Event 1', date: '2024-12-01', time: '19:00', location: { name: 'Venue 1', address: '123 St', city: 'City', country: 'Country' }, image: '', capacity: 100, availableTickets: 50, price: 5000, createdAt: '', updatedAt: '' },
      { id: '2', title: 'Event 2', date: '2024-12-02', time: '20:00', location: { name: 'Venue 2', address: '456 St', city: 'City', country: 'Country' }, image: '', capacity: 200, availableTickets: 100, price: 7500, createdAt: '', updatedAt: '' },
    ]

    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: { events: mockEvents, total: 2 },
      }),
    })

    const { result } = renderHook(() => useEventStore())

    await result.current.fetchEvents()

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.events).toHaveLength(2)
    expect(result.current.error).toBe(null)
  })

  it('handles fetch errors', async () => {
    ;(fetch as any).mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useEventStore())

    await result.current.fetchEvents()

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBeTruthy()
    expect(result.current.events).toEqual([])
  })

  it('handles API error responses', async () => {
    ;(fetch as any).mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    })

    const { result } = renderHook(() => useEventStore())

    await result.current.fetchEvents()

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBeTruthy()
  })

  it('clears error', () => {
    const { result } = renderHook(() => useEventStore())
    
    // Set error manually
    useEventStore.setState({ error: 'Test error' })
    
    result.current.clearError()

    expect(result.current.error).toBe(null)
  })

  it('clears selected event', () => {
    const mockEvent = {
      id: '1',
      title: 'Event 1',
      date: '2024-12-01',
      time: '19:00',
      location: { name: 'Venue 1', address: '123 St', city: 'City', country: 'Country' },
      image: '',
      capacity: 100,
      availableTickets: 50,
      price: 5000,
      createdAt: '',
      updatedAt: '',
    }

    const { result } = renderHook(() => useEventStore())
    
    useEventStore.setState({ selectedEvent: mockEvent })
    
    result.current.clearSelectedEvent()

    expect(result.current.selectedEvent).toBe(null)
  })
})

