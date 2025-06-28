import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Demo accounts for testing
const demoAccounts = [
  {
    id: "admin_001",
    name: "Admin User",
    email: "admin@docspot.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "patient_001",
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    role: "patient",
  },
  {
    id: "patient_002",
    name: "Sarah Smith",
    email: "sarah.smith@example.com",
    password: "password123",
    role: "patient",
  },
  {
    id: "doctor_001",
    name: "Dr. Alfaz Ahmed",
    email: "dr.ahmed@docspot.com",
    password: "doctor123",
    role: "doctor",
    specialization: "Surgeon",
  },
  {
    id: "doctor_002",
    name: "Dr. Saleh Mahmud",
    email: "dr.mahmud@docspot.com",
    password: "doctor123",
    role: "doctor",
    specialization: "Neurologist",
  },
  {
    id: "doctor_003",
    name: "Dr. Farid Uddin",
    email: "dr.farid@docspot.com",
    password: "doctor123",
    role: "doctor",
    specialization: "Dermatologist",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Find user in demo accounts
    const user = demoAccounts.find((account) => account.email === email && account.password === password)

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      process.env.JWT_SECRET || "demo-secret-key",
      { expiresIn: "7d" },
    )

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    const response = NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
      token,
    })

    // Set HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
