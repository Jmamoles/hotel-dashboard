import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Dashboard1 from "./Dashboard1";
import DashboardMantenimiento from "./DashboardMantenimiento";  // Importamos DashboardMantenimiento
import Grafica from "./Grafica";
import SAPMockup from "./SAPMockup";  // Mockup de SAP

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard principal */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Dashboard por habitación */}
        <Route path="/dashboard1/:habitacionId" element={<Dashboard1 />} />
        
        {/* Dashboard de mantenimiento */}
        <Route path="/dashboard-mantenimiento" element={<DashboardMantenimiento />} />
        
        {/* Ruta para la gráfica */}
        <Route path="/grafica" element={<Grafica />} />
        
        {/* Ruta para el mockup de SAP */}
        <Route path="/sap-import" element={<SAPMockup />} />

        {/* Ruta predeterminada que redirige a login */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
