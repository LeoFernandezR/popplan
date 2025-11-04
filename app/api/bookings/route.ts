import {
  createSuccessResponse,
  createErrorResponse,
  createInternalErrorResponse,
} from "@/app/lib/utils/api-response";
import {
  findEventById,
  getUserBookings,
  mockBookings,
} from "@/app/lib/utils/mock-data";
import type {
  BookingCreatePayload,
  BookingListResponse,
  BookingCreateResponse,
  Booking,
  BookingStatus,
} from "@/app/lib/types/booking";

/**
 * GET /api/bookings
 * Returns user's bookings
 * Note: In a real app, this would use authentication to get the current user
 */
export async function GET() {
  try {
    // TODO: Get userId from session/auth
    const userId = "user-123";
    const bookings = getUserBookings(userId);

    const response: BookingListResponse = {
      bookings,
      total: bookings.length,
    };

    return createSuccessResponse(response);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return createInternalErrorResponse("Failed to fetch bookings");
  }
}

/**
 * POST /api/bookings
 * Creates a new booking
 */
export async function POST(request: Request) {
  try {
    const body: BookingCreatePayload = await request.json();

    // Validate required fields
    if (!body.eventId || !body.name || !body.email || !body.tickets) {
      return createErrorResponse("Missing required fields", 400);
    }

    if (body.tickets <= 0) {
      return createErrorResponse(
        "Number of tickets must be greater than 0",
        400
      );
    }

    // Find the event
    const event = findEventById(body.eventId);
    if (!event) {
      return createErrorResponse("Event not found", 404);
    }

    // Check ticket availability
    if (event.availableTickets < body.tickets) {
      return createErrorResponse(
        `Only ${event.availableTickets} tickets available`,
        400
      );
    }

    // TODO: In a real app, get userId from session/auth
    const userId = "user-123";

    // Create booking
    const booking: Booking = {
      id: `booking-${Date.now()}`,
      eventId: body.eventId,
      userId,
      eventTitle: event.title,
      eventDate: event.date,
      eventImage: event.image,
      tickets: body.tickets,
      totalPrice: event.price * body.tickets,
      status: "confirmed" as BookingStatus,
      attendeeInfo: {
        name: body.name,
        email: body.email,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // In a real app, save to database and update event availability
    // For now, we'll just return the booking
    // mockBookings.push(booking) // Uncomment if you want to persist in mock data

    const response: BookingCreateResponse = {
      booking,
      message: "Booking created successfully",
    };

    return createSuccessResponse(response, 201);
  } catch (error) {
    console.error("Error creating booking:", error);

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return createErrorResponse("Invalid JSON in request body", 400);
    }

    return createInternalErrorResponse("Failed to create booking");
  }
}
