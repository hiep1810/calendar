import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/" className="text-xl font-bold">
            Appointment Scheduler
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/appointments" className="hover:underline">
              Appointments
            </Link>
            <Link href="/auth/login" className="hover:underline">
              Login
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-8">
        <h1 className="mb-8 text-4xl font-bold">Welcome to Appointment Scheduler</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-2xl font-semibold">Book an Appointment</h2>
            <p className="mb-4">Schedule your next appointment with ease.</p>
            <Link
              href="/appointments/new"
              className="inline-block rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
            >
              Book Now
            </Link>
          </div>
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-2xl font-semibold">View Your Schedule</h2>
            <p className="mb-4">Check and manage your upcoming appointments.</p>
            <Link
              href="/appointments"
              className="inline-block rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
            >
              View Schedule
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
} 