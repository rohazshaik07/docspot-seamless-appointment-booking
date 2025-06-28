import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                We help patients live a <span className="text-primary">healthy</span>, longer life.
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Our health system offers unmatched, expert health care. From the lab to the clinic, we provide
                world-class care for everyone.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/doctors">
                  Request an Appointment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Play className="mr-2 h-5 w-5" />
                Watch Video
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-primary">30+</div>
                <div className="text-sm text-gray-600">Years of Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-gray-600">Clinic Locations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-gray-600">Patient Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Hero Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?w=400&h=300&fit=crop"
                    alt="Doctor consultation"
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg"
                    priority
                    unoptimized
                  />
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1661764570116-b1b0c2c4e4d5?w=400&h=200&fit=crop"
                    alt="Medical equipment"
                    width={200}
                    height={200}
                    className="w-full h-32 object-cover rounded-lg"
                    priority
                    unoptimized
                  />
                </div>
              </div>
              <div className="pt-8">
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1661766718556-13c2efac1388?w=400&h=400&fit=crop"
                    alt="Healthcare team"
                    width={200}
                    height={200}
                    className="w-full h-64 object-cover rounded-lg"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
