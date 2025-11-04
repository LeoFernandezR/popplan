import { Card } from "@/app/components/ui/Card";
import { Empty } from "@/app/components/ui/Empty";
import { getUserBookings } from "@/app/lib/utils/mock-data";
import type { Metadata } from "next";
import Image from "next/image";
import { formatPrice } from "../lib/utils";

export const metadata: Metadata = {
  title: "My Bookings - PopPlan",
  description: "View your event bookings",
};

// SSR: Fetch data on each request
export default async function DashboardPage() {
  // TODO: In a real app, get userId from session/auth
  const userId = "user-123";
  const bookings = getUserBookings(userId);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          My Bookings
        </h1>
        <p className="mt-2 text-gray-600">View all your event bookings</p>
      </div>

      {bookings.length === 0 ? (
        <Empty
          title="No bookings yet"
          description="Start exploring events and make your first booking!"
          actionLabel="Browse Events"
          actionHref="/events"
        />
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <Card key={booking.id} hover>
              <div className="flex flex-col gap-6 sm:flex-row">
                {/* Event Image */}
                <div className="relative h-32 w-full overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-48">
                  {booking.eventImage ? (
                    <Image
                      src={booking.eventImage}
                      alt={booking.eventTitle}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 192px"
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

                {/* Booking Details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {booking.eventTitle}
                    </h3>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
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
                        <span>{formatDate(booking.eventDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span>
                          {booking.tickets} ticket
                          {booking.tickets !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-600">Total:</span>
                      <span className="ml-2 text-lg font-bold text-gray-900">
                        {formatPrice(booking.totalPrice)}
                      </span>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
