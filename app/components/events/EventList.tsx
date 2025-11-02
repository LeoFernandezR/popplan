'use client'

import React, { useEffect, useState } from 'react'
import type { Event } from '@/app/lib/types'
import { useEventStore } from '@/app/lib/store'
import { EventCard } from './EventCard'
import { EventSearch } from './EventSearch'
import { Loading, LoadingSkeleton } from '@/app/components/ui/Loading'
import { Error } from '@/app/components/ui/Error'
import { Empty } from '@/app/components/ui/Empty'

interface EventListProps {
  initialEvents?: Event[]
}

export function EventList({ initialEvents }: EventListProps) {
  const { events, loading, error, fetchEvents, clearError } = useEventStore()
  const [displayEvents, setDisplayEvents] = useState<Event[]>(events)

  useEffect(() => {
    // If initial events provided, set them in store
    if (initialEvents && initialEvents.length > 0 && events.length === 0) {
      useEventStore.setState({ events: initialEvents })
    } else if (events.length === 0 && !loading) {
      fetchEvents()
    }
  }, [events.length, loading, fetchEvents, initialEvents])

  // Update display events when store events change
  useEffect(() => {
    setDisplayEvents(events)
  }, [events])

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

  if (events.length === 0 && !loading) {
    return (
      <Empty
        title="No events found"
        description="Check back later for new events."
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      {events.length > 0 && (
        <EventSearch 
          events={events} 
          onFilteredEventsChange={setDisplayEvents}
        />
      )}

      {/* Events Grid */}
      {displayEvents.length === 0 && events.length > 0 ? (
        <Empty
          title="No events match your search"
          description="Try adjusting your search or filters."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {displayEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}

