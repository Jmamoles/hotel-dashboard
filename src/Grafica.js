// src/GraficaDeConsumo.js
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

const GraficaDeConsumo = () => {
  const [datosPorPlanta, setDatosPorPlanta] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const generarConsumoAleatorio = () => {
      const plantas = ["planta1", "planta2", "planta3", "planta4"];
      const datos = [];

      plantas.forEach((planta, index) => {
        const inicio = 100 + index * 100 + 1;
        const fin = inicio + 24;

        let ocupadas = 0;
        let libres = 0;
        let averias = 0;

        for (let i = inicio; i <= fin; i++) {
          const ocupada = Math.random() < 0.7;
          if (ocupada) {
            ocupadas++;
          } else {
            const averia = Math.random() < 0.2;
            if (averia) {
              averias++;
            } else {
              libres++;
            }
          }
        }

        datos.push({
          planta: planta.replace("planta", "Planta "),
          Ocupadas: ocupadas,
          Libres: libres,
          Averías: averias,
        });
      });

      return datos;
    };

    setDatosPorPlanta(generarConsumoAleatorio());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-95 shadow-2xl rounded-2xl p-6 max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Consumo por Planta</h2>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={datosPorPlanta} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" />
            <YAxis type="category" dataKey="planta" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Ocupadas" fill="#4CAF50" />
            <Bar dataKey="Libres" fill="#2196F3" />
            <Bar dataKey="Averías" fill="#F44336" />
          </BarChart>
        </ResponsiveContainer>

        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
            onClick={() => navigate("/dashboard")}
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default GraficaDeConsumo;