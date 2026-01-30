import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Dummy login logic
    const role = email.includes("teacher") ? "teacher" : "student";

    const loggedUser = { email, role };
    setUser(loggedUser);

    if (role === "teacher") navigate("/teacher");
    else navigate("/student");
  };

  const signup = (data) => {
    setUser(data);
    data.role === "teacher"
      ? navigate("/teacher")
      : navigate("/student");
  };

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
