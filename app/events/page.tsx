import type { Metadata } from "next";
import { EventList } from "@/app/components/events/EventList";
import { getAllEvents } from "@/app/lib/utils/mock-data";

export const metadata: Metadata = {
  title: "Events - PopPlan",
  description: "Browse all available local events",
};

export default async function EventsPage() {
  const events = getAllEvents();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          All Events
        </h1>
        <p className="mt-2 text-gray-600">
          Discover amazing events happening in your area
        </p>
      </div>
      <EventList initialEvents={events} />
    </div>
  );
}
