import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import Input from "../components/Input";
import { Link } from "react-router-dom";

export default function Login() {
  // 1. State for form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // 2. State for errors
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Simple Email Check
    if (!email.includes("@")) {
      validationErrors.email = "Please enter a valid email address.";
    }

    // Simple Password Check
    if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Logging in with:", { email, password });
      // This is where you call your backend API
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-600 to-blue-400">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input 
            icon={<Mail size={20} />} 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          
          <Input 
            icon={<Lock size={20} />} 
            type="password" 
            placeholder="Enter your password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <button 
            type="submit" 
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition shadow-md active:scale-95"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}