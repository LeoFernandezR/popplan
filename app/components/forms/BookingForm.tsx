'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookingSchema, type BookingFormData } from '@/app/lib/schemas/booking'
import { useBookingStore } from '@/app/lib/store'
import { Button } from '@/app/components/ui/Button'
import { cn } from '@/app/lib/utils/cn'

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
  const { createBooking, creating, error } = useBookingStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      eventId,
      name: '',
      email: '',
      tickets: 1,
    },
  })

  const watchedTickets = watch('tickets')

  const onSubmit = async (data: BookingFormData) => {
    // Check ticket availability
    if (data.tickets > availableTickets) {
      return
    }

    const booking = await createBooking({
      eventId: data.eventId,
      name: data.name,
      email: data.email,
      tickets: data.tickets,
    })

    if (booking) {
      reset()
      onSuccess?.()
    }
  }

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-6', className)}>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Book Tickets for {eventTitle}</h3>
        <p className="mb-4 text-sm text-gray-600">
          {availableTickets} ticket{availableTickets !== 1 ? 's' : ''} available
        </p>
      </div>

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
            className={cn(
              'w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
              errors.name ? 'border-red-500' : 'border-gray-300'
            )}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
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
            className={cn(
              'w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
              errors.email ? 'border-red-500' : 'border-gray-300'
            )}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
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
            {...register('tickets', { valueAsNumber: true })}
            className={cn(
              'w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
              errors.tickets ? 'border-red-500' : 'border-gray-300'
            )}
          />
          {errors.tickets && (
            <p className="mt-1 text-sm text-red-600">{errors.tickets.message}</p>
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

      <Button type="submit" isLoading={creating} className="w-full" size="lg">
        {creating ? 'Processing...' : 'Book Now'}
      </Button>
    </form>
  )
}
