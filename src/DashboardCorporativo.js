import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import nhcampo1 from "./assets/nhcampo1.jpg"; // Fondo de imagen

const DashboardCorporativo = () => {
  const navigate = useNavigate();
  const [habitacionId, setHabitacionId] = useState(""); // Estado para el número de habitación

  // Función para manejar el ingreso del número de habitación
  const handleSubmit = (e) => {
    e.preventDefault();
    if (habitacionId) {
      // Redirigir a DashboardRecepcion con el número de habitación
      navigate(`/DashboardRecepcion/${habitacionId}`);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${nhcampo1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          color: "#000",
          padding: "2rem",
          borderRadius: "1rem",
          maxWidth: "350px",
          width: "100%",
          boxShadow: "0 0 30px rgba(0,0,0,0.2)",
        }}
      >
        {/* Título del Dashboard Corporativo */}
        <h1 className="text-3xl font-bold text-center mb-6">
         NH Hotels
        </h1>

        {/* Botón para cerrar sesión */}
        <div className="text-right mb-4">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            onClick={() => navigate("/")} // Redirige a Login
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Caja de ingreso de número de habitación */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label htmlFor="habitacionId" className="block text-lg mb-2">
              Número de habitación:
            </label>
            <input
              type="number"
              id="habitacionId"
              value={habitacionId}
              onChange={(e) => setHabitacionId(e.target.value)}
              placeholder="Ingresa el número de habitación"
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
          >
            Ver habitación
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardCorporativo;
