import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Muhibur Rahman",
    location: "Sylhet",
    rating: 5,
    comment:
      "I have taken medical services from them. They treat so well and they are providing the best medical services.",
    avatar: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Fatima Ahmed",
    location: "Dhaka",
    rating: 5,
    comment: "Excellent service and professional staff. The doctors are very knowledgeable and caring.",
    avatar: "https://plus.unsplash.com/premium_photo-1661766718556-13c2efac1388?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "John Smith",
    location: "Chittagong",
    rating: 5,
    comment: "Outstanding healthcare facility with modern equipment and experienced doctors. Highly recommended!",
    avatar: "https://plus.unsplash.com/premium_photo-1661764570116-b1b0c2c4e4d5?w=100&h=100&fit=crop&crop=face",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What our patients say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            World-class care for everyone. Our health System offers unmatched, expert health care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.comment}"</p>

                <div className="flex items-center">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    unoptimized
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
