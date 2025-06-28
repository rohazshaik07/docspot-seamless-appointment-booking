import { type NextRequest, NextResponse } from "next/server"

const demoUsers = [
  {
    _id: "user_001",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "patient",
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    _id: "user_002",
    name: "Sarah Smith",
    email: "sarah.smith@example.com",
    role: "patient",
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    _id: "admin_001",
    name: "Admin User",
    email: "admin@docspot.com",
    role: "admin",
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ users: demoUsers })
  } catch (error) {
    console.error("Get admin users error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
