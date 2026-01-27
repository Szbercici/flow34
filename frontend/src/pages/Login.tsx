import "./Login.css";
import React from "react";
import { API_BASE_URL } from "../config/api";
import { useAuth } from "../AuthContext";

const Login = () => {
  const { setUser } = useAuth();
  // Ez a függvény fut le, amikor rányomsz a gombra
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Megállítjuk, hogy az oldal újratöltődjön

    // 1. Kiszedjük az adatokat a formból (a 'name' attribútumok alapján!)
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log("Küldésre kész adatok:", data);
    // Eredmény: { email: "teszt@e.mail", password: "..." }

    // 2. Beküldés a backendnek (Fetch API)
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // fontos: így megy át a cookie
        body: JSON.stringify(data), // Itt alakítjuk JSON formátummá
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Sikeres belépés!", result);
        // elmentjük a usert contextbe (id, username, email érkezik a backendből)
        setUser(result);
        window.location.href = "/";
      } else {
        console.error("Hiba történt a belépésnél");
        alert("Hibás email vagy jelszó!");
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

        {/* Hozzáadjuk az onSubmit kezelőt */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {/* FONTOS: a 'name="username"' kell a FormData-nak! */}
            <input
              placeholder="Username"
              type="text"
              name="username"
              required
            />
          </div>
          <div className="form-group">
            {/* FONTOS: a 'name="password"' kell a FormData-nak! */}
            <input
              placeholder="Password"
              type="password"
              name="password"
              required
            />
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
