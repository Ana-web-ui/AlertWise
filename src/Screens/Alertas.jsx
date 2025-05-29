// src/pages/Alertas.jsx
import React from "react";

const alertas = [
  {
    id: 1,
    titulo: "Alerta de Enchente",
    descricao: "Risco alto de enchente na região central.",
    tipo: "perigo",
    data: "29/05/2025",
  },
  {
    id: 2,
    titulo: "Queda de energia",
    descricao: "Interrupção no fornecimento em alguns bairros.",
    tipo: "aviso",
    data: "28/05/2025",
  },
  {
    id: 3,
    titulo: "Evento Comunitário",
    descricao: "Mutirão de limpeza urbana neste sábado.",
    tipo: "info",
    data: "27/05/2025",
  },
];

const tipoCor = {
  perigo: "bg-red-600 text-white",
  aviso: "bg-yellow-400 text-black",
  info: "bg-blue-500 text-white",
};

export default function Alertas() {
  return (
    <div className="min-h-screen  p-6">
      <h1 className="text-3xl font-bold text-white mb-6">📢 Alertas</h1>
      <div className="space-y-4">
        {alertas.map((alerta) => (
          <div
            key={alerta.id}
            className={`rounded-xl shadow p-4 ${tipoCor[alerta.tipo]}`}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{alerta.titulo}</h2>
              <span className="text-sm opacity-70">{alerta.data}</span>
            </div>
            <p className="mt-2">{alerta.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
