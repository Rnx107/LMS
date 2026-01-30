import { useState } from "react";
import { Mail, Lock, User, Users } from "lucide-react";
import Input from "../components/Input";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });
  
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required";
    if (formData.password.length < 6) newErrors.password = "Password must be 6+ chars";
    if (!formData.role || formData.role === "Select role") {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Signup Data:", formData);
      // Call your API here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-400">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6">Sign up</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <Input 
            icon={<User size={20} />} 
            placeholder="Enter your name" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            error={errors.name}
          />

          <Input 
            icon={<Mail size={20} />} 
            placeholder="Enter your email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            error={errors.email}
          />

          <Input 
            icon={<Lock size={20} />} 
            type="password" 
            placeholder="Create a password" 
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            error={errors.password}
          />

          {/* Role Selector */}
          <div>
            <div className={`flex items-center gap-3 border rounded-lg px-3 py-2 ${errors.role ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}>
              <Users className={errors.role ? 'text-red-400' : 'text-gray-400'} size={20} />
              <select 
                className="w-full outline-none bg-transparent text-sm cursor-pointer"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="">Select role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            {errors.role && <p className="text-red-500 text-xs mt-1 ml-1">{errors.role}</p>}
          </div>

          <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition active:scale-95">
            Sign up
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account? 
          <Link to="/" className="text-blue-600 hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
}