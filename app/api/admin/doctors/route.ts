import { type NextRequest, NextResponse } from "next/server"

const demoDoctors = [
  {
    _id: "doctor_001",
    name: "Dr. Alfaz Ahmed",
    email: "dr.ahmed@docspot.com",
    specialization: "Surgeon",
    isApproved: "approved",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    _id: "doctor_002",
    name: "Dr. Saleh Mahmud",
    email: "dr.mahmud@docspot.com",
    specialization: "Neurologist",
    isApproved: "approved",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    _id: "doctor_003",
    name: "Dr. Farid Uddin",
    email: "dr.farid@docspot.com",
    specialization: "Dermatologist",
    isApproved: "pending",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ doctors: demoDoctors })
  } catch (error) {
    console.error("Get admin doctors error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
