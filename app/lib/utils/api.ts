import {
  BookingCreatePayload,
  BookingCreateResponse,
  BookingListResponse,
  EventListResponse,
} from "../types";

export async function fetchBookings(): Promise<BookingListResponse> {
  const response = await fetch("/api/bookings");

  if (!response.ok) {
    throw new Error(`Failed to fetch bookings: ${response.statusText}`);
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error.message || "Failed to fetch bookings");
  }

  const data: BookingListResponse = result.data;

  return data;
}

export async function createBooking(payload: BookingCreatePayload) {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok || result.error) {
    throw new Error(
      result.error?.message ||
        `Failed to create booking: ${response.statusText}`
    );
  }

  const data: BookingCreateResponse = result.data;
  const newBooking = data.booking;
  return newBooking;
}

export async function fetchEvents() {
  const response = await fetch("/api/events");

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.statusText}`);
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error.message || "Failed to fetch events");
  }

  const data: EventListResponse = result.data;

  return data;
}

export async function fetchEventById(id: string) {
  const response = await fetch(`/api/events/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Event not found");
    }
    throw new Error(`Failed to fetch event: ${response.statusText}`);
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error.message || "Failed to fetch event");
  }

  const event = result.data.event;
  return event;
}
