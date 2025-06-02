import Mapa from "../components/Mapa";
import Alertas from "../Screens/Alertas";
import Precipitacao from "../components/Precipitacao";
import Relatos from "../components/Relatos";
import UsuariosAtivos from "../components/UsuariosAtivos";

export default function Dashboard() {
  return (
    <div className="min-h-screen p-6">
      {/* Cabeçalho centralizado */}
      <div className="flex flex-col items-center justify-center mb-8 text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Dashboard Inteligente</h1>
        <p className="text-gray-200 mb-6">Visualize dados em tempo real e tome decisões informadas</p>
        
        {/* Barra de pesquisa vertical com fundo branco */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
          <div className="flex flex-col space-y-3">
            <label className="text-gray-700 font-medium text-left">
              Pesquise o nome da sua cidade:
            </label>
            <input 
              type="text" 
              placeholder="São Paulo" 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Pesquisar
            </button>
          </div>
        </div>
      </div>

      {/* Restante do conteúdo permanece igual */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-4 shadow text-center">
          <h3 className="font-semibold text-gray-700">Risco Atual</h3>
          <p className="text-2xl font-bold text-yellow-500">MÉDIO</p>
          <p className="text-sm text-gray-500">Baseado em 15 setores</p>
        </div>
        
        <Precipitacao />
        <Relatos />
        <UsuariosAtivos />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow">
          <h2 className="text-xl font-semibold mb-4">Mapa de Risco</h2>
          <div className="h-96">
            <Mapa />
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