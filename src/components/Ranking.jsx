const Ranking = ({ rank, player, team, scores, total, change }) => {
  return (
    <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm text-white p-4 rounded-xl mb-3 border border-white/20 hover:bg-white/15 transition-colors">
      {/* Lado esquerdo - Posição e informações do usuário */}
      <div className="flex items-center gap-4 w-1/2">
        <div
          className={`text-xl w-8 h-8 flex items-center justify-center rounded-full font-bold ${
            rank === 1
              ? "bg-yellow-500 text-black"
              : rank === 2
              ? "bg-gray-400 text-black"
              : rank === 3
              ? "bg-amber-700 text-white"
              : "bg-transparent"
          }`}
        >
          {rank === 1 ? "🏆" : rank}
        </div>

        <img
          src="/woman.png"
          alt={player}
          className="w-10 h-10 rounded-full border-2 border-indigo-400 object-cover"
        />

        <div className="min-w-0">
          <div className="font-semibold truncate">{player}</div>
          <div className="text-xs text-gray-300 truncate">{team}</div>
        </div>
      </div>

      {/* Lado direito - Pontuações e total */}
      <div className="flex items-center gap-4">
        <div className="flex gap-2 text-sm">
          {scores.map((score, index) => (
            <div
              key={index}
              className="text-center px-2 py-1 bg-white/10 rounded-md min-w-[40px]"
            >
              <div className="font-medium">{score}</div>
            </div>
          ))}
        </div>

        <div className="text-lg font-bold bg-indigo-600 rounded-full w-10 h-10 flex items-center justify-center ml-2">
          {total}
        </div>
      </div>
    </div>
  );
};

export default Ranking;
