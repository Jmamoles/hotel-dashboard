import React, { createContext, useContext, useState, useEffect } from "react";

const HabitacionesContext = createContext();

export const useHabitaciones = () => useContext(HabitacionesContext);

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
        porDebajoDelLimite: consumo < 150,
        averia: consumo > 0 && !ocupada,
      });
    }
  });

  return datos;
};

export const HabitacionesProvider = ({ children }) => {
  const [habitaciones, setHabitaciones] = useState([]);

  const refrescarDatos = () => {
    const nuevosDatos = generarConsumoAleatorio();
    setHabitaciones(nuevosDatos);
  };

  useEffect(() => {
    refrescarDatos();
  }, []);

  return (
    <HabitacionesContext.Provider value={{ habitaciones, refrescarDatos }}>
      {children}
    </HabitacionesContext.Provider>
  );
};
