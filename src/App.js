import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Mapa from "./components/Mapa/Mapa";
import HeatmapGlobal from "./components/HeatmapGlobal/HeatmapGlobal";
import Home from "./Screens/Home";
import User from "./Screens/User";
import LeaderboardPage from "./Screens/LeaderboardPage";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/heatmap" element={<HeatmapGlobal />} />
        <Route path="/user" element={<User />} />
        <Route path="/leaderboardPage" element={<LeaderboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
