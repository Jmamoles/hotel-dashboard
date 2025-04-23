import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import DashboardCorporativo from "./DashboardCorporativo"; // Dashboard para empleados (corporativo)
import Dashboard from "./Dashboard"; // ✅ Dashboard de datos (nuevo nombre ruta)
import Dashboard1 from "./Dashboard1"; // Dashboard de cliente
import DashboardRecepcion from "./DashboardRecepcion"; // Nuevo dashboard de recepción
import DashboardMantenimiento from "./DashboardMantenimiento";
import Grafica from "./Grafica";
import SAPMockup from "./SAPMockup";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard Corporativo */}
        <Route path="/dashboard" element={<DashboardCorporativo />} />

        {/* Dashboard de Datos */}
        <Route path="/datos" element={<Dashboard />} /> {/* ✅ Ruta nueva para datos */}

        {/* Dashboard de cliente */}
        <Route path="/dashboard1/:habitacionId" element={<Dashboard1 />} />

        {/* Dashboard de Recepción */}
        <Route path="/dashboardrecepcion/:habitacionId" element={<DashboardRecepcion />} /> {/* Nueva ruta de recepción */}

        {/* Mantenimiento */}
        <Route path="/dashboardmantenimiento" element={<DashboardMantenimiento />} />

        {/* Gráfica */}
        <Route path="/grafica" element={<Grafica />} />

        {/* SAP Mockup */}
        <Route path="/sap-import" element={<SAPMockup />} />

        {/* Redirección por defecto */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
