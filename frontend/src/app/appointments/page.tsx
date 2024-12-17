'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Appointment {
  id: number
  title: string
  datetime: string
  status: string
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    // TODO: Fetch appointments from API
    const fetchAppointments = async () => {
      // Placeholder data
      setAppointments([
        {
          id: 1,
          title: 'Doctor Appointment',
          datetime: '2024-03-20T10:00:00',
          status: 'confirmed',
        },
        {
          id: 2,
          title: 'Dental Checkup',
          datetime: '2024-03-22T14:30:00',
          status: 'pending',
        },
      ])
    }

    fetchAppointments()
  }, [])

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Appointments</h1>
        <Link
          href="/appointments/new"
          className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
        >
          New Appointment
        </Link>
      </div>
      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="rounded-lg border p-4 hover:bg-muted/50"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{appointment.title}</h2>
              <span
                className={`rounded-full px-3 py-1 text-sm ${
                  appointment.status === 'confirmed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {appointment.status}
              </span>
            </div>
            <p className="mt-2 text-muted-foreground">
              {new Date(appointment.datetime).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
} 