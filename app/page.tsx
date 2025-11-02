import Link from 'next/link'
import { Button } from '@/app/components/ui/Button'

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Discover Local Events
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Find and book amazing events happening near you. From concerts to workshops,
          discover your next adventure.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/events">
            <Button size="lg">Browse Events</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              View Bookings
            </Button>
          </Link>
        </div>
      </div>

      {/* Optional: Featured Events Section */}
      <div className="mt-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Browse Events</h3>
              <p className="mt-2 text-sm text-gray-600">
                Explore a wide variety of local events happening in your area
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Select & Book</h3>
              <p className="mt-2 text-sm text-gray-600">
                Choose your event and book tickets with a few simple clicks
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Enjoy</h3>
              <p className="mt-2 text-sm text-gray-600">
                Attend your event and have a great time!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
