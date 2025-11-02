'use client'

import React, { useEffect } from 'react'
import { useEventStore } from '@/app/lib/store'
import { EventCard } from './EventCard'
import { Loading, LoadingSkeleton } from '@/app/components/ui/Loading'
import { Error } from '@/app/components/ui/Error'
import { Empty } from '@/app/components/ui/Empty'

export function EventList() {
  const { events, loading, error, fetchEvents, clearError } = useEventStore()

  useEffect(() => {
    if (events.length === 0 && !loading) {
      fetchEvents()
    }
  }, [events.length, loading, fetchEvents])

  if (loading && events.length === 0) {
    return <LoadingSkeleton count={6} />
  }

  if (error) {
    return (
      <Error
        message={error}
        onRetry={() => {
          clearError()
          fetchEvents()
        }}
      />
    )
  }

  if (events.length === 0) {
    return (
      <Empty
        title="No events found"
        description="Check back later for new events."
      />
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}

