import { Button } from "@/components/ui/button"
import { CheckCircle, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function About() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <Image
              src="https://plus.unsplash.com/premium_photo-1661766718556-13c2efac1388?w=600&h=500&fit=crop"
              alt="About our healthcare services"
              width={600}
              height={500}
              className="rounded-2xl shadow-lg w-full h-auto"
              unoptimized
            />
            <div className="absolute inset-0 bg-primary/10 rounded-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Button size="lg" className="rounded-full w-16 h-16 p-0">
                <Play className="h-6 w-6 ml-1" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Proud to be one of the nations best</h2>
              <p className="text-lg text-gray-600">
                For 30 years in a row, U.S. News & World Report has recognized us as one of the best publics hospitals
                in the Nation and #1 in Texas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, nemo?
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-gray-700">Award winning care</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-gray-700">Best in class physicians</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-gray-700">End to end service</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-gray-700">Cutting edge technology</span>
              </div>
            </div>

            <Button size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h3>
            <p className="text-lg text-gray-600">Meet the experts leading our healthcare innovation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Image
                src="https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?w=300&h=300&fit=crop&crop=face"
                alt="Dr. John Smith - Chief Medical Officer"
                width={300}
                height={300}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                unoptimized
              />
              <h4 className="text-lg font-semibold text-gray-900">Dr. John Smith</h4>
              <p className="text-primary">Chief Medical Officer</p>
            </div>
            <div className="text-center">
              <Image
                src="https://plus.unsplash.com/premium_photo-1661766718556-13c2efac1388?w=300&h=300&fit=crop&crop=face"
                alt="Dr. Sarah Wilson - Head of Surgery"
                width={300}
                height={300}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                unoptimized
              />
              <h4 className="text-lg font-semibold text-gray-900">Dr. Sarah Wilson</h4>
              <p className="text-primary">Head of Surgery</p>
            </div>
            <div className="text-center">
              <Image
                src="https://plus.unsplash.com/premium_photo-1661764570116-b1b0c2c4e4d5?w=300&h=300&fit=crop&crop=face"
                alt="Dr. Michael Brown - Director of Research"
                width={300}
                height={300}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                unoptimized
              />
              <h4 className="text-lg font-semibold text-gray-900">Dr. Michael Brown</h4>
              <p className="text-primary">Director of Research</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
