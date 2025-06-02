import React from 'react';

export default function UsuariosAtivos() {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h2 className="font-semibold text-lg mb-2">Usuários Ativos</h2>
      <p className="text-gray-700"><strong>350</strong> usuários conectados</p>
      <p className="text-gray-500 text-sm">Atualizado há 5 min</p>
    </div>
  );
}
