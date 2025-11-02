'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createBookingSchema, type BookingFormData } from '@/app/lib/schemas/booking'
import { useBookingStore } from '@/app/lib/store'
import { Button } from '@/app/components/ui/Button'
import { SuccessMessage } from '@/app/components/ui/SuccessMessage'
import { cn } from '@/app/lib/utils/cn'
import { useRouter } from 'next/navigation'

interface BookingFormProps {
  eventId: string
  eventTitle: string
  price: number // Price in cents
  availableTickets: number
  onSuccess?: () => void
  className?: string
}

export function BookingForm({
  eventId,
  eventTitle,
  price,
  availableTickets,
  onSuccess,
  className,
}: BookingFormProps) {
  const { createBooking, creating, error, clearError } = useBookingStore()
  const router = useRouter()
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(createBookingSchema(availableTickets)),
    defaultValues: {
      eventId,
      name: '',
      email: '',
      tickets: 1,
    },
  })

  const watchedTickets = watch('tickets')

  const onSubmit = async (data: BookingFormData) => {
    // Clear any previous errors
    clearError()
    setShowSuccess(false)

    const booking = await createBooking({
      eventId: data.eventId,
      name: data.name,
      email: data.email,
      tickets: data.tickets,
    })

    if (booking) {
      setSuccessMessage(
        `Successfully booked ${booking.tickets} ticket${booking.tickets !== 1 ? 's' : ''} for ${eventTitle}!`
      )
      setShowSuccess(true)
      reset()
      
      // Call onSuccess callback if provided
      onSuccess?.()
      
      // Optionally redirect to dashboard after a delay
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    }
  }

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className={cn('space-y-6', className)}
      aria-label="Booking form"
    >
      <div>
        <h3 className="mb-4 text-lg font-semibold" id="booking-form-title">
          Book Tickets for {eventTitle}
        </h3>
        <p className="mb-4 text-sm text-gray-600" aria-live="polite">
          {availableTickets} ticket{availableTickets !== 1 ? 's' : ''} available
        </p>
      </div>

      {showSuccess && (
        <SuccessMessage
          message={successMessage}
          onClose={() => setShowSuccess(false)}
        />
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={cn(
              'w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
              errors.name ? 'border-red-500' : 'border-gray-300'
            )}
            placeholder="John Doe"
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={cn(
              'w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
              errors.email ? 'border-red-500' : 'border-gray-300'
            )}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="tickets" className="mb-1 block text-sm font-medium text-gray-700">
            Number of Tickets
          </label>
          <input
            id="tickets"
            type="number"
            min="1"
            max={availableTickets}
            aria-invalid={errors.tickets ? 'true' : 'false'}
            aria-describedby={errors.tickets ? 'tickets-error' : 'tickets-help'}
            {...register('tickets', {
              valueAsNumber: true,
              validate: (value) => {
                if (value > availableTickets) {
                  return `Only ${availableTickets} ticket${availableTickets !== 1 ? 's' : ''} available`
                }
                return true
              },
            })}
            className={cn(
              'w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
              errors.tickets ? 'border-red-500' : 'border-gray-300'
            )}
          />
          {errors.tickets && (
            <p id="tickets-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.tickets.message}
            </p>
          )}
          {!errors.tickets && availableTickets > 0 && (
            <p id="tickets-help" className="mt-1 text-xs text-gray-500">
              Select between 1 and {availableTickets} ticket{availableTickets !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Price:</span>
          <span className="text-lg font-semibold text-gray-900">
            {formatPrice(price * (watchedTickets || 1))}
          </span>
        </div>
      </div>

      <Button 
        type="submit" 
        isLoading={creating} 
        className="w-full" 
        size="lg"
        aria-label={creating ? 'Processing booking...' : `Book tickets for ${eventTitle}`}
      >
        {creating ? 'Processing...' : 'Book Now'}
      </Button>
    </form>
  )
}
