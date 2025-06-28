import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import Hero from "../components/sections/Hero"
import Services from "../components/sections/Services"
import About from "../components/sections/About"
import Doctors from "../components/sections/Doctors"
import Testimonials from "../components/sections/Testimonials"
import FAQ from "../components/sections/FAQ"

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Doctors />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default Home
