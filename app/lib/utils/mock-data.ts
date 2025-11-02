import type { Event, Booking } from '@/app/lib/types'

// Mock events data
export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Jazz Night at Downtown Lounge',
    description:
      'Join us for an unforgettable evening of smooth jazz featuring local artists. Perfect for a romantic date or night out with friends.',
    date: '2024-12-15',
    time: '20:00',
    location: {
      name: 'Downtown Lounge',
      address: '123 Main Street',
      city: 'New York',
      country: 'USA',
    },
    image: '/images/events/jazz-night.jpg',
    capacity: 150,
    availableTickets: 45,
    price: 3500, // $35.00
    category: 'Music',
    tags: ['Jazz', 'Live Music', 'Nightlife'],
    organizer: {
      name: 'Downtown Events',
      email: 'events@downtown.com',
    },
    createdAt: '2024-11-01T10:00:00Z',
    updatedAt: '2024-11-15T14:30:00Z',
  },
  {
    id: '2',
    title: 'Tech Startup Networking Mixer',
    description:
      'Connect with fellow entrepreneurs, investors, and tech enthusiasts. Free drinks and appetizers included. Great opportunity to expand your network.',
    date: '2024-12-18',
    time: '18:30',
    location: {
      name: 'Innovation Hub',
      address: '456 Tech Boulevard',
      city: 'San Francisco',
      country: 'USA',
    },
    image: '/images/events/networking.jpg',
    capacity: 100,
    availableTickets: 78,
    price: 2500, // $25.00
    category: 'Networking',
    tags: ['Tech', 'Networking', 'Startups'],
    organizer: {
      name: 'Tech Connect',
      email: 'hello@techconnect.io',
    },
    createdAt: '2024-11-05T09:00:00Z',
    updatedAt: '2024-11-10T11:20:00Z',
  },
  {
    id: '3',
    title: 'Yoga & Wellness Retreat',
    description:
      'A full day of yoga sessions, meditation, and wellness workshops. Includes healthy lunch and snacks. All levels welcome.',
    date: '2024-12-20',
    time: '09:00',
    location: {
      name: 'Serenity Park',
      address: '789 Wellness Way',
      city: 'Los Angeles',
      country: 'USA',
    },
    image: '/images/events/yoga-retreat.jpg',
    capacity: 50,
    availableTickets: 12,
    price: 7500, // $75.00
    category: 'Wellness',
    tags: ['Yoga', 'Meditation', 'Wellness'],
    organizer: {
      name: 'Mindful Living',
      email: 'info@mindfulliving.com',
    },
    createdAt: '2024-11-03T08:00:00Z',
    updatedAt: '2024-11-12T16:45:00Z',
  },
  {
    id: '4',
    title: 'Art Gallery Opening: Modern Abstracts',
    description:
      'Exclusive opening night for our new modern abstract art collection. Meet the artists, enjoy wine and cheese, and explore stunning contemporary works.',
    date: '2024-12-22',
    time: '19:00',
    location: {
      name: 'Metropolitan Gallery',
      address: '321 Arts Avenue',
      city: 'Chicago',
      country: 'USA',
    },
    image: '/images/events/art-gallery.jpg',
    capacity: 80,
    availableTickets: 32,
    price: 4000, // $40.00
    category: 'Arts',
    tags: ['Art', 'Gallery', 'Culture'],
    organizer: {
      name: 'Metropolitan Gallery',
      email: 'gallery@metro-art.com',
    },
    createdAt: '2024-11-07T12:00:00Z',
    updatedAt: '2024-11-14T10:15:00Z',
  },
  {
    id: '5',
    title: 'Food & Wine Festival',
    description:
      'Sample dishes from top local restaurants and wines from regional vineyards. Live cooking demonstrations and entertainment throughout the day.',
    date: '2024-12-28',
    time: '14:00',
    location: {
      name: 'Central Park',
      address: '100 Park Drive',
      city: 'New York',
      country: 'USA',
    },
    image: '/images/events/food-wine.jpg',
    capacity: 300,
    availableTickets: 156,
    price: 6000, // $60.00
    category: 'Food & Drink',
    tags: ['Food', 'Wine', 'Festival'],
    organizer: {
      name: 'City Events Co.',
      email: 'info@cityevents.com',
    },
    createdAt: '2024-11-10T07:00:00Z',
    updatedAt: '2024-11-18T13:30:00Z',
  },
]

// Mock bookings data (for a demo user)
export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    eventId: '1',
    userId: 'user-123',
    eventTitle: 'Jazz Night at Downtown Lounge',
    eventDate: '2024-12-15',
    eventImage: '/images/events/jazz-night.jpg',
    tickets: 2,
    totalPrice: 7000, // 2 * $35.00
    status: 'confirmed',
    attendeeInfo: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    createdAt: '2024-11-16T10:30:00Z',
    updatedAt: '2024-11-16T10:30:00Z',
  },
  {
    id: 'booking-2',
    eventId: '3',
    userId: 'user-123',
    eventTitle: 'Yoga & Wellness Retreat',
    eventDate: '2024-12-20',
    eventImage: '/images/events/yoga-retreat.jpg',
    tickets: 1,
    totalPrice: 7500, // 1 * $75.00
    status: 'confirmed',
    attendeeInfo: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    createdAt: '2024-11-17T14:20:00Z',
    updatedAt: '2024-11-17T14:20:00Z',
  },
]

/**
 * Find an event by ID
 */
export function findEventById(id: string): Event | undefined {
  return mockEvents.find((event) => event.id === id)
}

/**
 * Get all events (supports simple filtering if needed)
 */
export function getAllEvents(): Event[] {
  return mockEvents
}

/**
 * Get bookings for a user (currently returns mock bookings)
 */
export function getUserBookings(userId: string): Booking[] {
  // In a real app, this would filter by userId
  // For now, return mock bookings
  return mockBookings
}

