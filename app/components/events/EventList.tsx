"use client";

import { Empty } from "@/app/components/ui/Empty";
import { Error } from "@/app/components/ui/Error";
import { LoadingSkeleton } from "@/app/components/ui/Loading";
import type { Event } from "@/app/lib/types";
import { fetchEvents } from "@/app/lib/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { EventCard } from "./EventCard";
import { EventSearch } from "./EventSearch";

interface EventListProps {
  initialEvents?: Event[];
}

export function EventList({ initialEvents }: EventListProps) {
  const {
    data: events,
    isLoading,
    isError,
    error,
    refetch: refetchEvents,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    initialData: initialEvents,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  console.log(events);

  const [displayEvents, setDisplayEvents] = useState<Event[]>(events || []);

  if (isLoading && !events) {
    return <LoadingSkeleton count={6} />;
  }

  if (isError || error) {
    return (
      <Error
        message={error.message || "An error occurred while fetching events."}
        onRetry={() => {
          refetchEvents();
        }}
      />
    );
  }

  if (!events && !isLoading) {
    return (
      <Empty
        title="No events found"
        description="Check back later for new events."
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      {events!.length > 0 && (
        <EventSearch
          events={events!}
          onFilteredEventsChange={setDisplayEvents}
        />
      )}

      {/* Events Grid */}
      {displayEvents.length === 0 ? (
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
  );
}
