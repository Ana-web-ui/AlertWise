import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HeatmapGlobal from "./components/HeatmapGlobal/HeatmapGlobal";
import Home from "./Screens/Home";
import User from "./Screens/User";
import LeaderboardPage from "./Screens/LeaderboardPage";
import Alertas from "./Screens/Alertas";
import Relatar from "./Screens/Relatar";

const App = () => {
  return (
    <Router>
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
