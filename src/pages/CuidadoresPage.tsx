import React from "react";

const CuidadoresPage = () => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const especializacoes = [
    "Parkinson",
    "Diabetes",
    "Mobilidade Reduzida",
    "Atenção Humanizada",
    "Controle de Medicamentos",
    "Estimulação Cognitiva"
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-8">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">👤</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg">Maria Silva <span className="text-yellow-500">⭐</span></span>
              <span className="text-sm font-bold text-gray-700">4.9</span>
            </div>
          </div>
          <button className="text-gray-700 text-3xl focus:outline-none">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></svg>
          </button>
        </div>
        <div className="bg-gray-100 rounded p-4 mb-4 flex items-start justify-between">
          <div>
            <div className="font-bold text-lg mb-2">Informações Pessoais:</div>
            <ul className="text-sm text-black font-semibold list-disc ml-5">
              <li>Disponibilidade: Segunda a Sexta</li>
              <li>Idade: 43 Anos</li>
              <li>Endereço: Taguatinga, DF</li>
            </ul>
          </div>
          <div className="flex flex-col items-center gap-2 relative">
            <div className="relative">
              <button
                className="bg-gray-200 rounded px-3 py-1 text-sm font-semibold flex items-center gap-1"
                onClick={() => setShowDropdown((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={showDropdown}
                aria-label="Mostrar especializações"
              >
                Especializações
                <svg className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {showDropdown && (
                <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10" role="listbox">
                  {especializacoes.map((item, idx) => (
                    <li
                      key={item}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 text-sm"
                      role="option"
                      tabIndex={0}
                      onClick={() => setShowDropdown(false)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 rounded p-4 mb-4">
          <div className="font-bold text-lg mb-2">Descrição Profissional – Cuidadora de Idoso</div>
          <div className="text-black font-semibold text-base">
            Cuidadora de idosos com sólida experiência e especialização no cuidado de pacientes com Parkinson, diabetes e mobilidade reduzida. Presta um atendimento humanizado e individualizado, com foco na segurança, bem-estar e qualidade de vida do idoso. Habilidade no controle de medicamentos, aferição de glicemia, suporte em atividades diárias, higiene pessoal, alimentação e estimulação cognitiva. Profissional paciente, dedicada e atenta aos detalhes.
          </div>
          <div className="mt-2 text-black font-semibold text-base">
            Hobbies: leitura, jardinagem, culinária saudável, caminhadas leves e artesanato
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded font-semibold cursor-not-allowed" disabled>Horários a Negociar!</button>
          <button className="bg-green-400 text-white px-6 py-2 rounded font-semibold">Disponível</button>
        </div>
        <div className="mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded" onClick={() => window.history.back()}>Voltar</button>
        </div>
      </div>
    </div>
  );
};

export default CuidadoresPage; 