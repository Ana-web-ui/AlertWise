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
  perigo: "bg-red-400",
  aviso: "bg-yellow-300",
  info: "bg-green-300",
};

export default function Alertas() {
  return (
    <div className=" p-6 bg-gradient-to-b from-blue-800 to-blue-900">
      <h1 className="text-3xl font-bold text-white mb-6">📢 Alertas Recentes</h1>
      
      <div className="bg-white rounded-xl shadow-md p-4 space-y-2">
        {alertas.map((alerta) => (
          <div
            key={alerta.id}
            className={`w-full h-10 ${tipoCor[alerta.tipo]} rounded-lg flex items-center justify-between px-4`}
          >
            <span className="font-semibold">{alerta.titulo}</span>
            <span className="text-sm">{alerta.data}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
