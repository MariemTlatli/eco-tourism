import React, { useState, useEffect } from "react";
import api from "../api/api"; // Utilisation de votre instance Axios personnalisée
import { Modal, Button } from "react-bootstrap";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    Site_Name: "",
    Description: "",
    Region: "",
    Best_Time_to_Visit: "",
  });

  const handleOpenModal = (destination) => {
    setSelectedDestination(destination);
    setFormData({
      Site_Name: destination.Site_Name,
      Description: destination.Description,
      Region: destination.Region,
      Best_Time_to_Visit: destination.Best_Time_to_Visit,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedDestination(null);
    setShowModal(false);
  };

  // Requête pour récupérer les données
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await api.get(
          "http://localhost:8000/destinations/?skip=0&limit=6"
        );
        setDestinations(response.data);
      } catch (err) {
        setError("Une erreur s'est produite lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDestination) return;

    try {
      const response = await api.put(
        `http://localhost:8000/destinations/${selectedDestination.Site_ID}`,
        formData
      );

      if (response.status === 200) {
        setDestinations((prevDestinations) =>
          prevDestinations.map((destination) =>
            destination.Site_ID === selectedDestination.Site_ID
              ? { ...destination, ...formData }
              : destination
          )
        );
        handleCloseModal();
      } else {
        console.error("Erreur lors de la mise à jour.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Destinations</h1>
      <div className="row g-4">
        {destinations.map((destination) => (
          <div className="col-md-4" key={destination.Site_ID}>
            <div
              className="card shadow-sm h-100"
              onClick={() => handleOpenModal(destination)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                <h5 className="card-title text-success">
                  {destination.Site_Name}
                </h5>
                <p className="card-text">
                  <strong>Description:</strong> {destination.Description}
                </p>
                <p className="card-text">
                  <strong>Région:</strong> {destination.Region}
                </p>
                <img
                  src={`https://picsum.photos/seed/${destination.Site_Name}/500/300`}
                  alt="Random"
                  className="img-fluid mb-3"
                />
                <p className="card-text">
                  <strong>Meilleure période à visiter:</strong>{" "}
                  {destination.Best_Time_to_Visit}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Destination</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="Site_Name" className="form-label">
                Destination Name
              </label>
              <input
                type="text"
                className="form-control"
                id="Site_Name"
                value={formData.Site_Name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="Description"
                rows={3}
                value={formData.Description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="Region" className="form-label">
                Région
              </label>
              <input
                type="text"
                className="form-control"
                id="Region"
                value={formData.Region}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Best_Time_to_Visit" className="form-label">
                Meilleure période à visiter
              </label>
              <input
                type="text"
                className="form-control"
                id="Best_Time_to_Visit"
                value={formData.Best_Time_to_Visit}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" variant="primary" className="w-100">
              Save Changes
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Destinations;
