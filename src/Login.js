import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoAqua from "./assets/logo-aqua.png";
import logoNH from "./assets/logo-nh.png";
import "./index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rol, setRol] = useState(""); // Variable para manejar el rol (solo empleados)
  const navigate = useNavigate();

  // Lista de clientes (esto se importaría de SAP)
  const clientes = [
    { email: "cliente1@gmail.com", habitacion: "222" },
    { email: "cliente2@gmail.com", habitacion: "303" },
  ];

  // Lista de empleados (esto también se importaría de SAP)
  const empleados = [
    { email: "jm.molina@nh-hotels.com", empleadoId: "224524" },
    { email: "empleado2@nh-hotels.com", empleadoId: "112233" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    // Verifica si es cliente
    const esCliente = clientes.find(
      (cli) => cli.email === email && cli.habitacion === password
    );
    if (esCliente) {
      // Si es cliente, lo redirige al Dashboard1 con el número de habitación
      navigate(`/dashboard1/${esCliente.habitacion}`);
      return;
    }

    // Verifica si es empleado
    const esEmpleado = empleados.find(
      (emp) => emp.email === email && emp.empleadoId === password
    );
    if (esEmpleado) {
      // Si es empleado, mostramos la selección de rol (Recepción o Mantenimiento)
      if (!rol) {
        setError("Por favor, seleccione un rol.");
        return;
      }

      // Guardamos el rol en localStorage y redirigimos al dashboard correspondiente
      localStorage.setItem("user", email);
      localStorage.setItem("rol", rol);

      // Redirigir según el rol seleccionado
      if (rol === "recepcion") {
        // Si es Recepción, redirigimos al DashboardCorporativo
        navigate("/dashboard");
      } else if (rol === "mantenimiento") {
        // Si es Mantenimiento, redirigimos al DashboardCorporativo directamente
        navigate("/datos"); // Directo al dashboard corporativo
      }

      return;
    }

    // Si no es válido
    setError("Credenciales incorrectas, por favor intenta de nuevo.");
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center login-container">
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          color: "#000",
          padding: "2rem",
          borderRadius: "1rem",
          maxWidth: "375px",
          width: "100%",
          boxShadow: "0 0 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="text-center">
          <img
            src={logoAqua}
            alt="Logo AquaCare"
            className="mx-auto mb-4"
            style={{ width: "340px", objectFit: "contain" }}
          />
          <h2 className="text-4xl font-bold text-blue-700 mb-1">AQUACARE</h2>
          <h3 className="text-lg font-medium text-gray-600 mb-6">Iniciar sesión</h3>

          {error && <div className="text-red-600 mb-4">{error}</div>}
        </div>

        <form onSubmit={handleLogin} className="text-left">
          <div className="mb-4">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Mostrar la selección de rol solo si el email pertenece a un empleado */}
          {email.endsWith("@nh-hotels.com") && (
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Seleccionar Rol</label>
              <select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="">Seleccione un rol</option>
                <option value="recepcion">Recepción</option>
                <option value="mantenimiento">Mantenimiento</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        <img
          src={logoNH}
          alt="Logo NH Hotels"
          className="mx-auto mt-6"
          style={{ width: "350px", objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default Login;
