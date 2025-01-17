// src/pages/Login.jsx
import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const login = async () => {
  try {
    const data = new URLSearchParams();
    data.append("grant_type", "password");
    data.append("username", "testuser");
    data.append("password", "password");
    data.append("scope", "");
    data.append("client_id", "string");
    data.append("client_secret", "string");

    const response = await api.post("token/", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    });

    console.log("Réponse :", response.data);
    const { access_token } = response.data;

    // Stocker le token dans le localStorage
    localStorage.setItem("access_token", access_token);

    return access_token;
  } catch (error) {
    console.error(
      "Erreur lors de la requête :",
      error.response?.data || error.message
    );
    throw error;
  }
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Gestion de la soumission du formulaire
  const handleLogin = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    try {
      const credentials = { username, password };
      await login(credentials);
      alert("Authentification réussie !");
      navigate("/destinations");
    } catch (error) {
      alert("Erreur lors de l'authentification.");
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center
justify-content-center "
      style={{
        height: "70vh",
        backgroundColor: "rgba(234, 191, 63, 0.1)",
      }}
    >
      <div
        className="row align-items-stretch w-100 "
        style={{
          maxWidth: "1200px",
          height: "90%",
        }}
      >
        <div
          className="col-md-6 d-flex flex-column
justify-content-center p-4 shadow rounded bg-white"
          style={{ height: "100%" }}
        >
          <h2 className="text-center mb-4">Login</h2>

          <form className="mt-4" onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{
                backgroundColor: "#EABF3F",
                border: "none",
                color: "#fff",
              }}
            >
              Login
            </button>
          </form>
        </div>
        <div
          className="col-md-6 d-none d-md-flex justify-content-center
align-items-center"
          style={{ height: "100%" }}
        >
          <img
            src="images/desert.jpg"
            alt="Login Illustration"
            className="img-fluid"
            style={{
              height: "100%",
              width: "auto",
              borderRadius: "15px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
