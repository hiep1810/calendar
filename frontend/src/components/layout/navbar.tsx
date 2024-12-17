import Link from 'next/link'
import { ThemeToggle } from '../theme-toggle'

export function Navbar() {
  return (
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
  )
} 