import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import { useAuth } from "../context/AuthContext";

export default function MyCourses() {
  const { user } = useAuth();

  return (
    <div className="flex">
      <Sidebar role={user?.role} />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">My Courses</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-2">Course Title</h2>
              <p className="text-gray-600 mb-4">Learn the fundamentals of web development</p>
              <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600">
                View Course
              </button>
            </div>
            {/* Add more course cards here */}
          </div>

          {user?.role === "student" && (
            <div className="mt-8 text-center text-gray-600">
              <p>Enroll in more courses to get started</p>
            </div>
          )}

          {user?.role === "teacher" && (
            <div className="mt-8 text-center text-gray-600">
              <p>Create a new course to get started teaching</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
