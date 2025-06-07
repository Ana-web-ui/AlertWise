import React, { useEffect, useState } from "react";

export default function Relatar() {
  const [relato, setRelato] = useState("");
  const [relatos, setRelatos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editandoRelatoId, setEditandoRelatoId] = useState(null);
  const [textoEditado, setTextoEditado] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const API_URL = "https://alert-wise.onrender.com/relato";

  useEffect(() => {
    async function carregarRelatos() {
      setIsLoading(true);
      try {
        const response = await fetch("https://alert-wise.onrender.com/relato");
        if (!response.ok) {
          throw new Error("Erro ao carregar relatos");
        }
        const dados = await response.json();
        setRelatos(dados);
      } catch (error) {
        console.error("Erro ao carregar relatos:", error);
      } finally {
        setIsLoading(false);
      }
    }
    carregarRelatos();
  }, []);

  async function enviarRelato(e) {
    e.preventDefault();

    // Validação dos campos
    if (!relato.trim() || !nome.trim() || !email.trim() || !senha.trim()) {
      alert("Por favor, preencha todos os campos corretamente");
      return;
    }

    setIsLoading(true);
    try {
      const API_URL = "https://alert-wise.onrender.com/relato"; 
      // 2. Objeto com os dados no formato que o backend espera
      const dadosRelato = {
        name: nome.trim(), // Verifique se o backend espera 'name' ou 'nome'
        email: email.trim(),
        password: senha.trim(), // Ou 'senha' dependendo do backend
        content: relato.trim(), // Ou 'conteudo'
        // Alguns backends exigem data de criação
        createdAt: new Date().toISOString(),
      };

      console.log("Enviando dados:", dadosRelato);

      // 3. Faça a requisição com tratamento de erros melhorado
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Se precisar de autenticação:
          // "Authorization": `Bearer ${seuToken}`
        },
        body: JSON.stringify(dadosRelato),
      });

      console.log("Resposta da API:", response);

      if (!response.ok) {
        // Tenta obter mais detalhes do erro
        const errorDetails = await response.text();
        console.error("Detalhes do erro:", errorDetails);
        throw new Error(`Erro ${response.status}: ${errorDetails}`);
      }

      const novoRelato = await response.json();
      console.log("Relato criado:", novoRelato);

      // Atualiza o estado
      setRelatos((prev) => [...prev, novoRelato]);

      // Limpa o formulário
      setRelato("");
      setNome("");
      setEmail("");
      setSenha("");

      alert("Relato enviado com sucesso!");
    } catch (error) {
      console.error("Erro completo:", error);
      alert(`Falha ao enviar: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }
  async function handleDeletar(id) {
    if (!window.confirm("Tem certeza que deseja excluir este relato?")) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}?post_id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setRelatos((prevRelatos) => prevRelatos.filter((r) => r.id !== id));
      } else {
        console.error("Erro da API:", await response.text());
      }
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
      const response = await fetch(`${API_URL}?post_id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conteudo: textoEditado,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar relato");
      }

      const relatoAtualizado = await response.json();
      setRelatos((prevRelatos) =>
        prevRelatos.map((r) =>
          r.id === id ? { ...r, conteudo: relatoAtualizado.conteudo } : r
        )
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
