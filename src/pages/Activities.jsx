import React, { useState, useEffect } from "react";
import api from "../api/api";
import { Modal, Button } from "react-bootstrap";

const Activities = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    Activity_Name: "",
    Description: "",
    Duration: "",
  });

  const handleOpenModal = (site) => {
    setSelectedSite(site);
    setFormData({
      Activity_Name: site.Activity_Name,
      Description: site.Description,
      Duration: site.Duration,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedSite(null);
    setShowModal(false);
  };

  // Requête Axios pour récupérer les données
  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await api.get(
          "http://localhost:8000/activities/?skip=0&limit=6"
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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSite) return;

    try {
      const response = await api.put(
        `http://localhost:8000/activities/${selectedSite.Activity_ID}`,
        formData
      );

      if (response.status === 200) {
        // Mettre à jour localement les données modifiées
        setSites((prevSites) =>
          prevSites.map((site) =>
            site.Activity_ID === selectedSite.Activity_ID
              ? { ...site, ...formData }
              : site
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
      <h1 className="text-center mb-4">Activities</h1>
      <div className="row g-4">
        {sites.map((site) => (
          <div className="col-md-4" key={site.Activity_ID}>
            <div
              className="card shadow-sm h-100"
              onClick={() => handleOpenModal(site)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                <h5 className="card-title text-success">
                  {site.Activity_Name}
                </h5>
                <p className="card-text">
                  <img
                    src={`https://picsum.photos/seed/${site.Activity_Name}/500/300`}
                    alt="Random"
                    className="img-fluid mb-3"
                  />
                  <strong>Description:</strong> {site.Description}
                </p>
                <p className="card-text">
                  <strong>Duration:</strong> {site.Duration}
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
          <Modal.Title>Edit Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <img
              src={`https://picsum.photos/seed/${formData.Activity_Name}/500/150`}
              alt="Random"
              className="img-fluid mb-3"
            />
            <div className="mb-3">
              <label htmlFor="Activity_Name" className="form-label">
                Activity Name
              </label>
              <input
                type="text"
                className="form-control"
                id="Activity_Name"
                value={formData.Activity_Name}
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
              <label htmlFor="Duration" className="form-label">
                Duration
              </label>
              <input
                type="text"
                className="form-control"
                id="Duration"
                value={formData.Duration}
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

export default Activities;
