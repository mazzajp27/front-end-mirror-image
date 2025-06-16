import React, { useState } from 'react';

const CanalSuportePage: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setNome('');
    setEmail('');
    setMensagem('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10 px-2">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#0056a4] mb-6 text-center">Canal de Suporte</h1>
        <p className="text-gray-700 text-center mb-8">Precisa de ajuda? Preencha o formulário abaixo ou envie um e-mail para <a href="mailto:suporte@amigocuidador.com" className="text-[#0056a4] underline">suporte@amigocuidador.com</a>.</p>
        {enviado ? (
          <div className="bg-green-100 text-green-800 p-4 rounded mb-4 text-center font-semibold">Mensagem enviada com sucesso! Em breve nossa equipe entrará em contato.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nome" className="block text-gray-800 font-semibold mb-1">Nome</label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0056a4]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-800 font-semibold mb-1">E-mail</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0056a4]"
              />
            </div>
            <div>
              <label htmlFor="mensagem" className="block text-gray-800 font-semibold mb-1">Mensagem</label>
              <textarea
                id="mensagem"
                value={mensagem}
                onChange={e => setMensagem(e.target.value)}
                required
                rows={4}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0056a4]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#0056a4] text-white py-3 rounded font-bold hover:bg-[#004483] transition-colors"
            >
              Enviar Mensagem
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CanalSuportePage; 