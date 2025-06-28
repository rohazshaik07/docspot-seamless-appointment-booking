import { Link } from "react-router-dom"
import Button from "../ui/Button"
import { FiArrowRight, FiPlay } from "react-icons/fi"

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 section-padding overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
      <div
        className="absolute bottom-20 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 fade-in">
            <div className="space-y-6">
              <h1 className="text-responsive-xl font-bold text-gray-900 dark:text-white leading-tight">
                We help patients live a <span className="text-gradient">healthy</span>, longer life.
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
                Our health system offers unmatched, expert health care. From the lab to the clinic, we provide
                world-class care for everyone.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/doctors">
                  Request an Appointment
                  <FiArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <FiPlay className="mr-2 h-5 w-5" />
                Watch Video
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">30+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years of Experience</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">15+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Clinic Locations</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Patient Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Hero Images */}
          <div className="relative slide-up">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="card p-4 shadow-custom">
                  <img
                    src="/Youtube-Tutorials-MERN-Medicare-Booking-Website/frontend/src/assets/images/hero-img01.png"
                    alt="Doctor consultation"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="card p-4 shadow-custom">
                  <img
                    src="/Youtube-Tutorials-MERN-Medicare-Booking-Website/frontend/src/assets/images/hero-img02.png"
                    alt="Medical equipment"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="pt-8">
                <div className="card p-4 shadow-custom">
                  <img
                    src="/Youtube-Tutorials-MERN-Medicare-Booking-Website/frontend/src/assets/images/hero-img03.png"
                    alt="Healthcare team"
                    className="w-full h-64 object-cover rounded-lg"
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

export default Hero
