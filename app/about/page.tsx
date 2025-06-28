import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Award, Users, Heart, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description:
        "We treat every patient with empathy, respect, and dignity, ensuring comfort throughout their healthcare journey.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for the highest standards in medical care, continuously improving our services and outcomes.",
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Patient safety is our top priority, with rigorous protocols and quality measures in place.",
    },
    {
      icon: Users,
      title: "Teamwork",
      description: "Our multidisciplinary teams work together to provide comprehensive, coordinated care.",
    },
  ]

  const achievements = [
    { number: "30+", label: "Years of Excellence" },
    { number: "15+", label: "Clinic Locations" },
    { number: "500+", label: "Expert Doctors" },
    { number: "100K+", label: "Patients Served" },
  ]

  const features = [
    "Award-winning medical care",
    "State-of-the-art facilities",
    "24/7 emergency services",
    "Comprehensive health programs",
    "Advanced diagnostic technology",
    "Patient-centered approach",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">About DOCSPOT</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Dedicated to providing world-class healthcare services with compassion, innovation, and excellence
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Proud to be one of the nation's best healthcare providers
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  For over 30 years, DOCSPOT has been recognized as one of the leading healthcare institutions in the
                  region. We combine cutting-edge medical technology with compassionate care to deliver exceptional
                  outcomes for our patients.
                </p>
              </div>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" asChild>
                <Link href="/doctors">Meet Our Doctors</Link>
              </Button>
            </div>

            <div className="relative">
              <Image
                src="/assets/images/about.png"
                alt="About DOCSPOT"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">98%</div>
                  <div className="text-sm text-gray-600">Patient Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-lg text-gray-600">Numbers that reflect our commitment to excellence</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{achievement.number}</div>
                <div className="text-gray-600">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These values guide everything we do and shape the way we care for our patients and community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="text-center border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our experienced leadership team is dedicated to providing exceptional healthcare services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "Chief Medical Officer",
                image: "/assets/images/doctor-img01.png",
                description: "Leading our medical excellence initiatives with over 20 years of experience.",
              },
              {
                name: "Dr. Michael Chen",
                role: "Director of Operations",
                image: "/assets/images/doctor-img02.png",
                description: "Ensuring smooth operations and exceptional patient care across all departments.",
              },
              {
                name: "Dr. Emily Rodriguez",
                role: "Head of Research",
                image: "/assets/images/doctor-img03.png",
                description: "Pioneering medical research and innovative treatment methodologies.",
              },
            ].map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Quality Healthcare?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust DOCSPOT for their healthcare needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/doctors">Book Appointment</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
