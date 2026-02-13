import "./Login.css";
import React, { useState } from "react"; // Hozzáadtuk a useState-et
import { API_BASE_URL } from "../config/api";
import { useAuth } from "../AuthContext";
import Eye from "../assets/Eye";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  // State a jelszó láthatóságához
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setUser(result);
        toast.success("Successful login");
        navigate("/");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Hálózati hiba:", error);
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <h2>
          Jump back in the flow. <br />
          Log in.
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              placeholder="Username"
              type="text"
              name="username"
              required
            />
          </div>
          
          <div className="form-group password-wrapper">
            <input
              placeholder="Password"
              // Itt dől el a típus a state alapján!
              type={showPassword ? "text" : "password"} 
              name="password"
              required
            />
            {/* A szem ikon/gomb */}
            <div
              className="password-toggle"
              onMouseDown={() => setShowPassword(!showPassword)} // Amikor lenyomod
              onMouseUp={() => setShowPassword(showPassword)}   // Amikor felengeded
              onMouseLeave={() => setShowPassword(showPassword)} // Ha lehúzod az egeret, akkor is rejtse el
            >
              <Eye size={24}/>
            </div>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <a href="/register">Don't have an account? Sign up here.</a>
      </div>
    </div>
  );
};

export default Login;