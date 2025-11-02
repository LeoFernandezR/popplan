import { z } from 'zod'

export const bookingSchema = z.object({
  eventId: z.string().min(1, 'Event ID is required'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  tickets: z
    .number()
    .int('Must be a whole number')
    .min(1, 'You must book at least 1 ticket')
    .max(10, 'Maximum 10 tickets per booking'),
})

export type BookingFormData = z.infer<typeof bookingSchema>

