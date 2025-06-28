// Demo data seeding script for DOCSPOT
const { MongoClient } = require("mongodb")
const bcrypt = require("bcryptjs")

const MONGODB_URI = process.env.MONGODB_URI || "your-mongodb-uri-here"

const demoUsers = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    phone: "+1234567890",
    gender: "male",
    role: "patient",
    bloodType: "O+",
    isActive: true,
    appointments: [],
  },
  {
    name: "Sarah Smith",
    email: "sarah.smith@example.com",
    password: "password123",
    phone: "+1234567891",
    gender: "female",
    role: "patient",
    bloodType: "A+",
    isActive: true,
    appointments: [],
  },
  {
    name: "Admin User",
    email: "admin@docspot.com",
    password: "admin123",
    phone: "+1234567892",
    gender: "male",
    role: "admin",
    isActive: true,
    appointments: [],
  },
]

const demoDoctors = [
  {
    name: "Dr. Alfaz Ahmed",
    email: "dr.ahmed@docspot.com",
    password: "doctor123",
    phone: "+1234567893",
    specialization: "Surgeon",
    ticketPrice: 150,
    role: "doctor",
    qualifications: [
      { degree: "MBBS", institution: "Dhaka Medical College", year: 2010 },
      { degree: "MS Surgery", institution: "BSMMU", year: 2015 },
    ],
    experiences: [
      {
        position: "Senior Surgeon",
        hospital: "Mount Adora Hospital",
        startDate: new Date("2018-01-01"),
        isCurrent: true,
      },
    ],
    bio: "Experienced surgeon with 10+ years of practice",
    about: "Dr. Alfaz Ahmed is a highly experienced surgeon specializing in minimally invasive procedures.",
    timeSlots: [
      { day: "monday", startTime: "09:00", endTime: "17:00", isAvailable: true },
      { day: "tuesday", startTime: "09:00", endTime: "17:00", isAvailable: true },
      { day: "wednesday", startTime: "09:00", endTime: "17:00", isAvailable: true },
      { day: "thursday", startTime: "09:00", endTime: "17:00", isAvailable: true },
      { day: "friday", startTime: "09:00", endTime: "17:00", isAvailable: true },
    ],
    reviews: [],
    averageRating: 4.8,
    totalRating: 272,
    isApproved: "approved",
    appointments: [],
    isActive: true,
  },
  {
    name: "Dr. Saleh Mahmud",
    email: "dr.mahmud@docspot.com",
    password: "doctor123",
    phone: "+1234567894",
    specialization: "Neurologist",
    ticketPrice: 200,
    role: "doctor",
    qualifications: [
      { degree: "MBBS", institution: "Chittagong Medical College", year: 2008 },
      { degree: "MD Neurology", institution: "BSMMU", year: 2013 },
    ],
    experiences: [
      {
        position: "Senior Neurologist",
        hospital: "Mount Adora Hospital",
        startDate: new Date("2015-01-01"),
        isCurrent: true,
      },
    ],
    bio: "Specialist in neurological disorders",
    about: "Dr. Saleh Mahmud is an expert neurologist with extensive experience in treating neurological conditions.",
    timeSlots: [
      { day: "monday", startTime: "10:00", endTime: "18:00", isAvailable: true },
      { day: "tuesday", startTime: "10:00", endTime: "18:00", isAvailable: true },
      { day: "wednesday", startTime: "10:00", endTime: "18:00", isAvailable: true },
      { day: "thursday", startTime: "10:00", endTime: "18:00", isAvailable: true },
      { day: "friday", startTime: "10:00", endTime: "18:00", isAvailable: true },
    ],
    reviews: [],
    averageRating: 4.9,
    totalRating: 189,
    isApproved: "approved",
    appointments: [],
    isActive: true,
  },
]

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db("docspot")

    // Clear existing data
    await db.collection("users").deleteMany({})
    await db.collection("doctors").deleteMany({})
    console.log("Cleared existing data")

    // Hash passwords and insert users
    const hashedUsers = await Promise.all(
      demoUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 12),
        createdAt: new Date(),
      })),
    )

    await db.collection("users").insertMany(hashedUsers)
    console.log("Inserted demo users")

    // Hash passwords and insert doctors
    const hashedDoctors = await Promise.all(
      demoDoctors.map(async (doctor) => ({
        ...doctor,
        password: await bcrypt.hash(doctor.password, 12),
        createdAt: new Date(),
      })),
    )

    await db.collection("doctors").insertMany(hashedDoctors)
    console.log("Inserted demo doctors")

    console.log("Demo data seeded successfully!")
    console.log("\nDemo Login Credentials:")
    console.log("Patient: john.doe@example.com / password123")
    console.log("Patient: sarah.smith@example.com / password123")
    console.log("Doctor: dr.ahmed@docspot.com / doctor123")
    console.log("Doctor: dr.mahmud@docspot.com / doctor123")
    console.log("Admin: admin@docspot.com / admin123")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
