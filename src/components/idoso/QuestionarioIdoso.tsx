import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ContratanteData } from '../../services/api';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface QuestionarioIdosoProps {
  data: ContratanteData;
  updateData: (data: Partial<ContratanteData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const QuestionarioIdoso: React.FC<QuestionarioIdosoProps> = ({ 
  data, 
  updateData, 
  onNext, 
  onPrevious 
}) => {
  const [questionario, setQuestionario] = useState({
    saudeGeral: {
      condicoesMedicas: data.questionario?.saudeGeral?.condicoesMedicas || '',
      medicamentosUso: data.questionario?.saudeGeral?.medicamentosUso || '',
      alergias: data.questionario?.saudeGeral?.alergias || '',
      restricoesAlimentares: data.questionario?.saudeGeral?.restricoesAlimentares || '',
      mobilidadeRestricoes: data.questionario?.saudeGeral?.mobilidadeRestricoes || ''
    },
    necessidadesCuidado: {
      auxilioAtividadesDiarias: {
        precisa: data.questionario?.necessidadesCuidado?.auxilioAtividadesDiarias?.precisa || false,
        quais: data.questionario?.necessidadesCuidado?.auxilioAtividadesDiarias?.quais || ''
      },
      auxilioMedicacao: {
        precisa: data.questionario?.necessidadesCuidado?.auxilioMedicacao?.precisa || false,
        frequencia: data.questionario?.necessidadesCuidado?.auxilioMedicacao?.frequencia || ''
      },
      monitoramentoSinais: {
        necessario: data.questionario?.necessidadesCuidado?.monitoramentoSinais?.necessario || false,
        quais: data.questionario?.necessidadesCuidado?.monitoramentoSinais?.quais || ''
      }
    },
    preferenciasCuidado: {
      horarioPreferencial: data.questionario?.preferenciasCuidado?.horarioPreferencial || '',
      frequenciaCuidado: data.questionario?.preferenciasCuidado?.frequenciaCuidado || '',
      caracteristicasCuidador: data.questionario?.preferenciasCuidado?.caracteristicasCuidador || '',
      observacoesAdicionais: data.questionario?.preferenciasCuidado?.observacoesAdicionais || ''
    }
  });

  const handleSaudeGeralChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setQuestionario(prev => ({
      ...prev,
      saudeGeral: {
        ...prev.saudeGeral,
        [id.replace('saude-', '')]: value
      }
    }));
  };

  const handleAuxilioAtividadesChange = (value: boolean) => {
    setQuestionario(prev => ({
      ...prev,
      necessidadesCuidado: {
        ...prev.necessidadesCuidado,
        auxilioAtividadesDiarias: {
          ...prev.necessidadesCuidado.auxilioAtividadesDiarias,
          precisa: value
        }
      }
    }));
  };

  const handleQuaisAtividadesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionario(prev => ({
      ...prev,
      necessidadesCuidado: {
        ...prev.necessidadesCuidado,
        auxilioAtividadesDiarias: {
          ...prev.necessidadesCuidado.auxilioAtividadesDiarias,
          quais: e.target.value
        }
      }
    }));
  };

  const handleAuxilioMedicacaoChange = (value: boolean) => {
    setQuestionario(prev => ({
      ...prev,
      necessidadesCuidado: {
        ...prev.necessidadesCuidado,
        auxilioMedicacao: {
          ...prev.necessidadesCuidado.auxilioMedicacao,
          precisa: value
        }
      }
    }));
  };

  const handleFrequenciaMedicacaoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionario(prev => ({
      ...prev,
      necessidadesCuidado: {
        ...prev.necessidadesCuidado,
        auxilioMedicacao: {
          ...prev.necessidadesCuidado.auxilioMedicacao,
          frequencia: e.target.value
        }
      }
    }));
  };

  const handleMonitoramentoSinaisChange = (value: boolean) => {
    setQuestionario(prev => ({
      ...prev,
      necessidadesCuidado: {
        ...prev.necessidadesCuidado,
        monitoramentoSinais: {
          ...prev.necessidadesCuidado.monitoramentoSinais,
          necessario: value
        }
      }
    }));
  };

  const handleQuaisSinaisChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionario(prev => ({
      ...prev,
      necessidadesCuidado: {
        ...prev.necessidadesCuidado,
        monitoramentoSinais: {
          ...prev.necessidadesCuidado.monitoramentoSinais,
          quais: e.target.value
        }
      }
    }));
  };

  const handlePreferenciasChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setQuestionario(prev => ({
      ...prev,
      preferenciasCuidado: {
        ...prev.preferenciasCuidado,
        [id.replace('pref-', '')]: value
      }
    }));
  };

  const validateForm = () => {
    // Validar saúde geral
    if (!questionario.saudeGeral.condicoesMedicas) {
      toast.error('Por favor, informe as condições médicas (ou "Nenhuma" se não houver)');
      return false;
    }
    if (!questionario.saudeGeral.medicamentosUso) {
      toast.error('Por favor, informe os medicamentos em uso (ou "Nenhum" se não houver)');
      return false;
    }
    if (!questionario.saudeGeral.alergias) {
      toast.error('Por favor, informe as alergias (ou "Nenhuma" se não houver)');
      return false;
    }
    if (!questionario.saudeGeral.restricoesAlimentares) {
      toast.error('Por favor, informe as restrições alimentares (ou "Nenhuma" se não houver)');
      return false;
    }
    if (!questionario.saudeGeral.mobilidadeRestricoes) {
      toast.error('Por favor, informe as restrições de mobilidade (ou "Nenhuma" se não houver)');
      return false;
    }

    // Validar necessidades de cuidado
    if (questionario.necessidadesCuidado.auxilioAtividadesDiarias.precisa && 
        !questionario.necessidadesCuidado.auxilioAtividadesDiarias.quais) {
      toast.error('Por favor, especifique quais atividades diárias precisam de auxílio');
      return false;
    }
    if (questionario.necessidadesCuidado.auxilioMedicacao.precisa && 
        !questionario.necessidadesCuidado.auxilioMedicacao.frequencia) {
      toast.error('Por favor, especifique a frequência do auxílio com medicação');
      return false;
    }
    if (questionario.necessidadesCuidado.monitoramentoSinais.necessario && 
        !questionario.necessidadesCuidado.monitoramentoSinais.quais) {
      toast.error('Por favor, especifique quais sinais vitais precisam ser monitorados');
      return false;
    }

    // Validar preferências de cuidado
    if (!questionario.preferenciasCuidado.horarioPreferencial) {
      toast.error('Por favor, informe o horário preferencial para o cuidado');
      return false;
    }
    if (!questionario.preferenciasCuidado.frequenciaCuidado) {
      toast.error('Por favor, informe a frequência desejada para o cuidado');
      return false;
    }
    if (!questionario.preferenciasCuidado.caracteristicasCuidador) {
      toast.error('Por favor, informe as características desejadas do cuidador');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    updateData({ questionario });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <h3 className="text-lg font-bold">1. Saúde Geral</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="saude-condicoesMedicas" className="block font-medium mb-1 required-field">
              Condições médicas ou diagnósticos:
            </label>
            <Textarea
              id="saude-condicoesMedicas"
              value={questionario.saudeGeral.condicoesMedicas}
              onChange={handleSaudeGeralChange}
              placeholder="Liste todas as condições médicas relevantes"
              className="bg-gray-100"
              required
            />
          </div>

          <div>
            <label htmlFor="saude-medicamentosUso" className="block font-medium mb-1 required-field">
              Medicamentos em uso:
            </label>
            <Textarea
              id="saude-medicamentosUso"
              value={questionario.saudeGeral.medicamentosUso}
              onChange={handleSaudeGeralChange}
              placeholder="Liste todos os medicamentos e suas dosagens"
              className="bg-gray-100"
              required
            />
          </div>

          <div>
            <label htmlFor="saude-alergias" className="block font-medium mb-1 required-field">
              Alergias:
            </label>
            <Textarea
              id="saude-alergias"
              value={questionario.saudeGeral.alergias}
              onChange={handleSaudeGeralChange}
              placeholder="Liste todas as alergias conhecidas"
              className="bg-gray-100"
              required
            />
          </div>
          
          <div>
            <label htmlFor="saude-restricoesAlimentares" className="block font-medium mb-1 required-field">
              Restrições alimentares:
            </label>
            <Textarea
              id="saude-restricoesAlimentares"
              value={questionario.saudeGeral.restricoesAlimentares}
              onChange={handleSaudeGeralChange}
              placeholder="Liste todas as restrições alimentares"
              className="bg-gray-100"
              required
            />
          </div>
          
          <div>
            <label htmlFor="saude-mobilidadeRestricoes" className="block font-medium mb-1 required-field">
              Restrições de mobilidade:
            </label>
            <Textarea
              id="saude-mobilidadeRestricoes"
              value={questionario.saudeGeral.mobilidadeRestricoes}
              onChange={handleSaudeGeralChange}
              placeholder="Descreva quaisquer limitações de mobilidade"
              className="bg-gray-100"
              required
            />
          </div>
        </div>

        <h3 className="text-lg font-bold">2. Necessidades de Cuidado</h3>
        <div className="space-y-4">
            <div>
            <p className="mb-2 font-medium required-field">O idoso precisa de auxílio com atividades diárias?</p>
            <div className="space-y-1">
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="auxilio-atividades"
                  checked={questionario.necessidadesCuidado.auxilioAtividadesDiarias.precisa === true}
                  onChange={() => handleAuxilioAtividadesChange(true)}
                  required
                />
                <span>Sim</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="auxilio-atividades"
                  checked={questionario.necessidadesCuidado.auxilioAtividadesDiarias.precisa === false}
                  onChange={() => handleAuxilioAtividadesChange(false)}
                />
                <span>Não</span>
              </label>
              {questionario.necessidadesCuidado.auxilioAtividadesDiarias.precisa && (
                <div className="mt-2">
                  <label htmlFor="quais-atividades" className="block required-field">Quais atividades?</label>
                  <Textarea
                    id="quais-atividades"
                    value={questionario.necessidadesCuidado.auxilioAtividadesDiarias.quais}
                    onChange={handleQuaisAtividadesChange}
                    placeholder="Descreva as atividades que necessitam de auxílio"
                    className="bg-gray-100"
                    required
                  />
                </div>
              )}
            </div>
          </div>
          
          <div>
            <p className="mb-2 font-medium required-field">O idoso precisa de auxílio com medicação?</p>
            <div className="space-y-1">
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="auxilio-medicacao"
                  checked={questionario.necessidadesCuidado.auxilioMedicacao.precisa === true}
                  onChange={() => handleAuxilioMedicacaoChange(true)}
                  required
                />
                <span>Sim</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="auxilio-medicacao"
                  checked={questionario.necessidadesCuidado.auxilioMedicacao.precisa === false}
                  onChange={() => handleAuxilioMedicacaoChange(false)}
                />
                <span>Não</span>
              </label>
              {questionario.necessidadesCuidado.auxilioMedicacao.precisa && (
                <div className="mt-2">
                  <label htmlFor="frequencia-medicacao" className="block required-field">Qual a frequência?</label>
                  <Textarea
                    id="frequencia-medicacao"
                    value={questionario.necessidadesCuidado.auxilioMedicacao.frequencia}
                    onChange={handleFrequenciaMedicacaoChange}
                    placeholder="Descreva a frequência e horários da medicação"
                    className="bg-gray-100"
                    required
                  />
                </div>
              )}
            </div>
          </div>
          
          <div>
            <p className="mb-2 font-medium required-field">O idoso necessita de monitoramento de sinais vitais?</p>
            <div className="space-y-1">
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="monitoramento-sinais"
                  checked={questionario.necessidadesCuidado.monitoramentoSinais.necessario === true}
                  onChange={() => handleMonitoramentoSinaisChange(true)}
                  required
                />
                <span>Sim</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="monitoramento-sinais"
                  checked={questionario.necessidadesCuidado.monitoramentoSinais.necessario === false}
                  onChange={() => handleMonitoramentoSinaisChange(false)}
                />
                <span>Não</span>
              </label>
              {questionario.necessidadesCuidado.monitoramentoSinais.necessario && (
                <div className="mt-2">
                  <label htmlFor="quais-sinais" className="block required-field">Quais sinais vitais?</label>
                  <Textarea
                    id="quais-sinais"
                    value={questionario.necessidadesCuidado.monitoramentoSinais.quais}
                    onChange={handleQuaisSinaisChange}
                    placeholder="Descreva quais sinais vitais precisam ser monitorados"
                    className="bg-gray-100"
                    required
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <h3 className="text-lg font-bold">3. Preferências de Cuidado</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="pref-horarioPreferencial" className="block font-medium mb-1 required-field">
              Horário preferencial para o cuidado:
            </label>
            <Textarea
              id="pref-horarioPreferencial"
              value={questionario.preferenciasCuidado.horarioPreferencial}
              onChange={handlePreferenciasChange}
              placeholder="Informe os horários preferenciais para receber o cuidado"
              className="bg-gray-100"
              required
            />
          </div>
          
          <div>
            <label htmlFor="pref-frequenciaCuidado" className="block font-medium mb-1 required-field">
              Frequência do cuidado:
            </label>
            <Textarea
              id="pref-frequenciaCuidado"
              value={questionario.preferenciasCuidado.frequenciaCuidado}
              onChange={handlePreferenciasChange}
              placeholder="Informe quantas vezes por semana/mês necessita do cuidado"
              className="bg-gray-100"
              required
            />
          </div>
          
          <div>
            <label htmlFor="pref-caracteristicasCuidador" className="block font-medium mb-1 required-field">
              Características desejadas do cuidador:
            </label>
            <Textarea
              id="pref-caracteristicasCuidador"
              value={questionario.preferenciasCuidado.caracteristicasCuidador}
              onChange={handlePreferenciasChange}
              placeholder="Descreva as características que você procura em um cuidador"
              className="bg-gray-100"
              required
            />
          </div>
          
          <div>
            <label htmlFor="pref-observacoesAdicionais" className="block font-medium mb-1">
              Observações adicionais:
            </label>
            <Textarea
              id="pref-observacoesAdicionais"
              value={questionario.preferenciasCuidado.observacoesAdicionais}
              onChange={handlePreferenciasChange}
              placeholder="Outras informações relevantes que deseja compartilhar"
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
          Próximo
          <ArrowRight size={18} />
        </button>
      </div>
    </form>
  );
};

export default QuestionarioIdoso;
