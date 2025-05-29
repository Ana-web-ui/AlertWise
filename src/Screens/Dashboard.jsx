import React from "react";
import Mapa from "../components/Mapa/Mapa";
import Alertas from "../Screens/Alertas";
import Precipitacao from "../components/Precipitacao/Precipitacao";
import Relatos from "../components/Relatos/Relatos";
import UsuariosAtivos from "../components/UsuariosAtivos/UsuariosAtivos";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-900 p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4 shadow w-full max-w-[650px]">
          <Mapa />
        </div>

        <div>
          <Alertas />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Precipitacao />
        <Relatos />
        <UsuariosAtivos />
      </div>
    </div>
  );
}
