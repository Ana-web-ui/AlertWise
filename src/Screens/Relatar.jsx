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
    date_published: ""
  });

  useEffect(() => {
    const fetchRelatos = async () => {
      try {
        const response = await fetch("http://localhost:8000/relatos");
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
    
    fetchRelatos();
  }, []);

  const handleChange = (e) => {
    setNovoRelato({ ...novoRelato, [e.target.name]: e.target.value });
  };

  const handleEnviar = async (e) => {
    e.preventDefault();
    
    // Preparar dados para enviar
    const relatoData = {
      ...novoRelato,
      date_published: new Date().toISOString(), // Formato ISO para a API
      title: novoRelato.title || "Relato sem título" // Título padrão se não fornecido
    };

    try {
      const response = await fetch("/relato", {
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
      
      setRelatos([{ // Isso é temporário - o ID deve vir da API
        nome: relatoData.name || "Anônimo",
        texto: relatoData.content,
        data: new Date(relatoData.date_published).toLocaleDateString("pt-BR")
      }, ...relatos]);

      // Resetar formulário
      setNovoRelato({
        name: "",
        email: "",
        password: "",
        title: "",
        content: "",
        date_published: ""
      });

    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="min-h-screen px-6 py-10">
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