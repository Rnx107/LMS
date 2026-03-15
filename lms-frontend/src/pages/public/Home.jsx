import { Link } from 'react-router-dom'
import { BookOpen, Users, Award, Clock, ArrowRight, CheckCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const Home = () => {
  const { user } = useAuth()

  const features = [
    { icon: BookOpen, title: 'Quality Courses', description: 'Access a wide range of courses taught by expert instructors.' },
    { icon: Users, title: 'Expert Teachers', description: 'Learn from industry professionals with real-world experience.' },
    { icon: Award, title: 'Certifications', description: 'Earn recognized certificates upon course completion.' },
    { icon: Clock, title: 'Flexible Learning', description: 'Study at your own pace with 24/7 access to materials.' },
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Unlock Your Potential with Online Learning
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              Access world-class courses, learn from expert instructors, and achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses" className="px-8 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50">
                Explore Courses
                <ArrowRight className="w-5 h-5 inline ml-2" />
              </Link>
              {!user && (
                <Link to="/register" className="px-8 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10">
                  Get Started Free
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home