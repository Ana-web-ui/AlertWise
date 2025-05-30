import React, { useState } from "react";

const alertas = [
  {
    id: 1,
    titulo: "Alerta de Enchente",
    descricao: "Risco alto de enchente na região central devido às fortes chuvas dos últimos dias. Áreas afetadas: Centro, Vila Nova e Jardim das Flores. Recomenda-se evacuação preventiva.",
    tipo: "perigo",
    data: "29/05/2025",
    detalhes: "Nível do rio atingiu 5.2m. Defesa Civil em alerta máximo."
  },
  {
    id: 2,
    titulo: "Queda de energia",
    descricao: "Interrupção no fornecimento em alguns bairros devido a manutenção programada.",
    tipo: "aviso",
    data: "28/05/2025",
    detalhes: "Bairros afetados: Centro, Zona Norte. Previsão de retorno: 18h."
  },
  {
    id: 3,
    titulo: "Evento Comunitário",
    descricao: "Mutirão de limpeza urbana neste sábado das 8h às 12h.",
    tipo: "info",
    data: "27/05/2025",
    detalhes: "Ponto de encontro: Praça Central. Trazer luvas e água."
  },
];

const tipoCor = {
  perigo: "bg-red-400 border-red-600",
  aviso: "bg-yellow-300 border-yellow-500",
  info: "bg-green-300 border-green-500",
};

const tipoTexto = {
  perigo: "text-white",
  aviso: "text-gray-800",
  info: "text-gray-800",
};

export default function Alertas() {
  const [alertaExpandido, setAlertaExpandido] = useState(null);

  return (
    <div className="p-6 bg-gradient-to-b from-blue-800 to-blue-900 rounded-xl">
      <h1 className="text-3xl font-bold text-white mb-6">📢 Alertas Recentes</h1>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-4 space-y-2 border border-white/20">
        {alertas.map((alerta) => (
          <div 
            key={alerta.id}
            className="overflow-hidden rounded-lg"
            onMouseEnter={() => setAlertaExpandido(alerta.id)}
            onMouseLeave={() => setAlertaExpandido(null)}
          >
            {/* Cabeçalho do Alerta */}
            <div 
              className={`w-full h-12 ${tipoCor[alerta.tipo]} ${tipoTexto[alerta.tipo]} rounded-lg flex items-center justify-between px-4 border cursor-pointer transition-all`}
            >
              <span className="font-semibold">{alerta.titulo}</span>
              <span className="text-sm font-medium">{alerta.data}</span>
            </div>

            {/* Detalhes Expandidos */}
            <div 
              className={`transition-all duration-300 ease-in-out ${alertaExpandido === alerta.id ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
            >
              <div className="p-4 bg-white/90 text-gray-800 rounded-b-lg">
                <p className="font-medium mb-2">{alerta.descricao}</p>
                <div className="bg-gray-100 p-3 rounded-md">
                  <p className="text-sm font-semibold text-gray-700">Detalhes:</p>
                  <p className="text-sm">{alerta.detalhes}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}