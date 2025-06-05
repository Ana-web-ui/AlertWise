import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeatmapGlobal from "./components/HeatmapGlobal";
import Home from "./Screens/Home";
import User from "./Screens/User";
import LeaderboardPage from "./Screens/LeaderboardPage";
import Alertas from "./Screens/Alertas";
import Relatar from "./Screens/Relatar";
import Background from "./Screens/Background";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Background />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/heatmap" element={<HeatmapGlobal />} />
        <Route path="/user" element={<User />} />
        <Route path="/leaderboardPage" element={<LeaderboardPage />} />
        <Route path="/alertas" element={<Alertas />} />
        <Route path="/relatar" element={<Relatar />} />
      </Routes>
    </Router>
  );
};

export default App;
