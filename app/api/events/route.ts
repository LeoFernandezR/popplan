import {
  createSuccessResponse,
  createInternalErrorResponse,
} from "@/app/lib/utils/api-response";
import { getAllEvents } from "@/app/lib/utils/mock-data";
import type { EventListResponse } from "@/app/lib/types/event";

/**
 * GET /api/events
 * Returns a list of all events
 */
export async function GET() {
  try {
    const events = getAllEvents();

    const response: EventListResponse = events;

    return createSuccessResponse(response);
  } catch (error) {
    console.error("Error fetching events:", error);
    return createInternalErrorResponse("Failed to fetch events");
  }
}
