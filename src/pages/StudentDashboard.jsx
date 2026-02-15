import Sidebar from "../components/SideBar";
import StatCard from "../components/StatCard";
import Footer from "../components/Footer"
import { BookOpen, FileText, Download, Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar role={user?.role} />

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="My Courses"
            value="4"
            icon={<BookOpen />}
            color="bg-blue-500"
          />

          <StatCard
            title="Available Notes"
            value="18"
            icon={<FileText />}
            color="bg-green-500"
          />

          <StatCard
            title="Downloads"
            value="9"
            icon={<Download />}
            color="bg-purple-500"
          />

          <StatCard
            title="Updates"
            value="3"
            icon={<Bell />}
            color="bg-orange-500"
          />
        </div>

        {/* Materials Section */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold mb-4">Learning Materials</h2>

          {[
            "Web Engineering - Unit 1.pdf",
            "Software Engineering - UML.pptx",
            "Database Notes.docx",
            "React Intro Video.mp4",
          ].map((file, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-3"
            >
              <span>{file}</span>
              <button className="bg-green-600 text-white px-4 py-1 rounded">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
