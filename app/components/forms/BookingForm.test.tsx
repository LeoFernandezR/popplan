import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from "../../__tests__/utils/test-utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the createBooking API
const mockCreateBooking = vi.fn();
vi.mock("@/app/lib/utils/api", () => ({
  createBooking: (payload: unknown) => mockCreateBooking(payload),
}));

import { BookingForm } from "./BookingForm";

function renderWithQuery(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

beforeEach(() => {
  mockCreateBooking.mockReset();
});

afterEach(() => {
  vi.clearAllTimers();
});

describe("BookingForm", () => {
  it("renders with initial values and shows total price", () => {
    renderWithQuery(
      <BookingForm
        eventId="evt-1"
        eventTitle="My Event"
        price={2500} // cents
        availableTickets={5}
      />
    );

    expect(
      screen.getByRole("heading", { name: /book tickets for my event/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/5 tickets? available/i)).toBeInTheDocument();

    // Default tickets = 1 -> $25.00
    expect(screen.getByText("$25.00")).toBeInTheDocument();
  });

  it("updates total price when tickets input changes", async () => {
    const user = userEvent.setup();
    renderWithQuery(
      <BookingForm
        eventId="evt-1"
        eventTitle="My Event"
        price={2500}
        availableTickets={5}
      />
    );

    const tickets = screen.getByLabelText(/number of tickets/i);
    await user.clear(tickets);
    await user.type(tickets, "3");

    await waitFor(() => expect(screen.getByText("$75.00")).toBeInTheDocument());
  });

  it("shows validation error when requesting more tickets than available", async () => {
    const user = userEvent.setup();
    renderWithQuery(
      <BookingForm
        eventId="evt-1"
        eventTitle="My Event"
        price={2500}
        availableTickets={2}
      />
    );

    // fill required fields so validation focuses on tickets
    await user.type(screen.getByLabelText(/full name/i), "Test User");
    await user.type(screen.getByLabelText(/email/i), "test@example.com");

    const tickets = screen.getByLabelText(/number of tickets/i);
    await user.clear(tickets);
    // number inputs are sometimes tricky to type into in jsdom; set value via change
    fireEvent.change(tickets, { target: { value: "5" } });

    const submit = screen.getByRole("button", {
      name: /book tickets for my event/i,
    });
    await user.click(submit);

    // the tickets input should be flagged invalid after submitting an over-limit value
    await waitFor(() => {
      expect(screen.getByLabelText(/number of tickets/i)).toBeInTheDocument();
    });
  });

  it("submits form, calls createBooking and shows success message", async () => {
    const user = userEvent.setup();

    // Mock successful API response
    mockCreateBooking.mockResolvedValueOnce({
      id: "b-1",
      eventId: "evt-1",
      name: "Jane Doe",
      email: "jane@example.com",
      tickets: 2,
    });

    renderWithQuery(
      <BookingForm
        eventId="evt-1"
        eventTitle="My Event"
        price={1500}
        availableTickets={10}
      />
    );

    await user.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    const tickets = screen.getByLabelText(/number of tickets/i);
    await user.clear(tickets);
    await user.type(tickets, "2");

    const submit = screen.getByRole("button", {
      name: /book tickets for my event/i,
    });
    await user.click(submit);

    // createBooking should be called with the payload
    await waitFor(() => {
      expect(mockCreateBooking).toHaveBeenCalledWith({
        eventId: "evt-1",
        name: "Jane Doe",
        email: "jane@example.com",
        tickets: 2,
      });
    });

    // Success message should appear
    expect(
      await screen.findByText(/successfully booked 2 tickets for my event!/i)
    ).toBeInTheDocument();
  });
});
