import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phone, gender, role } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Name, email and password are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("docspot")

    // Check if user already exists in either collection
    const existingUser = await db.collection("users").findOne({ email })
    const existingDoctor = await db.collection("doctors").findOne({ email })

    if (existingUser || existingDoctor) {
      return NextResponse.json({ message: "User already exists with this email" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    const userData = {
      name,
      email,
      password: hashedPassword,
      phone: phone || "",
      gender: gender || "male",
      role: role || "patient",
      createdAt: new Date(),
      isActive: true,
    }

    let result
    if (role === "doctor") {
      // Add doctor-specific fields
      const doctorData = {
        ...userData,
        specialization: "",
        ticketPrice: 0,
        qualifications: [],
        experiences: [],
        bio: "",
        about: "",
        timeSlots: [],
        reviews: [],
        averageRating: 0,
        totalRating: 0,
        isApproved: "pending",
        appointments: [],
      }
      result = await db.collection("doctors").insertOne(doctorData)
    } else {
      // Add patient-specific fields
      const patientData = {
        ...userData,
        bloodType: "O+",
        appointments: [],
      }
      result = await db.collection("users").insertOne(patientData)
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: result.insertedId,
        email,
        role: role || "patient",
        name,
      },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" },
    )

    const response = NextResponse.json({
      message: "Account created successfully",
      user: {
        _id: result.insertedId,
        name,
        email,
        role: role || "patient",
      },
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
    console.error("Signup error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
