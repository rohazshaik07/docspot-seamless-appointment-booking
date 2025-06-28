import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const services = [
  {
    id: 1,
    name: "Cancer Care",
    description: "World-class cancer treatment with cutting-edge technology and compassionate care.",
    icon: "/assets/images/icon01.png",
    features: ["Advanced Diagnostics", "Personalized Treatment", "24/7 Support", "Multidisciplinary Team"],
    fullDescription:
      "Our comprehensive cancer care program combines the latest medical advances with compassionate, personalized care. We offer a full range of services from prevention and early detection to advanced treatment options and survivorship support.",
    specialists: ["Oncologists", "Radiation Therapists", "Surgical Oncologists", "Palliative Care Specialists"],
    technologies: ["Linear Accelerator", "PET/CT Imaging", "Robotic Surgery", "Immunotherapy"],
  },
  {
    id: 2,
    name: "Labor & Delivery",
    description: "Comprehensive maternity care with experienced specialists and modern facilities.",
    icon: "/assets/images/icon02.png",
    features: ["Prenatal Care", "Safe Delivery", "Postnatal Support", "NICU Services"],
    fullDescription:
      "Our maternity services provide comprehensive care throughout your pregnancy journey. From prenatal care to delivery and postpartum support, our experienced team ensures the health and safety of both mother and baby.",
    specialists: ["Obstetricians", "Midwives", "Neonatologists", "Lactation Consultants"],
    technologies: ["4D Ultrasound", "Fetal Monitoring", "NICU", "Labor & Delivery Suites"],
  },
  {
    id: 3,
    name: "Heart & Vascular",
    description: "Expert cardiovascular care from prevention to complex surgical procedures.",
    icon: "/assets/images/icon03.png",
    features: ["Heart Surgery", "Preventive Care", "Emergency Services", "Rehabilitation"],
    fullDescription:
      "Our cardiovascular program offers comprehensive heart and vascular care, from preventive screenings to complex surgical procedures. We use the latest technology and minimally invasive techniques whenever possible.",
    specialists: ["Cardiologists", "Cardiac Surgeons", "Vascular Surgeons", "Electrophysiologists"],
    technologies: ["Cardiac Catheterization", "Echocardiography", "CT Angiography", "Robotic Heart Surgery"],
  },
  {
    id: 4,
    name: "Mental Health",
    description: "Comprehensive mental health services with qualified psychiatrists and therapists.",
    icon: "/assets/images/doctor-img01.png",
    features: ["Therapy Sessions", "Medication Management", "Crisis Support", "Group Therapy"],
    fullDescription:
      "Our mental health services provide comprehensive care for a wide range of mental health conditions. We offer both inpatient and outpatient services with a focus on evidence-based treatments and personalized care plans.",
    specialists: ["Psychiatrists", "Psychologists", "Licensed Therapists", "Social Workers"],
    technologies: ["Teletherapy", "Biofeedback", "TMS Therapy", "Group Therapy Programs"],
  },
  {
    id: 5,
    name: "Neurology",
    description: "Advanced neurological care for brain, spine, and nervous system disorders.",
    icon: "/assets/images/doctor-img02.png",
    features: ["Brain Surgery", "Stroke Care", "Neurological Rehabilitation", "Pain Management"],
    fullDescription:
      "Our neurology department provides comprehensive care for disorders of the brain, spine, and nervous system. We offer both medical and surgical treatments using the most advanced techniques and technologies.",
    specialists: ["Neurologists", "Neurosurgeons", "Neuropsychologists", "Rehabilitation Specialists"],
    technologies: ["MRI/CT Imaging", "EEG Monitoring", "Stereotactic Surgery", "Deep Brain Stimulation"],
  },
  {
    id: 6,
    name: "Burn Treatment",
    description: "Specialized burn care with advanced treatment options and rehabilitation.",
    icon: "/assets/images/doctor-img03.png",
    features: ["Emergency Care", "Skin Grafting", "Rehabilitation", "Scar Management"],
    fullDescription:
      "Our burn center provides specialized care for patients with burn injuries. We offer comprehensive treatment from emergency care through rehabilitation, with a focus on minimizing scarring and maximizing function.",
    specialists: ["Burn Surgeons", "Plastic Surgeons", "Physical Therapists", "Occupational Therapists"],
    technologies: ["Hyperbaric Oxygen", "Laser Therapy", "Advanced Wound Care", "3D Skin Printing"],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Medical Services</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Comprehensive healthcare services delivered by expert medical professionals using state-of-the-art
              technology
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <Image
                      src={service.icon || "/placeholder.svg"}
                      alt={service.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{service.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-center">{service.description}</p>

                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Our Specialists</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.specialists.map((specialist, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {specialist}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, index) => (
                          <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-6 group">
                    Book Consultation
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help Choosing the Right Service?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our healthcare coordinators are here to help you find the right specialist and service for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/doctors">Find a Doctor</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
