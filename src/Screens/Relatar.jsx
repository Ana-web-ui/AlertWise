import { useState, useEffect } from "react";

export default function Relatar() {
  const [relatos, setRelatos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
      console.log(data);

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
        throw new Error("Erro ao carregar relatos");
      }

      fetchRelatos();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleEnviar = async (e) => {
    e.preventDefault();

    const relatoData = {
      ...novoRelato,
    };

    try {
      const response = await fetch("https://alert-wise.onrender.com/relato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(relatoData),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar relato");
      }

      const data = await response.json();
      console.log(data);

      setNovoRelato({
        name: "",
        email: "",
        password: "",
        title: "",
        content: "",
        date_published: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  function handleData(data) {
    const dataISO = "2025-06-06T21:02:05";
    const [dataCompleta] = dataISO.split("T");
    const [ano, mes, dia] = dataCompleta.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

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
        <input
          type="email"
          placeholder="Seu email"
          className="w-full p-3 border rounded bg-white text-blue-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Sua senha"
          className="w-full p-3 border rounded bg-white text-blue-900"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
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

      <h2 className="text-xl font-semibold mb-3 text-white">
        Relatos Recebidos
      </h2>

      {isLoading ? (
        <p className="text-gray-50">Carregando...</p>
      ) : (
        <div className="space-y-4">
          {relatos.length === 0 ? (
            <p className="text-gray-50">Nenhum relato enviado ainda.</p>
          ) : (
            relatos.map((relato) => {
              {console.log(relato)}
              {console.log(relatos)}
              const nome = relato.nome || relato.name;
              const conteudo =
                relato.conteudo || relato.content;
              const dataRelato = relato.data || relato.createdAt || relato.date;

              // Função para formatar a data com segurança
              const formatarData = (dataString) => {
                if (!dataString) return "Data não disponível";
                try {
                  const data = new Date(dataString);
                  return isNaN(data.getTime())
                    ? "Data inválida"
                    : data.toLocaleString();
                } catch {
                  return "Data inválida";
                }
              };

              return (
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
                      <h3 className="font-bold text-lg">{nome}</h3>
                      <p className="text-gray-800 mb-2">{conteudo}</p>
                      <p className="text-gray-500 text-sm">
                        {formatarData(dataRelato)}
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
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
