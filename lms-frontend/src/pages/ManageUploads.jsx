import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import { useAuth } from "../context/AuthContext";
import { Upload as UploadIcon, Trash2, Download } from "lucide-react";

export default function ManageUploads() {
  const { user } = useAuth();

  const uploads = [
    { id: 1, name: "Lecture Notes - Week 1.pdf", course: "Web Development 101", uploadDate: "Jan 15, 2026", size: "2.4 MB" },
    { id: 2, name: "Assignment Guidelines.docx", course: "React Fundamentals", uploadDate: "Jan 20, 2026", size: "1.2 MB" },
    { id: 3, name: "Quiz Answers.pdf", course: "Web Development 101", uploadDate: "Jan 25, 2026", size: "3.8 MB" },
  ];

  return (
    <div className="flex">
      <Sidebar role={user?.role} />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">Manage Uploads</h1>

          <div className="mb-8 bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
            <UploadIcon className="mx-auto mb-4" size={48} />
            <p className="text-lg font-bold mb-2">Upload New Material</p>
            <p className="text-gray-600 mb-4">Drag and drop your files here or click to browse</p>
            <button className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-600">
              Choose Files
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">File Name</th>
                  <th className="px-6 py-4 text-left font-bold">Course</th>
                  <th className="px-6 py-4 text-left font-bold">Upload Date</th>
                  <th className="px-6 py-4 text-left font-bold">Size</th>
                  <th className="px-6 py-4 text-left font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload) => (
                  <tr key={upload.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{upload.name}</td>
                    <td className="px-6 py-4">{upload.course}</td>
                    <td className="px-6 py-4 text-gray-600">{upload.uploadDate}</td>
                    <td className="px-6 py-4 text-gray-600">{upload.size}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Download size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
