import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { EventDetail } from '@/app/components/events/EventDetail'
import { findEventById } from '@/app/lib/utils/mock-data'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

// SSR: Fetch data on each request
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const event = findEventById(id)

  if (!event) {
    return {
      title: 'Event Not Found - PopPlan',
    }
  }

  return {
    title: `${event.title} - PopPlan`,
    description: event.description,
  }
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params

  // Fetch event data on the server for SSR
  const event = findEventById(id)

  if (!event) {
    notFound()
  }

  // Note: In a real app, you'd fetch from API
  // For now, we're using the mock data directly
  // The EventDetail component will handle client-side state if needed

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <EventDetail event={event} />
    </div>
  )
}

