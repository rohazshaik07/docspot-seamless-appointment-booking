"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Search, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const doctors = [
  {
    id: "01",
    name: "Dr. Alfaz Ahmed",
    specialty: "Surgeon",
    avgRating: 4.8,
    totalRating: 272,
    photo: "/Youtube-Tutorials-MERN-Medicare-Booking-Website/frontend/src/assets/images/doctor-img01.png",
    totalPatients: 1500,
    hospital: "Mount Adora Hospital, Sylhet.",
    ticketPrice: 150,
    experience: "10+ years",
  },
  {
    id: "02",
    name: "Dr. Saleh Mahmud",
    specialty: "Neurologist",
    avgRating: 4.8,
    totalRating: 272,
    photo: "/Youtube-Tutorials-MERN-Medicare-Booking-Website/frontend/src/assets/images/doctor-img02.png",
    totalPatients: 1500,
    hospital: "Mount Adora Hospital, Sylhet.",
    ticketPrice: 200,
    experience: "15+ years",
  },
  {
    id: "03",
    name: "Dr. Farid Uddin",
    specialty: "Dermatologist",
    avgRating: 4.8,
    totalRating: 272,
    photo: "/Youtube-Tutorials-MERN-Medicare-Booking-Website/frontend/src/assets/images/doctor-img03.png",
    totalPatients: 1500,
    hospital: "Mount Adora Hospital, Sylhet.",
    ticketPrice: 120,
    experience: "8+ years",
  },
  // Add more doctors as needed
]

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")

  const specialties = ["All", "Surgeon", "Neurologist", "Dermatologist", "Cardiologist", "Pediatrician"]
  const locations = ["All", "Sylhet", "Dhaka", "Chittagong", "Rajshahi"]

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = !selectedSpecialty || selectedSpecialty === "All" || doctor.specialty === selectedSpecialty
    const matchesLocation =
      !selectedLocation || selectedLocation === "All" || doctor.hospital.includes(selectedLocation)

    return matchesSearch && matchesSpecialty && matchesLocation
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Find a Doctor</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Search and book appointments with our qualified healthcare professionals
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{filteredDoctors.length} doctors found</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <Image
                    src={doctor.photo || "/placeholder.svg"}
                    alt={doctor.name}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{doctor.avgRating}</span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{doctor.name}</h3>
                  <p className="text-primary font-medium mb-4">{doctor.specialty}</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      {doctor.avgRating} ({doctor.totalRating} reviews)
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {doctor.hospital}
                    </div>
                    <div className="text-sm text-gray-600">Experience: {doctor.experience}</div>
                    <div className="text-lg font-semibold text-primary">${doctor.ticketPrice}</div>
                  </div>

                  <Button className="w-full" asChild>
                    <Link href={`/doctors/${doctor.id}`}>View Profile & Book</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No doctors found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
