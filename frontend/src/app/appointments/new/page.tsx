'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewAppointmentPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    datetime: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement appointment creation
    console.log('New appointment:', formData)
    router.push('/appointments')
  }

  return (
    <div className="container mx-auto max-w-2xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Schedule New Appointment</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="mt-1 w-full rounded-md border p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="mt-1 w-full rounded-md border p-2"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Date and Time</label>
          <input
            type="datetime-local"
            value={formData.datetime}
            onChange={(e) =>
              setFormData({ ...formData, datetime: e.target.value })
            }
            className="mt-1 w-full rounded-md border p-2"
            required
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
          >
            Schedule Appointment
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md border px-4 py-2 hover:bg-muted"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
} 