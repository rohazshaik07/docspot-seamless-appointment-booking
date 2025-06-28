import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"

const faqs = [
  {
    question: "What is your medical care?",
    answer:
      "One Medical was founded on a better model of care one designed around patients needs that provides a higher level of quality and service affordably. We achieve this through innovative design, excellent customer service, and the efficient use of technology.",
  },
  {
    question: "What happens if I need to go to a hospital?",
    answer:
      "If you need hospital care, we'll coordinate with our network of partner hospitals to ensure you receive the best possible treatment. Our doctors will work closely with hospital specialists to manage your care.",
  },
  {
    question: "What happens if I need to go to a hospital?",
    answer:
      "Our medical team will coordinate your hospital care and ensure seamless communication between all healthcare providers involved in your treatment.",
  },
  {
    question: "Can I visit your medical office?",
    answer:
      "Yes, you can visit our medical offices. We have multiple locations and offer both scheduled appointments and walk-in consultations for urgent care needs.",
  },
  {
    question: "Does you provide urgent care?",
    answer:
      "Yes, we provide urgent care services for non-life-threatening medical conditions that require immediate attention. Our urgent care centers are equipped to handle a wide range of medical issues.",
  },
]

export function FAQ() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="relative">
            <Image
              src="https://plus.unsplash.com/premium_photo-1661766718556-13c2efac1388?w=600&h=500&fit=crop"
              alt="FAQ illustration"
              width={600}
              height={500}
              className="rounded-2xl shadow-lg w-full h-auto"
              unoptimized
            />
          </div>

          {/* FAQ Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Most questions by our beloved patients</h2>
              <p className="text-lg text-gray-600">
                Find answers to commonly asked questions about our healthcare services and facilities.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-gray-200 rounded-lg px-6 bg-white"
                >
                  <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
