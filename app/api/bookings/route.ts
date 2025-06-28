import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// In-memory storage for demo (in production, use MongoDB)
const bookings: any[] = []
let bookingIdCounter = 1

export async function POST(request: NextRequest) {
  try {
    const token =
      request.cookies.get("auth-token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "demo-secret-key") as any
    const { doctorId, appointmentDate, appointmentTime, notes } = await request.json()

    if (!doctorId || !appointmentDate || !appointmentTime) {
      return NextResponse.json({ message: "Doctor, date and time are required" }, { status: 400 })
    }

    // Get doctor details
    const doctorPrices: { [key: string]: number } = {
      "01": 150,
      "02": 200,
      "03": 120,
    }

    const booking = {
      id: bookingIdCounter++,
      doctorId,
      userId: decoded.userId,
      userName: decoded.name,
      userEmail: decoded.email,
      ticketPrice: doctorPrices[doctorId] || 150,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      status: "pending",
      isPaid: false,
      paymentId: "",
      notes: notes || "",
      prescription: "",
      createdAt: new Date(),
    }

    bookings.push(booking)

    return NextResponse.json({
      message: "Appointment booked successfully",
      bookingId: booking.id,
      booking,
    })
  } catch (error) {
    console.error("Booking error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const token =
      request.cookies.get("auth-token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "demo-secret-key") as any

    // Filter bookings for the current user
    const userBookings = bookings.filter((booking) => booking.userId === decoded.userId)

    return NextResponse.json({ bookings: userBookings })
  } catch (error) {
    console.error("Get bookings error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
