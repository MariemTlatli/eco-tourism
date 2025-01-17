// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Destinations from "./pages/Destinations";
import Activities from "./pages/Activities";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/activities" element={<Activities />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
