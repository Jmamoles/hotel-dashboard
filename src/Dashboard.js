import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import nhcampo1 from "./assets/nhcampo1.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const { habitacionId } = useParams();
  const limiteAgua = 150;

  const [habitaciones, setHabitaciones] = useState([]);
  const [plantaSeleccionada, setPlantaSeleccionada] = useState("planta1");
  const [filtroOcupacion, setFiltroOcupacion] = useState("todos");

  const generarConsumoAleatorio = () => {
    const datos = [];
    const rangosPlantas = {
      planta1: [101, 125],
      planta2: [201, 225],
      planta3: [301, 325],
      planta4: [401, 425],
    };

    Object.entries(rangosPlantas).forEach(([planta, [inicio, fin]]) => {
      for (let i = inicio; i <= fin; i++) {
        const ocupada = Math.random() < 0.7;
        let consumo = 0;

        if (ocupada) {
          consumo = Math.floor(Math.random() * 200) + 50;
        } else {
          const averia = Math.random() < 0.2;
          consumo = averia ? Math.floor(Math.random() * 100) + 10 : 0;
        }

        datos.push({
          habitacion: i,
          planta,
          consumo,
          ocupada,
          porDebajoDelLimite: consumo < limiteAgua,
          averia: consumo > 0 && !ocupada,
        });
      }
    });

    return datos;
  };

  useEffect(() => {
    const datosSimulados = generarConsumoAleatorio();
    setHabitaciones(datosSimulados);
  }, []);

  const habitacionesFiltradas = habitacionId
    ? habitaciones.filter((h) => h.habitacion === parseInt(habitacionId))
    : habitaciones.filter((h) => h.planta === plantaSeleccionada);

  const habitacionesFinales = habitacionesFiltradas.filter((h) => {
    if (filtroOcupacion === "ocupadas" && !h.ocupada) return false;
    if (filtroOcupacion === "libres" && h.ocupada) return false;
    if (filtroOcupacion === "averia" && !h.averia) return false;
    return true;
  });

  const handleVerGrafica = () => {
    navigate("/grafica");
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
        <h1 className="text-3xl font-bold text-center mb-6">
          {habitacionId
            ? `Habitación ${habitacionId}`
            : "Consumo de Agua"}
        </h1>

        <div className="mb-4 flex justify-center gap-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={handleVerGrafica}
          >
            Gráfica
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            onClick={() => navigate("/dashboardmantenimiento")}
          >
            Mantenimiento
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            onClick={() => navigate("/")}
          >
            Cerrar Sesion
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {["planta1", "planta2", "planta3", "planta4"].map((planta) => (
            <button
              key={planta}
              className={`px-4 py-2 rounded ${
                plantaSeleccionada === planta
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setPlantaSeleccionada(planta)}
            >
              {planta.replace("planta", "Planta ")}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-4 justify-center">
          {["todos", "ocupadas", "libres", "averia"].map((estado) => (
            <button
              key={estado}
              className={`px-4 py-2 rounded ${
                filtroOcupacion === estado
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setFiltroOcupacion(estado)}
            >
              {estado === "todos"
                ? "Todas"
                : estado === "ocupadas"
                ? "Ocupadas"
                : estado === "libres"
                ? "Libres"
                : "Con Avería"}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow-lg rounded-lg text-lg">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Habitación</th>
                <th className="px-4 py-2 text-left">Consumo</th>
                <th className="px-4 py-2 text-left">Ocupación</th>
                <th className="px-4 py-2 text-left">Bajo límite</th>
              </tr>
            </thead>
            <tbody>
              {habitacionesFinales.map((h) => (
                <tr
                  key={h.habitacion}
                  className={`border-b ${h.averia ? "bg-red-100" : ""}`}
                >
                  <td className="px-4 py-2">{h.habitacion}</td>
                  <td className="px-4 py-2">{h.consumo} L</td>
                  <td className="px-4 py-2">
                    {h.averia ? "🔴 Libre (Avería)" : h.ocupada ? "🟢 Ocupada" : "🔴 Libre"}
                  </td>
                  <td className="px-4 py-2">
                    {h.averia ? "🔧 Avería" : h.porDebajoDelLimite ? "✅ Sí" : "⚠️ No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
