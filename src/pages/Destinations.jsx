// src/pages/Destinations.jsx
import React from 'react';

const Destinations = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center">Destinations</h2>
      <button className="btn btn-success mt-3">Add Destination</button>
      <ul className="list-group mt-4">
        <li className="list-group-item">Paris</li>
        <li className="list-group-item">New York</li>
        <li className="list-group-item">Tokyo</li>
      </ul>
    </div>
  );
};

export default Destinations;
