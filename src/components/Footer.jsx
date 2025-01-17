import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start ">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-4 mb-3 d-flex align-items-center">
            <img
              src="/images/logo.png"
              alt="Site Logo"
              style={{ width: "50px", marginRight: "10px" }}
            />
            <h5 className="mt-2 mb-0">EcoPaths</h5>
          </div>
          {/* Barre de recherche */}
          <div className="col-md-4 mb-3">
            <h5>Rechercher</h5>
            <form className="d-flex justify-content-center">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Rechercher des destinations"
                aria-label="Search"
              />
              <button className="btn btn-success" type="submit">
                Rechercher
              </button>
            </form>
          </div>

          {/* Logo de la Tunisie */}
          <div className="col-md-4 mb-3">
            <img
              src="/images/tunisia.png"
              alt="Tunisia Logo"
              style={{ width: "50px" }}
            />
          </div>
        </div>
        <hr />

        {/* Liens rapides */}
        <div className="row">
          <div className="col-md-6">
            <p className="mb-0">© 2025 Travel Website. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
