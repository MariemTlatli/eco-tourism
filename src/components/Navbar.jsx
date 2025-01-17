import React, { useEffect, useState } from "react";

const Navbar = () => {
  const currentPath = window.location.pathname; // Récupère la route actuelle

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{
        height: "70px", // Augmentation de la hauteur
      }}
    >
      <div className="container">
        <a className="navbar-brand" href="/">
          <img
            src="images/logo.png"
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
        </a>
        <h5 className="mt-2">EcoPaths</h5>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {currentPath == "/" || currentPath == "/login" ? (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link text-dark" href="/login">
                  Login
                </a>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link text-dark" href="/destinations">
                  Destinations
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link text-dark" href="/activities">
                  Activities
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
