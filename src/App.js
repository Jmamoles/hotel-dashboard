import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // <- ¡Aquí está el fix!
import Login from "./Login";
import Dashboard from "./Dashboard";
import Dashboard1 from "./Dashboard1";
import Grafica from "./Grafica"; // Si tienes gráfica

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard1/:habitacionId" element={<Dashboard1 />} />
        <Route path="/grafica" element={<Grafica />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
