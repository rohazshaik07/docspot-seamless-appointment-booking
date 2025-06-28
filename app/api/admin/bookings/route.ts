import { type NextRequest, NextResponse } from "next/server"

// Demo bookings data
const demoBookings = [
  {
    _id: "booking_001",
    user: { name: "John Doe", email: "john.doe@example.com" },
    doctor: { name: "Dr. Alfaz Ahmed", specialization: "Surgeon" },
    appointmentDate: "2024-02-15T00:00:00.000Z",
    appointmentTime: "10:00",
    status: "confirmed",
    ticketPrice: 150,
    createdAt: "2024-01-10T00:00:00.000Z",
  },
  {
    _id: "booking_002",
    user: { name: "Sarah Smith", email: "sarah.smith@example.com" },
    doctor: { name: "Dr. Saleh Mahmud", specialization: "Neurologist" },
    appointmentDate: "2024-02-20T00:00:00.000Z",
    appointmentTime: "14:00",
    status: "pending",
    ticketPrice: 200,
    createdAt: "2024-01-12T00:00:00.000Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ bookings: demoBookings })
  } catch (error) {
    console.error("Get admin bookings error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
