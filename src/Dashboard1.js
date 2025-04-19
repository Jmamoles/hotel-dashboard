import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import nhcampo1 from "./assets/nhcampo1.jpg";

const Dashboard1 = () => {
  const { habitacionId } = useParams();
  const navigate = useNavigate();
  const [datosHabitacion, setDatosHabitacion] = useState(null);

  const generarDatosHabitacion = (habitacionId) => {
    const consumo = Math.floor(Math.random() * 200) + 50;
    const ocupada = Math.random() < 0.7;
    const averia = !ocupada && Math.random() < 0.2;
    const porDebajoDelLimite = consumo < 150;

    let planta = "Desconocida";
    const num = parseInt(habitacionId);
    if (num >= 101 && num <= 125) planta = "Planta 1";
    else if (num >= 201 && num <= 225) planta = "Planta 2";
    else if (num >= 301 && num <= 325) planta = "Planta 3";
    else if (num >= 401 && num <= 425) planta = "Planta 4";

    return {
      habitacion: habitacionId,
      planta,
      consumo,
      ocupada,
      averia,
      porDebajoDelLimite,
      promedioEstimado: Math.floor(consumo * 0.95), // ejemplo simple
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
    navigate("/login");
  };

  if (!datosHabitacion) return null;

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
          <p><strong>📍 Planta:</strong> {datosHabitacion.planta}</p>
          <p><strong>💧 Consumo actual:</strong> {datosHabitacion.consumo} L</p>
          <p>
            <strong>🛏 Estado:</strong>{" "}
            {datosHabitacion.ocupada
              ? "🟢 Ocupada"
              : datosHabitacion.averia
              ? "🔧 Libre (Avería)"
              : "🔴 Libre"}
          </p>
          <p>
            <strong>⚡ Por debajo del límite:</strong>{" "}
            {datosHabitacion.porDebajoDelLimite ? "✅ Sí" : "⚠️ No"}
          </p>
          <p>
            <strong>📊 Promedio diario estimado:</strong>{" "}
            {datosHabitacion.promedioEstimado} L
          </p>
        </div>

        <div className="text-center mt-6 flex flex-col gap-3">
          <button
            onClick={obtenerDatos}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Refrescar datos
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
