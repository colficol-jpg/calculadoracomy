import React, { useState, useMemo } from 'react'

function formatCurrency(value) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)
}

// tasa fija 1% mensual
export default function CreditCalculator() {
  const [amount, setAmount] = useState(1200000)
  const [months, setMonths] = useState(12)

  const monthlyRate = 0.01

  const results = useMemo(() => {
    const P = Number(amount)
    const r = monthlyRate
    const n = Number(months)
    if (!P || !n) return { installment: 0, schedule: [], total: 0, interest: 0 }

    // Cuota fija (anualidad): A = P * r / (1 - (1+r)^-n)
    const installment = (P * r) / (1 - Math.pow(1 + r, -n))
    const schedule = []
    let remaining = P
    for (let i = 1; i <= n; i++) {
      const interestPortion = remaining * r
      const principalPortion = installment - interestPortion
      remaining = remaining - principalPortion
      schedule.push({
        month: i,
        payment: installment,
        principal: principalPortion,
        interest: interestPortion,
        remaining: remaining > 0 ? remaining : 0
      })
    }
    const total = installment * n
    const interest = total - P
    return { installment, schedule, total, interest }
  }, [amount, months, monthlyRate])

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700">Monto del crédito (COP)</label>
        <input
          type="range"
          min={800000}
          max={8000000}
          step={10000}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>{formatCurrency(800000)}</span>
          <span>{formatCurrency(8000000)}</span>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <input
            className="w-full rounded-md border px-3 py-2"
            type="number"
            min={800000}
            max={8000000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-gray-700">Plazo (meses)</label>
          <select className="w-full rounded-md border px-3 py-2" value={months} onChange={(e) => setMonths(Number(e.target.value))}>
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={18}>18</option>
            <option value={24}>24</option>
            <option value={36}>36</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Tasa mensual (fija)</label>
          <input className="w-full rounded-md border px-3 py-2 bg-gray-100" value="1% (fija)" disabled />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="text-sm font-semibold text-gray-700">Resultados</h3>
        <div className="mt-3 grid grid-cols-1 gap-2">
          <div className="flex justify-between text-gray-600">
            <span>Cuota mensual</span>
            <span className="font-semibold text-lg text-comiGreen">{formatCurrency(Math.round(results.installment))}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Total a pagar</span>
            <span className="font-medium">{formatCurrency(Math.round(results.total))}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Interés total</span>
            <span className="font-medium text-comiOrange">{formatCurrency(Math.round(results.interest))}</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Tabla de amortización</h4>
        <div className="overflow-y-auto max-h-56 border rounded">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="p-2 text-left">Mes</th>
                <th className="p-2 text-right">Pago</th>
                <th className="p-2 text-right">Capital</th>
                <th className="p-2 text-right">Interés</th>
                <th className="p-2 text-right">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {results.schedule.map((row) => (
                <tr key={row.month} className="border-t">
                  <td className="p-2">{row.month}</td>
                  <td className="p-2 text-right">{formatCurrency(Math.round(row.payment))}</td>
                  <td className="p-2 text-right">{formatCurrency(Math.round(row.principal))}</td>
                  <td className="p-2 text-right">{formatCurrency(Math.round(row.interest))}</td>
                  <td className="p-2 text-right">{formatCurrency(Math.round(row.remaining))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
