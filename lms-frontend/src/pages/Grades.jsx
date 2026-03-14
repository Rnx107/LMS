import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import { useAuth } from "../context/AuthContext";

export default function Grades() {
  const { user } = useAuth();

  const grades = [
    { course: "Web Development 101", grade: "A", percentage: 92 },
    { course: "React Fundamentals", grade: "B+", percentage: 87 },
    { course: "Computer Science Basics", grade: "A-", percentage: 90 },
  ];

  return (
    <div className="flex">
      <Sidebar role={user?.role} />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">My Grades</h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Course</th>
                  <th className="px-6 py-4 text-left font-bold">Grade</th>
                  <th className="px-6 py-4 text-left font-bold">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">{item.course}</td>
                    <td className="px-6 py-4 font-bold text-blue-700">{item.grade}</td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{item.percentage}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-bold mb-2">GPA: 3.56/4.0</h2>
            <p className="text-gray-600">Overall performance across all courses</p>
          </div>
        </div>
      </div>
    </div>
  );
}
