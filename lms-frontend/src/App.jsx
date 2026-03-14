import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import LandingPage from "./pages/LandingPage";
import CreateCourse from "./pages/CreateCourse";
import Profile from "./pages/Profile";
import Course from "./pages/Course";
import MyCourses from "./pages/MyCourses";
import Grades from "./pages/Grades";
import ManageUploads from "./pages/ManageUploads";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/manage-uploads" element={<ManageUploads />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
