import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import nhcampo1 from "./assets/nhcampo1.jpg";

const Dashboard1 = () => {
  const { habitacionId } = useParams();
  const navigate = useNavigate(); // Usamos useNavigate para redirigir al login
  const [datosHabitacion, setDatosHabitacion] = useState(null);

  const generarDatosHabitacion = (habitacionId) => {
    const consumo = Math.floor(Math.random() * 200) + 50;
    const ocupada = true;
    const porDebajoDelLimite = consumo < 150;

    return {
      habitacion: habitacionId,
      consumo,
      ocupada,
      porDebajoDelLimite,
    };
  };

  useEffect(() => {
    const data = generarDatosHabitacion(habitacionId);
    setDatosHabitacion(data);
  }, [habitacionId]);

  const handleLogout = () => {
    // Aquí puedes limpiar el estado de autenticación, por ejemplo con localStorage
    localStorage.removeItem("user"); // Si lo guardaste en localStorage o sessionStorage

    // Redirigir al login
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
          maxWidth: "350px",
          width: "100%",
          boxShadow: "0 0 30px rgba(0,0,0,0.2)",
        }}
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Consumo de Habitación {habitacionId}
        </h1>

        <div className="text-lg">
          <p>
            <strong>Consumo:</strong> {datosHabitacion.consumo} L
          </p>
          <p>
            <strong>Ocupación:</strong> 🟢 Ocupada
          </p>
          <p>
            <strong>Bajo límite:</strong>{" "}
            {datosHabitacion.porDebajoDelLimite ? "✅ Sí" : "⚠️ No"}
          </p>
        </div>

        {/* Botón de Cerrar sesión */}
        <div className="text-center mt-6">
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
