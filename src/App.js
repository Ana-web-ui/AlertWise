import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeatmapGlobal from "./components/HeatmapGlobal";
import Loading from "./components/Loading";
import Home from "./Screens/Home";
import User from "./Screens/User";
import LeaderboardPage from "./Screens/LeaderboardPage";
import Alertas from "./Screens/Alertas";
import Relatar from "./Screens/Relatar";
import Background from "./Screens/Background";
import "./index.css";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula tempo de carregamento (3 segundos)
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

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
