import React, { useEffect, useState } from "react";


export default function Relatar() {
  const [relato, setRelato] = useState("");
  const [relatos, setRelatos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editandoRelatoId, setEditandoRelatoId] = useState(null);
  const [textoEditado, setTextoEditado] = useState("");

  const API_URL = "http://localhost:8000/relatos";

  useEffect(() => {
    buscarRelatos();
  }, []);

  async function buscarRelatos() {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);
      setRelatos(response.data);
    } catch (error) {
      console.error("Erro ao buscar relatos:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function enviarRelato(e) {
    e.preventDefault();
    if (!relato.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(API_URL, { texto: relato });
      setRelatos([...relatos, response.data]);
      setRelato("");
    } catch (error) {
      console.error("Erro ao enviar relato:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeletar(id) {
    if (!window.confirm("Tem certeza que deseja excluir este relato?")) return;

    setIsLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setRelatos(relatos.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Erro ao deletar relato:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleEditar(relato) {
    setEditandoRelatoId(relato.id);
    setTextoEditado(relato.texto);
  }

  function handleCancelarEdicao() {
    setEditandoRelatoId(null);
    setTextoEditado("");
  }

  async function handleSalvarEdicao(id) {
    if (!textoEditado.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        texto: textoEditado,
      });
      setRelatos(
        relatos.map((r) => (r.id === id ? { ...r, texto: response.data.texto } : r))
      );
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
      <h1 className="text-2xl font-bold mb-4">Envie seu Relato</h1>
      <form onSubmit={enviarRelato} className="mb-6">
        <textarea
          className="w-full p-3 border rounded mb-2"
          placeholder="Digite seu relato..."
          value={relato}
          onChange={(e) => setRelato(e.target.value)}
          rows={4}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isLoading}
        >
          Enviar
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-3">Relatos Recebidos</h2>

      {isLoading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : (
        <div className="space-y-4">
          {relatos.length === 0 ? (
            <p className="text-gray-500">Nenhum relato enviado ainda.</p>
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
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        disabled={isLoading}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-800 mb-2">{relato.texto}</p>
                    <div className="flex space-x-2">
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
