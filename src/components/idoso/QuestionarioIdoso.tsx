
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { IdosoData } from '../../services/api';
import { Textarea } from '@/components/ui/textarea';

interface QuestionarioIdosoProps {
  data: IdosoData;
  updateData: (data: Partial<IdosoData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const QuestionarioIdoso: React.FC<QuestionarioIdosoProps> = ({ 
  data, 
  updateData, 
  onNext, 
  onPrevious 
}) => {
  const [historicoMedico, setHistoricoMedico] = useState({
    condicaoMedica: data.historicoMedico?.condicaoMedica || '',
    qualCondicao: data.historicoMedico?.qualCondicao || '',
    tomaMedicamento: data.historicoMedico?.tomaMedicamento || false,
    quaisMedicamentos: data.historicoMedico?.quaisMedicamentos || '',
  });

  const [atividadesDiarias, setAtividadesDiarias] = useState({
    realizaSozinho: data.atividadesDiarias?.realizaSozinho || true,
    quaisAtividadesPrecisaAjuda: data.atividadesDiarias?.quaisAtividadesPrecisaAjuda || '',
  });

  const [familiaApoio, setFamiliaApoio] = useState({
    visitasFrequentes: data.familiaApoio?.visitasFrequentes || false,
    frequenciaVisitas: data.familiaApoio?.frequenciaVisitas || '',
  });

  const [qualidadesPreferencias, setQualidadesPreferencias] = useState({
    principaisQualidades: data.qualidadesPreferencias?.principaisQualidades || '',
    expectativasCuidador: data.qualidadesPreferencias?.expectativasCuidador || '',
  });

  const [deficienciasNecessidades, setDeficienciasNecessidades] = useState({
    possuiDeficiencia: data.deficienciasNecessidades?.possuiDeficiencia || false,
    qualDeficiencia: data.deficienciasNecessidades?.qualDeficiencia || '',
    informacoesAdicionais: data.deficienciasNecessidades?.informacoesAdicionais || '',
  });

  const handleHistoricoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setHistoricoMedico(prev => ({ ...prev, [id.replace('historico-', '')]: value }));
  };

  const handleAtividadesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setAtividadesDiarias(prev => ({ ...prev, [id.replace('atividades-', '')]: value }));
  };

  const handleFamiliaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFamiliaApoio(prev => ({ ...prev, [id.replace('familia-', '')]: value }));
  };

  const handleQualidadesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setQualidadesPreferencias(prev => ({ ...prev, [id.replace('qualidades-', '')]: value }));
  };

  const handleDeficienciasChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setDeficienciasNecessidades(prev => ({ ...prev, [id.replace('deficiencias-', '')]: value }));
  };

  const handleCondicaoMedicaChange = (value: boolean) => {
    setHistoricoMedico(prev => ({...prev, condicaoMedica: value ? "sim" : "não"}));
  };

  const handleTomaMedicamentoChange = (value: boolean) => {
    setHistoricoMedico(prev => ({...prev, tomaMedicamento: value}));
  };

  const handleRealizaSozinhoChange = (value: boolean) => {
    setAtividadesDiarias(prev => ({...prev, realizaSozinho: value}));
  };

  const handleVisitasFrequentesChange = (value: boolean) => {
    setFamiliaApoio(prev => ({...prev, visitasFrequentes: value}));
  };

  const handlePossuiDeficienciaChange = (value: boolean) => {
    setDeficienciasNecessidades(prev => ({...prev, possuiDeficiencia: value}));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateData({
      historicoMedico,
      atividadesDiarias,
      familiaApoio,
      qualidadesPreferencias,
      deficienciasNecessidades
    });
    
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <h3 className="text-lg font-bold">1. Histórico Médico:</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="historico-condicaoMedica" className="block font-medium mb-1">
              Você possui alguma condição médica que exija cuidados especiais?
            </label>
            <input
              type="text"
              id="historico-condicaoMedica"
              value={historicoMedico.condicaoMedica}
              onChange={handleHistoricoChange}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="historico-qualCondicao" className="block font-medium mb-1">
              Se sim, qual(is)?
            </label>
            <input
              type="text"
              id="historico-qualCondicao"
              value={historicoMedico.qualCondicao}
              onChange={handleHistoricoChange}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <p className="mb-2 font-medium">Está tomando algum medicamento regularmente?</p>
            <div>
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="toma-medicamento"
                  checked={historicoMedico.tomaMedicamento === true}
                  onChange={() => handleTomaMedicamentoChange(true)}
                />
                <span>Sim</span>
              </label>
              <label className="flex items-center space-x-2 mt-1">
                <input 
                  type="radio" 
                  name="toma-medicamento"
                  checked={historicoMedico.tomaMedicamento === false}
                  onChange={() => handleTomaMedicamentoChange(false)}
                />
                <span>Não</span>
              </label>
            </div>
          </div>
          
          <div>
            <label htmlFor="historico-quaisMedicamentos" className="block font-medium mb-1">
              Se sim, quais medicamentos e horários?
            </label>
            <input
              type="text"
              id="historico-quaisMedicamentos"
              value={historicoMedico.quaisMedicamentos}
              onChange={handleHistoricoChange}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <h3 className="text-lg font-bold mt-6">2. Atividades Diárias:</h3>
        <div className="space-y-4">
          <div>
            <p className="mb-2 font-medium">Você consegue realizar as atividades diárias sozinho(a)?</p>
            <div>
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="realiza-sozinho"
                  checked={atividadesDiarias.realizaSozinho === true}
                  onChange={() => handleRealizaSozinhoChange(true)}
                />
                <span>Sim</span>
              </label>
              <label className="flex items-center space-x-2 mt-1">
                <input 
                  type="radio" 
                  name="realiza-sozinho"
                  checked={atividadesDiarias.realizaSozinho === false}
                  onChange={() => handleRealizaSozinhoChange(false)}
                />
                <span>Não</span>
              </label>
            </div>
          </div>
          
          <div>
            <label htmlFor="atividades-quaisAtividadesPrecisaAjuda" className="block font-medium mb-1">
              Se não, em quais atividades você precisa de ajuda?
            </label>
            <input
              type="text"
              id="atividades-quaisAtividadesPrecisaAjuda"
              value={atividadesDiarias.quaisAtividadesPrecisaAjuda}
              onChange={handleAtividadesChange}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <h3 className="text-lg font-bold mt-6">3. Família e Apoio Social:</h3>
        <div className="space-y-4">
          <div>
            <p className="mb-2 font-medium">Você tem familiares ou amigos que costumam visitar com frequência?</p>
            <div>
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="visitas-frequentes"
                  checked={familiaApoio.visitasFrequentes === true}
                  onChange={() => handleVisitasFrequentesChange(true)}
                />
                <span>Sim</span>
              </label>
              <label className="flex items-center space-x-2 mt-1">
                <input 
                  type="radio" 
                  name="visitas-frequentes"
                  checked={familiaApoio.visitasFrequentes === false}
                  onChange={() => handleVisitasFrequentesChange(false)}
                />
                <span>Não</span>
              </label>
            </div>
          </div>
          
          <div>
            <label htmlFor="familia-frequenciaVisitas" className="block font-medium mb-1">
              Quantas vezes por semana você costuma receber visitas?
            </label>
            <input
              type="text"
              id="familia-frequenciaVisitas"
              value={familiaApoio.frequenciaVisitas}
              onChange={handleFamiliaChange}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <h3 className="text-lg font-bold mt-6">4. Qualidades e Preferências:</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="qualidades-principaisQualidades" className="block font-medium mb-1">
              Como você descreveria suas principais qualidades?
            </label>
            <Textarea
              id="qualidades-principaisQualidades"
              value={qualidadesPreferencias.principaisQualidades}
              onChange={handleQualidadesChange}
              className="bg-gray-100"
            />
          </div>
          
          <div>
            <label htmlFor="qualidades-expectativasCuidador" className="block font-medium mb-1">
              O que você espera de um cuidador(a)?
            </label>
            <Textarea
              id="qualidades-expectativasCuidador"
              value={qualidadesPreferencias.expectativasCuidador}
              onChange={handleQualidadesChange}
              className="bg-gray-100"
            />
          </div>
        </div>

        <h3 className="text-lg font-bold mt-6">5. Deficiências ou Necessidades Especiais:</h3>
        <div className="space-y-4">
          <div>
            <p className="mb-2 font-medium">Você possui alguma deficiência física ou intelectual?</p>
            <div>
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="possui-deficiencia"
                  checked={deficienciasNecessidades.possuiDeficiencia === true}
                  onChange={() => handlePossuiDeficienciaChange(true)}
                />
                <span>Sim</span>
              </label>
              <label className="flex items-center space-x-2 mt-1">
                <input 
                  type="radio" 
                  name="possui-deficiencia"
                  checked={deficienciasNecessidades.possuiDeficiencia === false}
                  onChange={() => handlePossuiDeficienciaChange(false)}
                />
                <span>Não</span>
              </label>
            </div>
          </div>
          
          <div>
            <label htmlFor="deficiencias-qualDeficiencia" className="block font-medium mb-1">
              Se sim, qual?
            </label>
            <input
              type="text"
              id="deficiencias-qualDeficiencia"
              value={deficienciasNecessidades.qualDeficiencia}
              onChange={handleDeficienciasChange}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="deficiencias-informacoesAdicionais" className="block font-medium mb-1">
              Há algo que o(a) cuidador(a) precisa saber para cuidar melhor de você?
            </label>
            <Textarea
              id="deficiencias-informacoesAdicionais"
              value={deficienciasNecessidades.informacoesAdicionais}
              onChange={handleDeficienciasChange}
              className="bg-gray-100"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-10">
        <button 
          type="button"
          onClick={onPrevious}
          className="bg-[#0056a4] text-white py-3 px-12 rounded-full flex items-center gap-2 hover:bg-[#004483] transition-colors"
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        <button 
          type="submit" 
          className="bg-[#0056a4] text-white py-3 px-12 rounded-full flex items-center gap-2 hover:bg-[#004483] transition-colors"
        >
          Avançar
          <ArrowRight size={18} />
        </button>
      </div>
    </form>
  );
};

export default QuestionarioIdoso;
