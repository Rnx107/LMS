import {
  LayoutDashboard,
  BookOpen,
  Upload,
  User,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";

// We pass 'role' as a prop
export default function Sidebar({ role }) {
  return (
    <div className="w-64 min-h-screen bg-blue-700 text-white p-5">
      <h1 className="text-2xl font-bold mb-10">LMS</h1>

      <ul className="space-y-4">
        {/* Everyone sees the Dashboard */}
        <Link to={`/${role}-dashboard`} className="block text-inherit no-underline">
          <li className="flex items-center gap-3 px-4 py-2 hover:bg-blue-600 rounded-lg cursor-pointer transition">
            <LayoutDashboard size={18} />
            Dashboard
          </li>
        </Link>

        {/* Everyone sees My Courses */}
        <Link to="/my-courses" className="block text-inherit no-underline">
          <li className="flex items-center gap-3 px-4 py-2 hover:bg-blue-600 rounded-lg cursor-pointer transition">
            <BookOpen size={18} />
            My Courses
          </li>
        </Link>

        {/* ONLY show if role is 'teacher' */}
        {role === "teacher" && (
          <Link to="/manage-uploads" className="block text-inherit no-underline">
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-blue-600 rounded-lg cursor-pointer transition">
              <Upload size={18} />
              Manage Uploads
            </li>
          </Link>
        )}

        {role === "teacher" && (
          <Link to="/create-course" className="block text-inherit no-underline">
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-blue-600 rounded-lg cursor-pointer transition">
              <Upload size={18} />
              Create Course
            </li>
          </Link>
        )}

        {/* ONLY show if role is 'student' */}
        {role === "student" && (
          <Link to="/grades" className="block text-inherit no-underline">
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-blue-600 rounded-lg cursor-pointer transition">
              <GraduationCap size={18} />
              My Grades
            </li>
          </Link>
        )}

        <Link to="/profile" className="block text-inherit no-underline">
          <li className="flex items-center gap-3 px-4 py-2 hover:bg-blue-600 rounded-lg cursor-pointer transition">
            <User size={18} />
            Profile
          </li>
        </Link>
      </ul>
    </div>
  );
}
