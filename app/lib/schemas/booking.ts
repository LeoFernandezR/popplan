import { z } from 'zod'

// Base booking schema
export const baseBookingSchema = z.object({
  eventId: z.string().min(1, 'Event ID is required'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .trim(),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  tickets: z
    .number({
      message: 'Must be a valid number',
    })
    .int('Must be a whole number')
    .min(1, 'You must book at least 1 ticket')
    .max(10, 'Maximum 10 tickets per booking'),
})

export type BookingFormData = z.infer<typeof baseBookingSchema>

/**
 * Create a booking schema with dynamic ticket availability validation
 */
export function createBookingSchema(availableTickets: number) {
  return baseBookingSchema.refine(
    (data) => data.tickets <= availableTickets,
    {
      message: `Only ${availableTickets} ticket${availableTickets !== 1 ? 's' : ''} available`,
      path: ['tickets'],
    }
  ).refine(
    (data) => data.tickets > 0 && data.tickets <= availableTickets,
    {
      message: `Please select between 1 and ${availableTickets} tickets`,
      path: ['tickets'],
    }
  )
}

// Default booking schema (used when availableTickets is not known upfront)
export const bookingSchema = baseBookingSchema

