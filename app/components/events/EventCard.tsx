"use client";
import { Card } from "@/app/components/ui/Card";
import { useUserStore } from "@/app/lib/store";
import type { Event } from "@/app/lib/types";
import { formatDate, formatPrice } from "@/app/lib/utils";
import { deleteEvent } from "@/app/lib/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteEventMutate } = useMutation({
    mutationFn: deleteEvent,
    mutationKey: ["deleteEvent"],
  });

  const handleDelete = async () => {
    try {
      const newEvents = await deleteEventMutate(event.id);

      queryClient.setQueryData<Event[]>(["events"], () => {
        return newEvents;
      });
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const user = useUserStore((state) => state.user);
  const isAdmin = useUserStore((state) => state.isAdmin);

  return (
    <div className="relative transition-transform duration-200 hover:scale-[1.02]">
      {user && isAdmin && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 rounded-full bg-white border border-gray-200 p-1 text-black hover:bg-red-300 cursor-pointer z-10"
        >
          <svg
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      <Link
        href={`/events/${event.id}`}
        className="h-full"
        aria-label={`View details for ${event.title} on ${formatDate(
          event.date
        )}`}
      >
        <Card hover className="h-full">
          <article className="flex flex-col gap-4 p-2">
            {/* Event Image */}
            <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-200">
              {event.image ? (
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                  <svg
                    className="h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Event Info */}
            <div className="flex flex-1 flex-col gap-2">
              <h3 className="line-clamp-2 text-xl font-semibold text-gray-900">
                {event.title}
              </h3>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{formatDate(event.date)}</span>
                <span>•</span>
                <span>{event.time}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="line-clamp-1">{event.location.name}</span>
              </div>

              {/* Price and Availability */}
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(event.price)}
                </span>
                <span className="text-xs text-gray-500">
                  {event.availableTickets} left
                </span>
              </div>
            </div>
          </article>
        </Card>
      </Link>
    </div>
  );
}
