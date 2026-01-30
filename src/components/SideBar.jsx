import { LayoutDashboard, BookOpen, Upload, User, GraduationCap } from "lucide-react";

// We pass 'role' as a prop
export default function Sidebar({ role }) {
  return (
    <div className="w-64 min-h-screen bg-blue-700 text-white p-5">
      <h1 className="text-2xl font-bold mb-10">LMS</h1>

      <ul className="space-y-4">
        {/* Everyone sees the Dashboard */}
        <li className="flex items-center gap-3 px-4 py-2 hover:bg-blue-600 rounded-lg cursor-pointer">
          <LayoutDashboard size={18} />
          Dashboard
        </li>

        {/* Everyone sees My Courses */}
        <li className="flex items-center gap-3 px-4 py-2 hover:bg-blue-600 rounded-lg cursor-pointer">
          <BookOpen size={18} />
          My Courses
        </li>
        
        {/* ONLY show if role is 'teacher' */}
        {role === "teacher" && (
          <li className="flex items-center gap-3 px-4 py-2 hover:bg-blue-600 rounded-lg cursor-pointer">
            <Upload size={18} />
            Manage Uploads
          </li>
        )}

        {/* ONLY show if role is 'student' */}
        {role === "student" && (
          <li className="flex items-center gap-3 px-4 py-2 hover:bg-blue-600 rounded-lg cursor-pointer">
            <GraduationCap size={18} />
            My Grades
          </li>
        )}

        <li className="flex items-center gap-3 px-4 py-2 hover:bg-blue-600 rounded-lg cursor-pointer">
          <User size={18} />
          Profile
        </li>
      </ul>
    </div>
  );
}