"use client";

import React from "react";
import Image from "next/image";
import type { Event } from "@/app/lib/types";
import { BookingForm } from "@/app/components/forms/BookingForm";
import { Card } from "@/app/components/ui/Card";
import { Loading } from "@/app/components/ui/Loading";
import { Error } from "@/app/components/ui/Error";
import { formatDate, formatPrice } from "@/app/lib/utils";

interface EventDetailProps {
  event: Event | null;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function EventDetail({
  event,
  loading,
  error,
  onRetry,
}: EventDetailProps) {
  if (loading) {
    return <Loading text="Loading event details..." />;
  }

  if (error || !event) {
    return (
      <Error
        message={error || "Event not found"}
        onRetry={onRetry}
        retryLabel="Try Again"
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Event Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
          {event.title}
        </h1>

        {/* Event Image */}
        <div className="relative h-96 w-full overflow-hidden rounded-lg bg-gray-200">
          {event.image ? (
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              <svg
                className="h-24 w-24"
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
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">About</h2>
              <p className="text-gray-700 leading-relaxed">
                {event.description}
              </p>
            </div>
          </Card>

          {/* Event Details */}
          <Card>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Event Details
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg
                  className="mt-1 h-5 w-5 text-gray-500"
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
                <div>
                  <p className="font-medium text-gray-900">
                    {formatDate(event.date)}
                  </p>
                  <p className="text-sm text-gray-600">{event.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  className="mt-1 h-5 w-5 text-gray-500"
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
                <div>
                  <p className="font-medium text-gray-900">
                    {event.location.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {event.location.address}, {event.location.city},{" "}
                    {event.location.country}
                  </p>
                </div>
              </div>

              {event.organizer && (
                <div className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">Organized by</p>
                    <p className="text-sm text-gray-600">
                      {event.organizer.name}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <div className="sticky top-24">
              <div className="mb-6 space-y-2">
                <p className="text-3xl font-bold text-gray-900">
                  {formatPrice(event.price)}
                </p>
                <p className="text-sm text-gray-600">per ticket</p>
                <p className="text-sm text-gray-500">
                  {event.availableTickets} ticket
                  {event.availableTickets !== 1 ? "s" : ""} available
                </p>
              </div>

              <BookingForm
                eventId={event.id}
                eventTitle={event.title}
                price={event.price}
                availableTickets={event.availableTickets}
                onSuccess={() => {
                  // Success handled within BookingForm component
                  // It will show success message and redirect to dashboard
                }}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
