import { describe, it, expect, beforeEach, vi } from 'vitest'
import { GET } from './route'
import { getAllEvents } from '@/app/lib/utils/mock-data'

// Mock the mock-data module
vi.mock('@/app/lib/utils/mock-data', () => ({
  getAllEvents: vi.fn(),
}))

describe('GET /api/events', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns list of events', async () => {
    const mockEvents = [
      {
        id: '1',
        title: 'Test Event',
        description: 'Test description',
        date: '2024-12-01',
        time: '19:00',
        location: { name: 'Venue', address: '123 St', city: 'City', country: 'Country' },
        image: '',
        capacity: 100,
        availableTickets: 50,
        price: 5000,
        createdAt: '2024-11-01',
        updatedAt: '2024-11-01',
      },
    ]

    ;(getAllEvents as any).mockReturnValue(mockEvents)

    const response = await GET()
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.data).toBeDefined()
    expect(body.data.events).toHaveLength(1)
    expect(body.data.total).toBe(1)
  })

  it('handles errors gracefully', async () => {
    ;(getAllEvents as any).mockImplementation(() => {
      throw new Error('Database error')
    })

    const response = await GET()
    const body = await response.json()

    expect(response.status).toBe(500)
    expect(body.error).toBeDefined()
    expect(body.error.message).toContain('Failed to fetch events')
  })
})

