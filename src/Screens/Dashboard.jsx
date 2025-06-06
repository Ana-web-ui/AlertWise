import { useState } from "react";
import Mapa from "../components/Mapa";
import Alertas from "../Screens/Alertas";
import Precipitacao from "../components/Precipitacao";
import Relatos from "../components/Relatos";
import UsuariosAtivos from "../components/UsuariosAtivos";

export default function Dashboard() {
  const [cidade, setCidade] = useState("");
  const [dadosClima, setDadosClima] = useState(null);

  const buscarClima = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=fd502a9538cdf1bd2437c0c3e8bd5dbb
&units=metric&lang=pt_br`
      );
      const dados = await res.json();
      setDadosClima(dados);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* Cabeçalho centralizado */}
      <div className="flex flex-col items-center justify-center mb-8 text-center">
        <h1 className="text-2xl font-bold text-white mb-2">
          Dashboard Inteligente
        </h1>
        <p className="text-gray-200 mb-6">
          Visualize dados em tempo real e tome decisões informadas
        </p>

        {/* Barra de pesquisa */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
          <div className="flex flex-col space-y-3">
            <label className="text-gray-700 font-medium text-left">
              Pesquise o nome da sua cidade:
            </label>
            <input
              type="text"
              placeholder="São Paulo"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={buscarClima}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Pesquisar
            </button>
          </div>
        </div>

        {/* Dados do clima */}
        {dadosClima?.cod === 200 ? (
          <div className="mt-6 bg-white rounded-lg p-4 shadow text-gray-800 w-full max-w-md">
            <p>
              <strong>Cidade:</strong> {dadosClima.name}
            </p>
            <p>
              <strong>Temperatura:</strong> {dadosClima.main.temp}°C
            </p>
            <p>
              <strong>Clima:</strong> {dadosClima.weather[0].description}
            </p>
            <p>
              <strong>Umidade:</strong> {dadosClima.main.humidity}%
            </p>
            <p>
              <strong>Vento:</strong> {dadosClima.wind.speed} km/h
            </p>
          </div>
        ) : (
          dadosClima && (
            <div className="mt-6 bg-red-100 rounded-lg p-4 shadow text-red-800 w-full max-w-md">
              <p>
                <strong>Erro:</strong>{" "}
                {dadosClima.message || "Cidade não encontrada."}
              </p>
            </div>
          )
        )}
      </div>

      {/* Grid de componentes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-4 shadow text-center">
          <h3 className="font-semibold text-gray-700">Risco Atual</h3>
          <p className="text-2xl font-bold text-yellow-500">MÉDIO</p>
          <p className="text-sm text-gray-500">Baseado em 15 setores</p>
        </div>
        <Precipitacao dadosClima={dadosClima} />
        <Relatos />
        <UsuariosAtivos />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow">
          <h2 className="text-xl font-semibold mb-4">Mapa de Risco</h2>
          <div className="h-96">
            <Mapa dadosClima={dadosClima} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-xl font-semibold mb-4">Alertas Recentes</h2>
          <Alertas />
        </div>
      </div>
    </div>
  );
}
