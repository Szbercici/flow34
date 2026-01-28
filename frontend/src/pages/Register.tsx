import React, { useState } from 'react';
import './Register.css';
import { API_BASE_URL } from '../config/api';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    // 1. Adatok kiszedése
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // 2. Kliens oldali validáció (Jelszó egyezés)
    if (data.password !== data.password_again) {
      setError("A két jelszó nem egyezik!");
      setLoading(false);
      return;
    }

    try {
      // 3. Küldés a backendnek
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: data.username,
            email: data.email,
            password: data.password
        }), 
      });

      if (response.ok) {
        console.log("Sikeres regisztráció!");
        // Ide jöhet egy átirányítás a loginra
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Hiba történt a regisztráció során.");
      }
    } catch (err) {
      setError("Hálózati hiba, próbáld újra később!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="register-container">
        <h2>Join the flow. <br /> Create your account.</h2>
        
        {/* Hibaüzenet megjelenítése, ha van */}
        {error && <div style={{ color: 'red', fontSize: '20px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input placeholder="Username" type="text" name="username" required />
          </div>
          <div className="form-group">
            <input placeholder="Email" type="email" name="email" required />
          </div>
          <div className="form-group">
            <input placeholder="Password" type="password" name="password" required />
          </div>
          <div className="form-group">
            <input placeholder="Password again" type="password" name="password_again" required />
          </div>

          <button 
            type="submit" 
            className="register-button" 
            disabled={loading} // Megakadályozzuk a dupla kattintást
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <a id='login-link' href="/login">Already have an account? Log in here.</a>
      </div>
    </div>
  );
};

export default Register;  