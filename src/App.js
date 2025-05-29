import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Mapa from "./components/Mapa/Mapa";
import HeatmapGlobal from "./components/HeatmapGlobal/HeatmapGlobal";
import Home from "./Screens/Home";
import User from "./Screens/User";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/heatmap" element={<HeatmapGlobal />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
};

export default App;
