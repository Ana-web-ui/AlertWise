import Ranking from "../components/Ranking";

const players = [
  {
    rank: 1,
    player: "Jean-Loup Autret",
    team: "ESY Les Moulineaux",
    avatar: "/avatars/jeanloup.jpg",
    scores: [67, 66, 65, 62, 62],
    total: 65,
  },
  {
    rank: 2,
    player: "Lilouan V",
    team: "GC Chernos",
    avatar: "/avatars/lilouan.jpg",
    scores: [46, 79, 63, 60, 48],
    total: 63,
  },
  {
    rank: 3,
    player: "Maria S.",
    team: "São Paulo, SP",
    avatar: "/avatars/maria.jpg",
    scores: [45, 70, 60, 55, 50],
    total: 60,
  },
  {
    rank: 4,
    player: "João P.",
    team: "Rio de Janeiro, RJ",
    avatar: "/avatars/joao.jpg",
    scores: [40, 65, 55, 50, 45],
    total: 55,
  },
  {
    rank: 5,
    player: "Ana L.",
    team: "Porto Alegre, RS",
    avatar: "/avatars/ana.jpg",
    scores: [35, 60, 50, 45, 40],
    total: 50,
  },
];

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen text-white p-6">
      {/* Cabeçalho */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Seja um Herói da Sua Comunidade
        </h1>
        <p className="text-xl text-gray-200">
          Ganhe reconhecimento por ajudar a proteger vidas
        </p>
      </div>

      {/* Categorias de Ranking */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Meteorologista Comunitário */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
          <h3 className="text-xl font-semibold mb-2">
            Meteorologista Comunitário
          </h3>
          <p className="text-gray-300 mb-4">50 relatos precisos</p>
          <p className="text-yellow-400 font-medium">10 pontos por relato</p>
        </div>

        {/* Protetor da Cidade */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
          <h3 className="text-xl font-semibold mb-2">Protetor da Cidade</h3>
          <p className="text-gray-300 mb-4">Salvou 100+ pessoas</p>
          <p className="text-yellow-400 font-medium">25 pontos por alerta</p>
        </div>

        {/* Olho de Comunidade */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
          <h3 className="text-xl font-semibold mb-2">Olho de Comunidade</h3>
          <p className="text-gray-300 mb-4">200 fotos de evidência</p>
          <p className="text-yellow-400 font-medium">5 pontos por foto</p>
        </div>

        {/* Nobilizador */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
          <h3 className="text-xl font-semibold mb-2">Nobilizador</h3>
          <p className="text-gray-300 mb-4">Trouxe 50+ usuários</p>
          <p className="text-yellow-400 font-medium">5 pontos por convite</p>
        </div>
      </div>

      {/* Seção Principal do Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ranking Completo */}
        <div className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Ranking Completo
          </h2>
          <div className="space-y-3">
            {players.map((player) => (
              <Ranking key={player.rank} {...player} />
            ))}
          </div>
        </div>

        {/* Top da Semana */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Top Guarúlões da Semana
          </h2>
          <div className="space-y-4">
            {players.slice(0, 5).map((player) => (
              <div
                key={player.rank}
                className="flex items-center p-3 hover:bg-white/5 rounded-lg transition"
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-bold mr-4 ${
                    player.rank === 1
                      ? "bg-yellow-500 text-black"
                      : player.rank === 2
                      ? "bg-gray-400 text-black"
                      : player.rank === 3
                      ? "bg-amber-700 text-white"
                      : "bg-white/10"
                  }`}
                >
                  {player.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{player.player}</p>
                  <p className="text-sm text-gray-300 truncate">
                    {player.team}
                  </p>
                </div>
                <div className="text-lg font-bold bg-indigo-600 rounded-full w-10 h-10 flex items-center justify-center">
                  {player.total}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
