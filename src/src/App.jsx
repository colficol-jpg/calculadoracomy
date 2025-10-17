import React from "react";
import CreditCalculator from "./components/CreditCalculator";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-comiGreen/95 to-comiGreen/80 flex flex-col items-center justify-center text-white p-6">
      {/* Logo y título */}
      <div className="text-center mb-8">
        <img
          src="/logo.png"
          alt="Logo Comionline"
          className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-white shadow-lg"
        />
        <h1 className="text-3xl font-extrabold">
          Calculadora de Crédito <span className="text-comiOrange">Comionline</span>
        </h1>
        <p className="text-gray-200 mt-2">
          Calcula tus cuotas mensuales de forma rápida y sencilla
        </p>
      </div>

      {/* Calculadora */}
      <div className="bg-white text-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <CreditCalculator />
      </div>

      {/* Pie de página */}
      <footer className="mt-8 text-sm text-gray-200">
        © {new Date().getFullYear()} Comionline - Cálculos Financieros
      </footer>
    </div>
  );
}
