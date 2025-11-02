export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'

export interface Booking {
  id: string
  eventId: string
  userId: string
  eventTitle: string // Denormalized for easy display
  eventDate: string // Denormalized for easy display
  eventImage: string // Denormalized for easy display
  tickets: number
  totalPrice: number // Total price in cents
  status: BookingStatus
  attendeeInfo: {
    name: string
    email: string
  }
  createdAt: string
  updatedAt: string
}

export interface BookingCreatePayload {
  eventId: string
  name: string
  email: string
  tickets: number
}

export interface BookingListResponse {
  bookings: Booking[]
  total: number
}

export interface BookingCreateResponse {
  booking: Booking
  message?: string
}

