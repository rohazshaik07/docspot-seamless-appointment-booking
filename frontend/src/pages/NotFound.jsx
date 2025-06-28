"use client"
import { Link } from "react-router-dom"
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import Button from "../components/ui/Button"
import { FiHome, FiArrowLeft } from "react-icons/fi"

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full text-center px-4">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Page Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the
              wrong URL.
            </p>
          </div>

          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link to="/">
                <FiHome className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()} className="w-full">
              <FiArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default NotFound
