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
    <div className="min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-white">
        📖 Relatos da Comunidade
      </h1>

      {/* Lista de Relatos */}
      <div className="space-y-6 mb-12">
        {relatos.map((relato) => (
          <div key={relato[0]} className="bg-gray-100 p-4 rounded-xl shadow">
            <div className="flex flex-col justify-between mb-2">
              <span className="font-semibold text-gray-700">{relato[1]}</span>
              <span className="text-sm text-gray-500">
                {handleData(relato[3])}
              </span>
            </div>
            <p className="text-gray-800 mb-3">{relato[2]}</p>

            <button
              onClick={() => handleDelete(relato[0])}
              className="bg-red-600 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-700 hover:scale-105 duration-300"
            >
              Deletar
            </button>

            <button
              // onClick={() => }
              className="bg-yellow-600 ms-5 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-700 hover:scale-105 duration-300"
            >
              Editar
            </button>
          </div>
        ))}
      </div>

      {/* Formulário de Relato */}
      <div className="bg-blue-50 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Compartilhe seu relato
        </h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleEnviar} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Seu nome (opcional)"
            value={novoRelato.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Seu e-mail (opcional)"
            value={novoRelato.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Sua senha (opcional)"
            value={novoRelato.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            name="title"
            placeholder="Título do relato (opcional)"
            value={novoRelato.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
          <textarea
            name="content"
            required
            placeholder="Conte aqui o que aconteceu..."
            value={novoRelato.content}
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
