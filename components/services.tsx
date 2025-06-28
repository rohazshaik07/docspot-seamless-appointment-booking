import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Baby, Brain, Flame } from "lucide-react"
import Link from "next/link"

const services = [
  {
    id: 1,
    title: "Cancer Care",
    description:
      "World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.",
    icon: Heart,
    features: ["Free Consultation", "Emergency Care", "Qualified Doctors"],
  },
  {
    id: 2,
    title: "Labor & Delivery",
    description: "Comprehensive maternity care with experienced professionals and modern facilities.",
    icon: Baby,
    features: ["Prenatal Care", "Natural Birth", "Emergency Support"],
  },
  {
    id: 3,
    title: "Heart & Vascular",
    description: "Expert cardiovascular care from prevention to advanced surgical procedures.",
    icon: Heart,
    features: ["Heart Surgery", "Preventive Care", "Emergency Services"],
  },
  {
    id: 4,
    title: "Mental Health",
    description: "Comprehensive mental health services with qualified psychiatrists and therapists.",
    icon: Brain,
    features: ["Therapy Sessions", "Psychiatric Care", "Support Groups"],
  },
  {
    id: 5,
    title: "Neurology",
    description: "Advanced neurological care for brain and nervous system disorders.",
    icon: Brain,
    features: ["Brain Surgery", "Stroke Care", "Neurological Tests"],
  },
  {
    id: 6,
    title: "Burn Treatment",
    description: "Specialized burn care with advanced treatment options and rehabilitation.",
    icon: Flame,
    features: ["Emergency Care", "Skin Grafts", "Rehabilitation"],
  },
]

export function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our medical services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            World-class care for everyone. Our health System offers unmatched, expert health care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                  </div>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="group-hover:bg-primary group-hover:text-white transition-colors bg-transparent"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
