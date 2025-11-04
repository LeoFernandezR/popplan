export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO 8601 date string
  time: string; // Time string (e.g., "19:00")
  location: {
    name: string;
    address: string;
    city: string;
    country: string;
  };
  image: string; // URL to event image
  capacity: number;
  availableTickets: number;
  price: number; // Price in cents (for precision)
  category?: string;
  tags?: string[];
  organizer?: {
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export type EventListResponse = Event[];
export type EventDetailResponse = Event;
