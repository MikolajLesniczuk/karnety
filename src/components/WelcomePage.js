import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";
import { useAuth } from "./AuthContext";

const WelcomePage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      navigate("/senior");
    } else {
      setError("Niepoprawne hasło");
    }
  };

  return (
    <div className="welcome-page">
      <h1>Witaj! Podaj hasło</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Hasło"
        />
        <button type="submit">Wejdź</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default WelcomePage;
