import {
  createSuccessResponse,
  createNotFoundResponse,
  createInternalErrorResponse,
} from "@/app/lib/utils/api-response";
import { deleteEventById, findEventById } from "@/app/lib/utils/mock-data";
import type {
  EventDetailResponse,
  EventListResponse,
} from "@/app/lib/types/event";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/events/[id]
 * Returns details for a specific event
 */
export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const event = findEventById(id);

    if (!event) {
      return createNotFoundResponse("Event");
    }

    const response: EventDetailResponse = event;

    return createSuccessResponse(response);
  } catch (error) {
    console.error("Error fetching event:", error);
    return createInternalErrorResponse("Failed to fetch event");
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    if (!id) {
      return createInternalErrorResponse("Event ID is required for deletion");
    }
    const filteredEvents = deleteEventById(id);

    const response: EventListResponse = filteredEvents;

    return createSuccessResponse(response);
  } catch (error) {
    console.error("Error deleting event:", error);
    return createInternalErrorResponse("Failed to delete event");
  }
}
