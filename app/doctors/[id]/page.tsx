"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Star, MapPin, Users, Award, Phone, Mail } from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { toast } from "@/hooks/use-toast"

export default function DoctorDetailPage() {
  const params = useParams()
  const doctorId = params.id as string
  const [doctor, setDoctor] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDoctorDetails()
  }, [doctorId])

  const fetchDoctorDetails = async () => {
    try {
      const response = await fetch(`/api/doctors/${doctorId}`)
      const data = await response.json()

      if (response.ok) {
        setDoctor(data.doctor)
      } else {
        console.error("Doctor not found")
      }
    } catch (error) {
      console.error("Error fetching doctor details:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select a date and time",
        variant: "destructive",
      })
      return
    }

    const user = localStorage.getItem("user")
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to book an appointment",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId,
          appointmentDate: selectedDate.toISOString().split("T")[0],
          appointmentTime: selectedTime,
          notes: "",
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Appointment Booked!",
          description: `Your appointment with ${doctor.name} has been successfully booked for ${selectedDate.toLocaleDateString()} at ${selectedTime}`,
        })
        setSelectedTime("")
        setSelectedDate(new Date())
      } else {
        toast({
          title: "Booking Failed",
          description: data.message || "Failed to book appointment",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <p className="text-xl text-gray-600">Loading doctor details...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <p className="text-xl text-gray-600">Doctor not found</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Doctor Profile Header */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Doctor Info */}
            <div className="lg:col-span-2">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative">
                  <Image
                    src={doctor.photo || "/placeholder.svg"}
                    alt={doctor.name}
                    width={200}
                    height={200}
                    className="w-48 h-48 object-cover rounded-2xl"
                  />
                  <Badge className="absolute top-4 right-4 bg-green-500">Available</Badge>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{doctor.name}</h1>
                    <p className="text-xl text-primary font-medium">{doctor.specialty}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">{doctor.avgRating}</span>
                      <span className="ml-1 text-gray-600">({doctor.totalRating} reviews)</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-5 w-5 mr-1" />
                      {doctor.totalPatients}+ patients
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2" />
                      {doctor.hospital}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Award className="h-5 w-5 mr-2" />
                      {doctor.experience} experience
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div>
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-primary">${doctor.ticketPrice}</div>
                    <div className="text-gray-600">Consultation Fee</div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border"
                        disabled={(date) => date < new Date()}
                      />
                    </div>

                    {selectedDate && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Available Times</label>
                        <div className="grid grid-cols-3 gap-2">
                          {doctor.timeSlots[0]?.slots.map((time: string) => (
                            <Button
                              key={time}
                              variant={selectedTime === time ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedTime(time)}
                              className="text-xs"
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleBookAppointment}
                      disabled={!selectedDate || !selectedTime}
                    >
                      Book Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Details Tabs */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="about" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">About Dr. {doctor.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{doctor.about}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Qualifications</h3>
                  <ul className="space-y-2">
                    {doctor.qualifications.map((qualification: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <Award className="h-4 w-4 text-primary mr-2" />
                        {qualification}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Professional Experience</h3>
                  <div className="space-y-4">
                    {doctor.experiences.map((exp: any, index: number) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <h4 className="font-semibold">{exp.position}</h4>
                        <p className="text-gray-600">{exp.hospital}</p>
                        <p className="text-sm text-gray-500">{exp.duration}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <div className="grid gap-6">
                {doctor.reviews.map((review: any) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold">{review.patientName}</h4>
                          <div className="flex items-center mt-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Weekly Schedule</h3>
                  <div className="space-y-4">
                    {doctor.timeSlots.map((schedule: any) => (
                      <div key={schedule.day} className="flex items-center justify-between py-2 border-b">
                        <span className="font-medium">{schedule.day}</span>
                        <div className="flex flex-wrap gap-2">
                          {schedule.slots.map((slot: string) => (
                            <Badge key={slot} variant="outline">
                              {slot}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  )
}
