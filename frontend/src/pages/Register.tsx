import React, { useState } from "react";
import "./Register.css";
import { API_BASE_URL } from "../config/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Eye from "../assets/Eye";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // 1. Adatok kiszedése
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const password = String(data.password);
    const passwordAgain = String(data.password_again);

    // 2. Kliens oldali validáció (Jelszó hossz és egyezés)
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    if (password !== passwordAgain) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // 3. Küldés a backendnek
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        let errorMessage = "Registration failed. Please try again.";
        const rawBody = await response.text();

        if (rawBody) {
          try {
            const parsed = JSON.parse(rawBody);
            if (parsed && typeof parsed === "object" && "message" in parsed) {
              const backendMessage = (parsed as { message?: unknown }).message;
              if (typeof backendMessage === "string" && backendMessage.trim()) {
                errorMessage = backendMessage;
              }
            } else {
              errorMessage = rawBody;
            }
          } catch {
            // Backend often returns plain text for errors.
            errorMessage = rawBody;
          }
        }

        throw new Error(errorMessage);
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="register-container">
        <h2>
          Join the flow. <br /> Create your account.
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
          <div className="form-group">
            <input placeholder="Email" type="email" name="email" required />
          </div>

          <div className="form-group password-wrapper">
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              minLength={8}
              required
            />
            <div
              className="password-toggle"
              onMouseDown={() => setShowPassword(!showPassword)}
              onMouseUp={() => setShowPassword(showPassword)}
              onMouseLeave={() => setShowPassword(showPassword)}
            >
              <Eye size={24} />
            </div>
          </div>
          <div className="form-group password-wrapper">
            <input
              placeholder="Password again"
              type={showPasswordAgain ? "text" : "password"}
              name="password_again"
              minLength={8}
              required
            />
            <div
              className="password-toggle"
              onMouseDown={() => setShowPasswordAgain(!showPasswordAgain)}
              onMouseUp={() => setShowPasswordAgain(showPasswordAgain)}
              onMouseLeave={() => setShowPasswordAgain(showPasswordAgain)}
            >
              <Eye size={24} />
            </div>
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={loading} // Megakadályozzuk a dupla kattintást
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <a id="login-link" className="link" onClick={() => navigate("/login")}>
          Already have an account? Log in here.
        </a>
      </div>
    </div>
  );
};

export default Register;
