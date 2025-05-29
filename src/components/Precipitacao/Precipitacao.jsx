import React from 'react';

export default function Precipitacao() {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h2 className="font-semibold text-lg mb-2">Precipitação</h2>
      <p className="text-gray-700">Total acumulado: <strong>120 mm</strong></p>
      <p className="text-gray-500 text-sm">Última atualização: 29/05/2025</p>
    </div>
  );
}
