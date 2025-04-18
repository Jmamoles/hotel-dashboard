import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false }; // Estado para manejar si hubo un error
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado cuando haya un error
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Este método captura detalles del error y lo puedes logear
    console.error("Error:", error);
    console.error("Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Si hay un error, muestra un mensaje de error en lugar de la app
      return <h1>Algo salió mal. Intenta nuevamente más tarde.</h1>;
    }

    // Si no hay error, se renderiza lo que se pase como hijos
    return this.props.children;
  }
}

export default ErrorBoundary;

