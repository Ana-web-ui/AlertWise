import React, { useEffect, useState } from "react";

export default function Relatar() {
  const [relato, setRelato] = useState("");
  const [relatos, setRelatos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editandoRelatoId, setEditandoRelatoId] = useState(null);
  const [textoEditado, setTextoEditado] = useState("");
  const [nome, setNome] = useState("");

  const API_URL = "https://alert-wise.onrender.com/relato";

  useEffect(() => {
    // Simulando a busca de relatos com a nova estrutura
    const mockRelatos = [
      [
        "Ana",
        "O nível do rio Itajaí-Açu subiu 12 metros em 24h, deixando centenas de desabrigados. A Defesa Civil trabalha no resgate de famílias isoladas.",
        "2025-06-06T11:22:20"
      ],
      [
        "Kevyn",
        "Furacão Maria segue em direção às Pequenas Antilhas com ventos de 220km/h. Autoridades locais já iniciaram evacuação de áreas costeiras.",
        "2025-06-06T11:22:21"
      ],
      [
        "Lucas",
        "6º ano consecutivo de seca extrema no sertão da Bahia. Reservatórios estão com apenas 8% da capacidade e agricultores perderam toda a safra.",
        "2025-06-06T11:22:21"
      ],
      [
        "Genésio",
        "Incêndios florestais já consumiram mais de 500 mil hectares no sul da Austrália. Fumaça atinge Sydney e qualidade do ar está crítica.",
        "2025-06-06T11:22:21"
      ]
    ].filter(item => item[1] !== null); // Filtra itens com conteúdo null

    // Transforma a estrutura de array para objeto com propriedades nomeadas
    const relatosFormatados = mockRelatos.map((item, index) => ({
      id: index + 1,
      nome: item[0],
      conteudo: item[1],
      data: item[2]
    }));

    setRelatos(relatosFormatados);
  }, []);

  async function enviarRelato(e) {
    e.preventDefault();
    if (!relato.trim() || !nome.trim()) return;

    setIsLoading(true);
    try {
      // Simulando o envio para a API
      const novoRelato = {
        id: relatos.length + 1,
        nome: nome,
        conteudo: relato,
        data: new Date().toISOString()
      };

      // Adiciona o novo relato à lista (simulando resposta da API)
      setRelatos(prevRelatos => [...prevRelatos, novoRelato]);
      
      // Limpa os campos
      setRelato("");
      setNome("");
      
      // Redireciona para a página de relatos
      window.location.href = "https://alert-wise.onrender.com/relatos";
      
    } catch (error) {
      console.error("Erro ao enviar relato:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeletar(id) {
    if (!window.confirm("Tem certeza que deseja excluir este relato?")) return;

    setIsLoading(true);
    try {await fetch(`https://alert-wise.onrender.com/relato`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
      
    } catch (error) {
      console.error("Erro ao deletar relato:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleEditar(relato) {
    setEditandoRelatoId(relato.id);
    setTextoEditado(relato.conteudo);
  }

  function handleCancelarEdicao() {
    setEditandoRelatoId(null);
    setTextoEditado("");
  }

  async function handleSalvarEdicao(id) {
    if (!textoEditado.trim()) return;

    setIsLoading(true);
    try {
      // Simulando a edição
      setRelatos(prevRelatos => prevRelatos.map((r) => 
        r.id === id ? {...r, conteudo: textoEditado} : r
      ));
      setEditandoRelatoId(null);
      setTextoEditado("");
    } catch (error) {
      console.error("Erro ao editar relato:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Envie seu Relato</h1>
      <form onSubmit={enviarRelato} className="mb-6 space-y-2 text-white">
        <input
          type="text"
          placeholder="Seu nome"
          className="w-full p-3 border rounded bg-white text-blue-900"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <textarea
          className="w-full p-3 border rounded bg-white text-blue-900"
          placeholder="Digite seu relato..."
          value={relato}
          onChange={(e) => setRelato(e.target.value)}
          rows={4}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isLoading}
        >
          Enviar
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-3 text-white">Relatos Recebidos</h2>

      {isLoading ? (
        <p className="text-gray-50">Carregando...</p>
      ) : (
        <div className="space-y-4">
          {relatos.length === 0 ? (
            <p className="text-gray-50">Nenhum relato enviado ainda.</p>
          ) : (
            relatos.map((relato) => (
              <div
                key={relato.id}
                className="border p-4 rounded shadow-sm bg-white"
              >
                {editandoRelatoId === relato.id ? (
                  <div>
                    <textarea
                      className="w-full p-2 border rounded mb-2"
                      value={textoEditado}
                      onChange={(e) => setTextoEditado(e.target.value)}
                      rows={3}
                      disabled={isLoading}
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSalvarEdicao(relato.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        disabled={isLoading}
                      >
                        Salvar
                      </button>
                      <button
                        onClick={handleCancelarEdicao}
                        className="bg-gray-300 text-gray-50 px-4 py-2 rounded hover:bg-gray-400"
                        disabled={isLoading}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="font-bold text-lg">{relato.nome}</h3>
                    <p className="text-gray-800 mb-2">{relato.conteudo}</p>
                    <p className="text-gray-500 text-sm">
                      {new Date(relato.data).toLocaleString()}
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleEditar(relato)}
                        className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                        disabled={isLoading}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeletar(relato.id)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                        disabled={isLoading}
                      >
                        Deletar
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}