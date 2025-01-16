import React, { useState, useEffect } from "react";
import axios from "axios";

const SiteList = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Requête Axios pour récupérer les données
  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/destinations/?skip=0&limit=5"
        ); // Remplacez par votre URL d'API
        setSites(response.data);
      } catch (err) {
        setError("Une erreur s'est produite lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, []);

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Sites Touristiques</h1>
      <div>
        {sites.map((site) => (
          <div
            key={site.Site_ID}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "15px",
              margin: "10px 0",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h2>{site.Site_Name}</h2>
            <p>
              <strong>Description:</strong> {site.Description}
            </p>
            <p>
              <strong>Région:</strong> {site.Region}
            </p>
            <p>
              <strong>Meilleure période à visiter:</strong>{" "}
              {site.Best_Time_to_Visit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiteList;
