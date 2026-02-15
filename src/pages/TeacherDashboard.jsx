import Sidebar from "../components/SideBar";
import StatCard from "../components/StatCard";
import { Book, Upload, Users, Download } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function TeacherDashboard() {
  const { user } = useAuth();

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar role={user?.role} />

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">LMS Dashboard</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Courses" value="8" icon={<Book />} color="bg-blue-500" />
          <StatCard title="Total Uploads" value="25" icon={<Upload />} color="bg-green-500" />
          <StatCard title="Total Students" value="120" icon={<Users />} color="bg-orange-500" />
          <StatCard title="Total Downloads" value="45" icon={<Download />} color="bg-purple-500" />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-bold mb-4">Upload New Notes</h2>

            <select className="w-full border rounded-lg p-2 mb-4">
              <option>Select Course</option>
              <option>Web Engineering</option>
              <option>Software Engineering</option>
            </select>

            <input type="file" className="mb-4" />

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Upload
            </button>
          </div>

          {/* Recent Materials */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-bold mb-4">Recent Materials</h2>

            {[
              "Lecture 1 Notes.pdf",
              "Chapter 2 Presentation.pptx",
              "Assignment 3.docx",
              "Video Lesson.mp4",
              "Research Links.txt",
            ].map((file, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{file}</span>
                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
