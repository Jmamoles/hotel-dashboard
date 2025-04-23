import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import nhcampo1 from "./assets/nhcampo1.jpg";

const Dashboard1 = () => {
  const { habitacionId } = useParams();
  const navigate = useNavigate();
  const [datosHabitacion, setDatosHabitacion] = useState(null);

  const tipoUsuario = localStorage.getItem("tipoUsuario");

  // Función para generar datos simulados de la habitación
  const generarDatosHabitacion = (habitacionId) => {
    const consumo = Math.floor(Math.random() * 200) + 50; // consumo entre 50 y 250
    const ocupada = Math.random() < 0.7;
    const averia = !ocupada && Math.random() < 0.2;
    const porDebajoDelLimite = consumo < 150;

    return {
      habitacion: habitacionId,
      consumo,
      ocupada,
      averia,
      porDebajoDelLimite,
    };
  };

  const obtenerDatos = () => {
    const data = generarDatosHabitacion(habitacionId);
    setDatosHabitacion(data);
  };

  useEffect(() => {
    obtenerDatos();
  }, [habitacionId]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("tipoUsuario");
    navigate("/login");
  };

  if (!datosHabitacion) return null;

  const obtenerEstadoConsumo = () => {
    if (datosHabitacion.consumo < 150) {
      return (
        <div>
          <p>🟢 Consumo eficiente</p>
          <p>Cliente elegible como Water Ambassador de NH!</p>
        </div>
      );
    } else if (datosHabitacion.consumo >= 150 && datosHabitacion.consumo <= 200) {
      return <p>🟡 Consumo moderado</p>;
    } else {
      return <p>🔴 Consumo alto</p>;
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
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 0 30px rgba(0,0,0,0.2)",
        }}
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          Detalle Habitación {habitacionId}
        </h1>

        <div className="text-md space-y-2">
          <p><strong>💧 Consumo actual:</strong> {datosHabitacion.consumo} L</p>
          <p>
            <strong>⚡ Por debajo del límite:</strong>{" "}
            {datosHabitacion.porDebajoDelLimite ? "✅ Sí" : "⚠️ No"}
          </p>

          {obtenerEstadoConsumo()}
        </div>

        <div className="text-center mt-6 flex flex-col gap-3">
          {tipoUsuario === "corporativo" && (
            <button
              onClick={() => navigate("/datos")}
              className="bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition"
            >
              Volver atrás
            </button>
          )}

          {/* Botón para volver a Dashboard Corporativo */}
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Volver
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard1;
