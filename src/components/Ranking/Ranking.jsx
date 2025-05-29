const Ranking = ({ rank, player, team, avatar, scores, total, change }) => {
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 rounded-xl mb-2 shadow-md">
      <div className="flex items-center gap-4">
        <div className="text-xl w-8 text-center font-bold">
          {rank === 1 ? "🏆" : rank}
        </div>
        <img src={avatar} alt={player} className="w-10 h-10 rounded-full" />
        <div>
          <div className="font-semibold">{player}</div>
          <div className="text-xs text-gray-400">{team}</div>
        </div>
      </div>
      <div className="flex gap-4 text-sm">
        {scores.map((score, index) => (
          <div key={index} className="text-center">
            <div className="font-bold">{score}</div>
          </div>
        ))}
      </div>
      <div className="text-lg font-bold bg-pink-600 rounded-full w-10 h-10 flex items-center justify-center">
        {total}
      </div>
    </div>
  );
};

export default Ranking;
