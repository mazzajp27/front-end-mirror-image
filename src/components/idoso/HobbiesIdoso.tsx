import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ContratanteData } from '../../services/api';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface HobbiesIdosoProps {
  data: ContratanteData;
  updateData: (data: Partial<ContratanteData>) => void;
  onPrevious: () => void;
  onSubmit: (hobbiesData?: { hobbies?: string[], atividadesFisicas?: any, atividadesSociais?: any, preferencias?: any }) => void;
  isSubmitting: boolean;
}

const HobbiesIdoso: React.FC<HobbiesIdosoProps> = ({ 
  data, 
  updateData, 
  onPrevious, 
  onSubmit,
  isSubmitting 
}) => {
  const [hobbies, setHobbies] = useState<string[]>(data.hobbies || []);
  const [atividadesFisicas, setAtividadesFisicas] = useState({
    pratica: data.atividadesFisicas?.pratica || false,
    quais: data.atividadesFisicas?.quais || ''
  });
  const [atividadesSociais, setAtividadesSociais] = useState({
    participa: data.atividadesSociais?.participa || false,
    quais: data.atividadesSociais?.quais || ''
  });
  const [preferencias, setPreferencias] = useState({
    alimentacao: data.preferencias?.alimentacao || '',
    rotinaDiaria: data.preferencias?.rotinaDiaria || '',
    observacoesAdicionais: data.preferencias?.observacoesAdicionais || ''
  });

  const hobbiesOptions = [
    { id: 'leitura', label: 'Leitura' },
    { id: 'tv', label: 'Assistir TV/Filmes' },
    { id: 'musica', label: 'Ouvir Música' },
    { id: 'artesanato', label: 'Artesanato' },
    { id: 'jardinagem', label: 'Jardinagem' },
    { id: 'culinaria', label: 'Culinária' },
    { id: 'jogos', label: 'Jogos de Tabuleiro/Cartas' },
    { id: 'palavras', label: 'Palavras Cruzadas/Sudoku' },
    { id: 'pintura', label: 'Pintura' },
    { id: 'colecionar', label: 'Colecionismo' },
    { id: 'fotografia', label: 'Fotografia' },
    { id: 'internet', label: 'Navegar na Internet' }
  ];

  const handleHobbiesChange = (hobby: string) => {
    setHobbies(prev => {
      if (prev.includes(hobby)) {
        return prev.filter(h => h !== hobby);
      }
      return [...prev, hobby];
    });
  };

  const handleAtividadesFisicasChange = (value: boolean) => {
    setAtividadesFisicas(prev => ({
      ...prev,
      pratica: value,
      quais: value ? prev.quais : ''
    }));
  };

  const handleQuaisAtividadesFisicasChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAtividadesFisicas(prev => ({
      ...prev,
        quais: e.target.value
    }));
  };

  const handleAtividadesSociaisChange = (value: boolean) => {
    setAtividadesSociais(prev => ({
      ...prev,
      participa: value,
      quais: value ? prev.quais : ''
    }));
  };

  const handleQuaisAtividadesSociaisChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAtividadesSociais(prev => ({
      ...prev,
        quais: e.target.value
    }));
  };

  const handlePreferenciasChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setPreferencias(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const validateForm = () => {
    // Validar hobbies
    if (hobbies.length === 0) {
      toast.error('Por favor, selecione pelo menos um hobby');
      return false;
    }

    // Validar atividades físicas
    if (atividadesFisicas.pratica && !atividadesFisicas.quais) {
      toast.error('Por favor, especifique quais atividades físicas pratica');
      return false;
    }

    // Validar atividades sociais
    if (atividadesSociais.participa && !atividadesSociais.quais) {
      toast.error('Por favor, especifique quais atividades sociais participa');
      return false;
    }

    // Validar preferências
    if (!preferencias.alimentacao) {
      toast.error('Por favor, informe suas preferências alimentares');
      return false;
    }
    if (!preferencias.rotinaDiaria) {
      toast.error('Por favor, descreva sua rotina diária');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const hobbiesData = {
      hobbies,
      atividadesFisicas,
      atividadesSociais,
      preferencias
    };

    console.log('DEBUG HobbiesIdoso - hobbiesData antes de updateData:', JSON.stringify(hobbiesData, null, 2));
    updateData(hobbiesData);
    // Passar os dados diretamente para onSubmit para garantir que sejam enviados
    console.log('DEBUG HobbiesIdoso - chamando onSubmit com hobbiesData');
    onSubmit(hobbiesData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <h3 className="text-lg font-bold">1. Hobbies e Interesses</h3>
        <div className="space-y-4">
          <p className="font-medium required-field">Selecione seus hobbies e interesses:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hobbiesOptions.map(hobby => (
              <label key={hobby.id} className="flex items-center space-x-2">
              <Checkbox 
                  id={hobby.id}
                  checked={hobbies.includes(hobby.id)}
                  onCheckedChange={() => handleHobbiesChange(hobby.id)}
              />
                <span>{hobby.label}</span>
              </label>
            ))}
          </div>
        </div>

        <h3 className="text-lg font-bold">2. Atividades Físicas</h3>
        <div className="space-y-4">
          <p className="font-medium required-field">Pratica atividades físicas?</p>
            <div className="space-y-1">
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                name="atividades-fisicas"
                checked={atividadesFisicas.pratica === true}
                onChange={() => handleAtividadesFisicasChange(true)}
                required
                />
                <span>Sim</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                name="atividades-fisicas"
                checked={atividadesFisicas.pratica === false}
                onChange={() => handleAtividadesFisicasChange(false)}
                />
                <span>Não</span>
              </label>
            {atividadesFisicas.pratica && (
                <div className="mt-2">
                <label htmlFor="quais-atividades-fisicas" className="block required-field">Quais atividades?</label>
                <Textarea
                  id="quais-atividades-fisicas"
                  value={atividadesFisicas.quais}
                  onChange={handleQuaisAtividadesFisicasChange}
                  placeholder="Descreva as atividades físicas que pratica"
                  className="bg-gray-100"
                  required
                  />
                </div>
              )}
            </div>
          </div>
          
        <h3 className="text-lg font-bold">3. Atividades Sociais</h3>
        <div className="space-y-4">
          <p className="font-medium required-field">Participa de atividades sociais?</p>
            <div className="space-y-1">
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                name="atividades-sociais"
                checked={atividadesSociais.participa === true}
                onChange={() => handleAtividadesSociaisChange(true)}
                required
                />
                <span>Sim</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                name="atividades-sociais"
                checked={atividadesSociais.participa === false}
                onChange={() => handleAtividadesSociaisChange(false)}
                />
                <span>Não</span>
              </label>
            {atividadesSociais.participa && (
                <div className="mt-2">
                <label htmlFor="quais-atividades-sociais" className="block required-field">Quais atividades?</label>
                <Textarea
                  id="quais-atividades-sociais"
                  value={atividadesSociais.quais}
                  onChange={handleQuaisAtividadesSociaisChange}
                  placeholder="Descreva as atividades sociais que participa"
                  className="bg-gray-100"
                  required
                  />
                </div>
              )}
            </div>
          </div>

        <h3 className="text-lg font-bold">4. Preferências e Rotina</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="alimentacao" className="block font-medium mb-1 required-field">
              Preferências alimentares:
            </label>
            <Textarea
              id="alimentacao"
              value={preferencias.alimentacao}
              onChange={handlePreferenciasChange}
              placeholder="Descreva suas preferências e restrições alimentares"
              className="bg-gray-100"
              required
            />
          </div>
          
          <div>
            <label htmlFor="rotinaDiaria" className="block font-medium mb-1 required-field">
              Rotina diária:
            </label>
            <Textarea
              id="rotinaDiaria"
              value={preferencias.rotinaDiaria}
              onChange={handlePreferenciasChange}
              placeholder="Descreva sua rotina diária habitual"
              className="bg-gray-100"
              required
            />
          </div>
          
          <div>
            <label htmlFor="observacoesAdicionais" className="block font-medium mb-1">
              Observações adicionais:
              </label>
            <Textarea
              id="observacoesAdicionais"
              value={preferencias.observacoesAdicionais}
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
          disabled={isSubmitting}
          className="bg-[#0056a4] text-white py-3 px-12 rounded-full flex items-center gap-2 hover:bg-[#004483] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Cadastrando...' : 'Finalizar Cadastro'}
        </button>
      </div>
    </form>
  );
};

export default HobbiesIdoso;
