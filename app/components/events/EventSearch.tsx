"use client";

import React, { useState, useMemo } from "react";
import type { Event } from "@/app/lib/types";
import { cn } from "@/app/lib/utils/cn";

interface EventSearchProps {
  events: Event[];
  onFilteredEventsChange?: (filtered: Event[]) => void;
  className?: string;
}

export function EventSearch({
  events,
  onFilteredEventsChange,
  className,
}: EventSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get unique categories
  const categories = useMemo(() => {
    const cats = events
      .map((e) => e.category)
      .filter((cat): cat is string => !!cat);
    return ["all", ...Array.from(new Set(cats))];
  }, [events]);

  // Filter events
  const filteredEvents = useMemo(() => {
    let filtered = events;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.location.city.toLowerCase().includes(query) ||
          event.location.name.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (event) => event.category === selectedCategory
      );
    }

    return filtered;
  }, [events, searchQuery, selectedCategory]);

  // Notify parent of filtered events
  React.useEffect(() => {
    onFilteredEventsChange?.(filteredEvents);
  }, [filteredEvents, onFilteredEventsChange]);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search Input */}
      <div className="relative">
        <label htmlFor="event-search" className="sr-only">
          Search events
        </label>
        <input
          id="event-search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search events by title, description, or location..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          aria-label="Search events"
        />
        <svg
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <svg
              className="h-5 w-5"
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
      </div>

      {/* Category Filter */}
      {categories.length > 1 && (
        <div>
          <label htmlFor="category-filter" className="sr-only">
            Filter by category
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full form-select rounded-lg border text-gray-700 border-gray-300 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:w-auto"
            aria-label="Filter events by category"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Results Count */}
      {searchQuery || selectedCategory !== "all" ? (
        <p className="text-sm text-gray-600" aria-live="polite">
          Found {filteredEvents.length} event
          {filteredEvents.length !== 1 ? "s" : ""}
        </p>
      ) : null}
    </div>
  );
}
