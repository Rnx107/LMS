import Sidebar from "../components/SideBar";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  
  // Using a placeholder image for the "dummy" effect
  const avatarUrl = "https://api.dicebear.com/7.x/miniavs/svg?seed=8";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={user?.role} />
      <div className="flex flex-col pl-20 pb-20 w-full p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Profile</h1>
        
        <div className="bg-white flex flex-col items-center p-8 rounded-lg shadow-md">
          {/* Avatar Container */}
          <div className="relative">
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="w-32 h-32 rounded-full border-4 border-indigo-500 p-1 object-cover bg-gray-100"
            />
            {/* Optional: Online status dot */}
            <span className="absolute bottom-2 right-2 block h-5 w-5 rounded-full ring-2 ring-white bg-green-400"></span>
          </div>

          {/* User Info */}
          <div className="text-center mt-4">
            <h2 className="text-2xl font-semibold text-gray-800">{user?.email || "User"}</h2>
            <p className="text-gray-500 italic capitalize">{user?.role === "teacher" ? "Teacher" : "Computer Science Student"}</p>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-gray-100 my-6"></div>

          {/* Placeholder for more details */}
          <div className="w-full grid grid-cols-2 gap-4">
             {user?.role === "student" ? (
               <>
                 <div className="p-4 bg-gray-50 rounded-md">
                    <p className="text-xs text-gray-400 uppercase font-bold">Student ID</p>
                    <p className="text-gray-700">#2024-0012</p>
                 </div>
                 <div className="p-4 bg-gray-50 rounded-md">
                    <p className="text-xs text-gray-400 uppercase font-bold">Email</p>
                    <p className="text-gray-700">{user?.email || "student@univ.edu"}</p>
                 </div>
               </>
             ) : (
               <>
                 <div className="p-4 bg-gray-50 rounded-md">
                    <p className="text-xs text-gray-400 uppercase font-bold">Teacher ID</p>
                    <p className="text-gray-700">#T-2024-001</p>
                 </div>
                 <div className="p-4 bg-gray-50 rounded-md">
                    <p className="text-xs text-gray-400 uppercase font-bold">Email</p>
                    <p className="text-gray-700">{user?.email || "teacher@univ.edu"}</p>
                 </div>
               </>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}