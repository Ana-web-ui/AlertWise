import React, { useState } from "react";

export default function Relatar() {
  const [relatos, setRelatos] = useState([
    {
      id: 1,
      nome: "Maria Silva",
      data: "27/05/2025",
      texto: "Minha casa foi invadida pela água durante a chuva intensa. Perdemos móveis e documentos.",
    },
    {
      id: 2,
      nome: "João Oliveira",
      data: "25/05/2025",
      texto: "O bairro ficou sem luz por 3 dias após a enchente. Foi muito difícil cuidar das crianças.",
    },
  ]);

  const [novoRelato, setNovoRelato] = useState({
    nome: "",
    texto: "",
  });

  const handleChange = (e) => {
    setNovoRelato({ ...novoRelato, [e.target.name]: e.target.value });
  };

  const handleEnviar = (e) => {
    e.preventDefault();
    const novo = {
      id: relatos.length + 1,
      nome: novoRelato.nome || "Anônimo",
      texto: novoRelato.texto,
      data: new Date().toLocaleDateString("pt-BR"),
    };
    setRelatos([novo, ...relatos]);
    setNovoRelato({ nome: "", texto: "" });
  };

  return (
    <div className="min-h-screen  px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-white">📖 Relatos da Comunidade</h1>

      {/* Lista de Relatos */}
      <div className="space-y-6 mb-12">
        {relatos.map((relato) => (
          <div key={relato.id} className="bg-gray-100 p-4 rounded-xl shadow">
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-700">{relato.nome}</span>
              <span className="text-sm text-gray-500">{relato.data}</span>
            </div>
            <p className="text-gray-800">{relato.texto}</p>
          </div>
        ))}
      </div>

      {/* Formulário de Relato */}
      <div className="bg-blue-50 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Compartilhe seu relato</h2>
        <form onSubmit={handleEnviar} className="space-y-4">
          <input
            type="text"
            name="nome"
            placeholder="Seu nome (opcional)"
            value={novoRelato.nome}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
          <textarea
            name="texto"
            required
            placeholder="Conte aqui o que aconteceu..."
            value={novoRelato.texto}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 h-32"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Enviar Relato
          </button>
        </form>
      </div>
    </div>
  );
}
