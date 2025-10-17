import React from 'react'
import CreditCalculator from './components/CreditCalculator'

export default function App() {
  return (
    <div className="min-h-screen bg-comiBg flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 flex flex-col gap-6 bg-comiGreen text-white">
          <h1 className="text-3xl font-extrabold">PRÉSTAMOS EXPRESS</h1>
          <p className="text-lg opacity-95">Calculadora visual Comionline · Simula tus cuotas</p>
          <p className="mt-4 text-sm opacity-90">Tasa utilizada: <strong>1% mensual</strong></p>
        </div>

        <div className="p-8">
          <div className="mb-4">
            <img src="/logo.png" alt="Comionline" className="h-10 w-auto" />
          </div>

          <CreditCalculator />

          <footer className="mt-6 text-xs text-gray-400">© Comionline · Calculadora de crédito</footer>
        </div>
      </div>
    </div>
  )
}
