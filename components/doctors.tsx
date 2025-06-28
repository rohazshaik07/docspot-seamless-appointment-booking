import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const doctors = [
  {
    id: "01",
    name: "Dr. Alfaz Ahmed",
    specialty: "Surgeon",
    avgRating: 4.8,
    totalRating: 272,
    photo: "https://plus.unsplash.com/premium_photo-1661766718556-13c2efac1388?w=400&h=400&fit=crop&crop=face",
    totalPatients: 1500,
    hospital: "Mount Adora Hospital, Sylhet.",
  },
  {
    id: "02",
    name: "Dr. Saleh Mahmud",
    specialty: "Neurologist",
    avgRating: 4.8,
    totalRating: 272,
    photo: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?w=400&h=400&fit=crop&crop=face",
    totalPatients: 1500,
    hospital: "Mount Adora Hospital, Sylhet.",
  },
  {
    id: "03",
    name: "Dr. Farid Uddin",
    specialty: "Dermatologist",
    avgRating: 4.8,
    totalRating: 272,
    photo: "https://plus.unsplash.com/premium_photo-1661764570116-b1b0c2c4e4d5?w=400&h=400&fit=crop&crop=face",
    totalPatients: 1500,
    hospital: "Mount Adora Hospital, Sylhet.",
  },
  {
    id: "04",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    avgRating: 4.9,
    totalRating: 189,
    photo: "https://plus.unsplash.com/premium_photo-1661766718556-13c2efac1388?w=400&h=400&fit=crop&crop=face",
    totalPatients: 1200,
    hospital: "City General Hospital, Dhaka.",
  },
  {
    id: "05",
    name: "Dr. Michael Chen",
    specialty: "Pediatrician",
    avgRating: 4.7,
    totalRating: 156,
    photo: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?w=400&h=400&fit=crop&crop=face",
    totalPatients: 980,
    hospital: "Children's Medical Center, Chittagong.",
  },
  {
    id: "06",
    name: "Dr. Emily Rodriguez",
    specialty: "Orthopedic Surgeon",
    avgRating: 4.8,
    totalRating: 203,
    photo: "https://plus.unsplash.com/premium_photo-1661764570116-b1b0c2c4e4d5?w=400&h=400&fit=crop&crop=face",
    totalPatients: 1350,
    hospital: "Bone & Joint Institute, Sylhet.",
  },
]

export function Doctors() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our great doctors</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            World-class care for everyone. Our health System offers unmatched, expert health care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <Image
                  src={doctor.photo || "/placeholder.svg"}
                  alt={doctor.name}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                  priority={Number.parseInt(doctor.id) <= 3}
                  unoptimized
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
                </div>

                <Button className="w-full" asChild>
                  <Link href={`/doctors/${doctor.id}`}>Book Appointment</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/doctors">View All Doctors</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
