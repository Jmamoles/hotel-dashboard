// src/SAPMockup.js
import React from "react";
import { useNavigate } from "react-router-dom";

const SAPMockup = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Integración con SAP (Mockup)</h2>
        <p className="mb-4 text-gray-700">
          Este módulo simula cómo se integrará SAP con nuestro sistema para importar automáticamente datos de huéspedes y empleados.
        </p>

        <div className="bg-gray-50 border rounded p-4 mb-4 text-left text-sm font-mono">
          <p><strong>Nombre:</strong> María López</p>
          <p><strong>Habitación:</strong> 214</p>
          <p><strong>Check-in:</strong> 2025-04-18</p>
          <p><strong>Check-out:</strong> 2025-04-21</p>
          <p><strong>Email:</strong> maria.lopez@ejemplo.com</p>
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => navigate("/dashboard")}
        >
          Volver al Dashboard
        </button>
      </div>
    </div>
  );
};

export default SAPMockup;
