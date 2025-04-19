import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Dashboard1 from "./Dashboard1";
import Grafica from "./Grafica";
import SAPMockup from "./SAPMockup"; // <-- Importa el mockup de SAP

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard1/:habitacionId" element={<Dashboard1 />} />
        <Route path="/grafica" element={<Grafica />} />
        <Route path="/sap-import" element={<SAPMockup />} /> {/* Nueva ruta */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

