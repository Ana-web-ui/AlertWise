import { useState, useEffect } from "react";

export default function Relatar() {
  const [relatos, setRelatos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [relatoAtual, setRelatoAtual] = useState(null);
  const [textoEditado, setTextoEditado] = useState("");

  const [novoRelato, setNovoRelato] = useState({
    name: "",
    email: "",
    password: "",
    content: "",
    date_published: "",
  });

  const fetchRelatos = async () => {
    try {
      const response = await fetch("https://alert-wise.onrender.com/relatos");
      if (!response.ok) {
        throw new Error("Erro ao carregar relatos");
      }
      const data = await response.json();
      setRelatos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRelatos();
  }, []);

  const handleChange = (e) => {
    setNovoRelato({ ...novoRelato, [e.target.name]: e.target.value });
  };

  const handleEnviar = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://alert-wise.onrender.com/relato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoRelato),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar relato");
      }

      await response.json();
      setNovoRelato({
        name: "",
        email: "",
        password: "",
        content: "",
        date_published: "",
      });
      fetchRelatos();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  async function handleDelete(id) {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://alert-wise.onrender.com/relato?post_id=${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao deletar relato");
      }
      fetchRelatos();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleEditar = (relato) => {
    setRelatoAtual(relato);
    setTextoEditado(relato[2]);
    setShowModal(true);
  };

  const handleSalvarEdicao = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("https://alert-wise.onrender.com/relato", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: relatoAtual[0],
          content: textoEditado,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar relato");
      }

      const data = await response.json();
      console.log("Resposta da API:", data);

      setShowModal(false);
      fetchRelatos();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelarEdicao = () => {
    setShowModal(false);
    setTextoEditado("");
  };

  const formatarData = (dataString) => {
    if (!dataString) return "Data não disponível";
    try {
      const data = new Date(dataString);
      return isNaN(data.getTime())
        ? "Data inválida"
        : data.toLocaleString("pt-BR");
    } catch {
      return "Data inválida";
    }
  };

  if (isLoading) return <div className="text-white">Carregando...</div>;
  if (error) return <div className="text-red-500">Erro: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Modal de Edição */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Editar Relato</h2>
            <textarea
              className="w-full p-3 border rounded mb-4"
              value={textoEditado}
              onChange={(e) => setTextoEditado(e.target.value)}
              rows={5}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancelarEdicao}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvarEdicao}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resto do seu código permanece igual */}
      <h1 className="text-2xl font-bold mb-4 text-white">Envie seu Relato</h1>
      <form onSubmit={handleEnviar} className="mb-6 space-y-2 text-white">
        {/* ... (seus inputs de formulário) ... */}
      </form>

      <h2 className="text-xl font-semibold mb-3 text-white">
        Relatos Recebidos
      </h2>

      <div className="space-y-4">
        {relatos.map((relato) => (
          <div
            key={relato[0]}
            className="border p-4 rounded shadow-sm bg-white"
          >
            <h3 className="font-bold text-lg">{relato[1]}</h3>
            <p className="text-gray-800 mb-2">{relato[2]}</p>
            <p className="text-gray-500 text-sm">{formatarData(relato[3])}</p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleEditar(relato)}
                className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                disabled={isLoading}
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(relato[0])}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                disabled={isLoading}
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
