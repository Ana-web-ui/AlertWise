import Ranking from "../components/Ranking/Ranking";

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
  // Adicione mais jogadores aqui
];

const LeaderboardPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Ranking AlertWise</h1>
      {players.map((p, index) => (
        <Ranking key={index} {...p} />
      ))}
    </div>
  );
};

export default LeaderboardPage;
