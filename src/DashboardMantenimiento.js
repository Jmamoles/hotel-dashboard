import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import nhcampo1 from "./assets/nhcampo1.jpg";

// Registro necesario para evitar errores con escalas
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const generarDatosMantenimiento = () => {
  const habitaciones = [101, 102, 103, 104, 105, 106, 107, 108];
  return habitaciones.map((habitacion) => {
    const consumoHistorial = Array.from({ length: 7 }, () => Math.floor(Math.random() * 300) + 50);
    return {
      habitacion,
      consumoHistorial,
      alertas: Math.random() < 0.5 ? ["Fuga detectada"] : [],
      mantenimiento: [
        { fecha: "2025-03-01", averia: "Fuga de agua", tecnico: "Juan M Molina" },
        { fecha: "2025-03-15", averia: "Reparación válvula", tecnico: "Juan M Molina" },
      ],
    };
  });
};

const DashboardMantenimiento = () => {
  const navigate = useNavigate();
  const [datosMantenimiento, setDatosMantenimiento] = useState([]);

  useEffect(() => {
    setDatosMantenimiento(generarDatosMantenimiento());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleBackToDashboard = () => {
    navigate("/datos");  // Cambia la ruta según sea necesario
  };

  const labelsSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  const lineData = {
    labels: labelsSemana,
    datasets: datosMantenimiento.map((habitacionData) => ({
      label: `Hab. ${habitacionData.habitacion}`,
      data: habitacionData.consumoHistorial,
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
    })),
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Consumo de Agua por Día",
      },
    },
    scales: {
      x: {
        type: "category",
        title: { display: true, text: "Día de la Semana" },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Litros Consumidos" },
      },
    },
  };

  const barData = {
    labels: datosMantenimiento.map((d) => `Hab. ${d.habitacion}`),
    datasets: [
      {
        label: "Consumo Total Semanal",
        data: datosMantenimiento.map((d) =>
          d.consumoHistorial.reduce((a, b) => a + b, 0)
        ),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Comparativa Total por Habitación",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Litros Totales" },
      },
    },
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
          maxWidth: "1000px",
          width: "100%",
          boxShadow: "0 0 30px rgba(0,0,0,0.2)",
        }}
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Dashboard de Mantenimiento
        </h1>

        {/* Gráfica de consumo */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Historial de Consumo</h2>
          <Line data={lineData} options={lineOptions} />
        </div>

        {/* Alertas */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Alertas de Fugas</h2>
          {datosMantenimiento.map((habitacionData) => (
            <div key={habitacionData.habitacion} className="mb-3">
              <h3 className="font-semibold">Habitación {habitacionData.habitacion}</h3>
              {habitacionData.alertas.length > 0 ? (
                habitacionData.alertas.map((alerta, idx) => (
                  <p key={idx} className="text-red-600">{alerta}</p>
                ))
              ) : (
                <p className="text-green-600">Sin alertas</p>
              )}
            </div>
          ))}
        </div>

        {/* Comparativa entre habitaciones */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Comparativa entre Habitaciones</h2>
          <Bar data={barData} options={barOptions} />
        </div>

        {/* Historial de mantenimiento */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Historial de Mantenimiento</h2>
          {datosMantenimiento.map((habitacionData) => (
            <div key={habitacionData.habitacion} className="mb-3">
              <h3 className="font-semibold">Habitación {habitacionData.habitacion}</h3>
              {habitacionData.mantenimiento.map((item, idx) => (
                <p key={idx}>
                  <strong>{item.fecha}:</strong> {item.averia} (Técnico: {item.tecnico})
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Botón Volver al Dashboard */}
        <div className="text-center mt-6">
          <button
            onClick={handleBackToDashboard}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition mr-4"
          >
            Atras
          </button>

          {/* Botón cerrar sesión */}
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

export default DashboardMantenimiento;
