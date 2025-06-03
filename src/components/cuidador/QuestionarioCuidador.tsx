import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { CuidadorData } from '../../services/api';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface QuestionarioCuidadorProps {
  data: CuidadorData;
  updateData: (data: Partial<CuidadorData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const QuestionarioCuidador: React.FC<QuestionarioCuidadorProps> = ({ 
  data, 
  updateData, 
  onNext, 
  onPrevious 
}) => {
  const [formacaoAcademica, setFormacaoAcademica] = useState({
    cursos: data.formacaoAcademica?.cursos || '',
    instituicao: data.formacaoAcademica?.instituicao || '',
    area: data.formacaoAcademica?.area || ''
  });

  const [experienciaProfissional, setExperienciaProfissional] = useState({
    tempoExperiencia: data.experienciaProfissional?.tempoExperiencia || '',
    responsabilidades: data.experienciaProfissional?.responsabilidades || '',
    possuiCertificacao: data.experienciaProfissional?.possuiCertificacao || false,
    certificacoes: data.experienciaProfissional?.certificacoes || ''
  });

  const [qualidades, setQualidades] = useState({
    habilidades: data.qualidades?.habilidades || [],
    horariosDisponiveis: data.qualidades?.horariosDisponiveis || '',
    disponibilidadePlantoes: data.qualidades?.disponibilidadePlantoes || false,
    qualidadesImportantes: data.qualidades?.qualidadesImportantes || ''
  });

  const [referencias, setReferencias] = useState({
    nomeContato: data.referencias?.nomeContato || ''
  });

  const handleFormacaoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormacaoAcademica(prev => ({ ...prev, [id.replace('formacao-', '')]: value }));
  };

  const handleExperienciaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setExperienciaProfissional(prev => ({ ...prev, [id.replace('exp-', '')]: value }));
  };

  const handleQualidadesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setQualidades(prev => ({ ...prev, [id.replace('qual-', '')]: value }));
  };

  const handleHabilidadesChange = (value: string, checked: boolean) => {
    setQualidades(prev => {
      const habilidades = [...prev.habilidades || []];
      if (checked) {
        return { ...prev, habilidades: [...habilidades, value] };
      } else {
        return { ...prev, habilidades: habilidades.filter(h => h !== value) };
      }
    });
  };

  const handleReferenciaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setReferencias(prev => ({ ...prev, nomeContato: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar formação acadêmica
    if (!formacaoAcademica.cursos || !formacaoAcademica.instituicao || !formacaoAcademica.area) {
      toast.error("Por favor, preencha todos os campos da formação acadêmica!");
      return;
    }

    // Validar experiência profissional
    if (!experienciaProfissional.tempoExperiencia || !experienciaProfissional.responsabilidades) {
      toast.error("Por favor, preencha todos os campos da experiência profissional!");
      return;
    }
    if (experienciaProfissional.possuiCertificacao && !experienciaProfissional.certificacoes) {
      toast.error("Por favor, especifique suas certificações!");
      return;
    }

    // Validar qualidades
    if (qualidades.habilidades.length === 0) {
      toast.error("Por favor, selecione pelo menos uma habilidade!");
      return;
    }
    if (!qualidades.horariosDisponiveis) {
      toast.error("Por favor, informe seus horários disponíveis!");
      return;
    }
    if (!qualidades.qualidadesImportantes) {
      toast.error("Por favor, descreva suas qualidades importantes!");
      return;
    }

    // Validar referências
    if (!referencias.nomeContato) {
      toast.error("Por favor, forneça pelo menos uma referência de contato!");
      return;
    }

    // Se todas as validações passarem, atualiza os dados e avança
    updateData({
      formacaoAcademica,
      experienciaProfissional,
      qualidades,
      referencias
    });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <h3 className="text-lg font-bold">1. Formação Acadêmica</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="formacao-cursos" className="block font-medium mb-1 required-field">
              Cursos Realizados:
            </label>
            <Textarea
              id="formacao-cursos"
              value={formacaoAcademica.cursos}
              onChange={handleFormacaoChange}
              placeholder="Liste seus cursos relevantes"
              className="bg-gray-100"
              required
            />
          </div>
          
          <div>
            <label htmlFor="formacao-instituicao" className="block font-medium mb-1 required-field">
              Instituição de Ensino:
            </label>
            <input
              type="text"
              id="formacao-instituicao"
              value={formacaoAcademica.instituicao}
              onChange={handleFormacaoChange}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label htmlFor="formacao-area" className="block font-medium mb-1 required-field">
              Área de Formação:
            </label>
            <input
              type="text"
              id="formacao-area"
              value={formacaoAcademica.area}
              onChange={handleFormacaoChange}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <h3 className="text-lg font-bold mt-6">2. Experiência Profissional</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="exp-tempoExperiencia" className="block font-medium mb-1 required-field">
              Tempo de Experiência como Cuidador(a):
            </label>
            <input
              type="text"
              id="exp-tempoExperiencia"
              value={experienciaProfissional.tempoExperiencia}
              onChange={handleExperienciaChange}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label htmlFor="exp-responsabilidades" className="block font-medium mb-1 required-field">
              Principais Responsabilidades:
            </label>
            <Textarea
              id="exp-responsabilidades"
              value={experienciaProfissional.responsabilidades}
              onChange={handleExperienciaChange}
              className="bg-gray-100"
              required
            />
          </div>
          
          <div>
            <p className="mb-2 font-medium required-field">Possui Certificações na Área?</p>
            <div className="space-y-1">
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="possui-certificacao"
                  checked={experienciaProfissional.possuiCertificacao === true}
                  onChange={() => setExperienciaProfissional(prev => ({...prev, possuiCertificacao: true}))}
                  required
                />
                <span>Sim</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="possui-certificacao"
                  checked={experienciaProfissional.possuiCertificacao === false}
                  onChange={() => setExperienciaProfissional(prev => ({...prev, possuiCertificacao: false}))}
                />
                <span>Não</span>
              </label>
            </div>
          </div>
          
          <div>
            <label htmlFor="exp-certificacoes" className="block font-medium mb-1">
              Se sim, quais?
            </label>
            <input
              type="text"
              id="exp-certificacoes"
              value={experienciaProfissional.certificacoes}
              onChange={handleExperienciaChange}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <h3 className="text-lg font-bold mt-6">3. Qualidades e Preferências:</h3>
        <div className="space-y-4">
          <div>
            <p className="mb-2 font-medium required-field">Quais são suas principais habilidades como cuidador(a)? (Selecione pelo menos uma)</p>
            <div className="space-y-2">
              <div className="flex items-top space-x-2">
                <Checkbox 
                  id="habilidade-auxilio" 
                  checked={qualidades.habilidades?.includes('Auxílio nas atividades diárias')}
                  onCheckedChange={(checked) => handleHabilidadesChange('Auxílio nas atividades diárias', checked === true)}
                />
                <label htmlFor="habilidade-auxilio" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Auxílio nas atividades diárias (banho, alimentação, etc.)
                </label>
              </div>
              
              <div className="flex items-top space-x-2">
                <Checkbox 
                  id="habilidade-medicamentos" 
                  checked={qualidades.habilidades?.includes('Administração de medicamentos')}
                  onCheckedChange={(checked) => handleHabilidadesChange('Administração de medicamentos', checked === true)}
                />
                <label htmlFor="habilidade-medicamentos" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Administração de medicamentos
                </label>
              </div>
              
              <div className="flex items-top space-x-2">
                <Checkbox 
                  id="habilidade-higiene" 
                  checked={qualidades.habilidades?.includes('Cuidados com a higiene pessoal')}
                  onCheckedChange={(checked) => handleHabilidadesChange('Cuidados com a higiene pessoal', checked === true)}
                />
                <label htmlFor="habilidade-higiene" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Cuidados com a higiene pessoal
                </label>
              </div>
              
              <div className="flex items-top space-x-2">
                <Checkbox 
                  id="habilidade-exercicios" 
                  checked={qualidades.habilidades?.includes('Exercícios de mobilidade')}
                  onCheckedChange={(checked) => handleHabilidadesChange('Exercícios de mobilidade', checked === true)}
                />
                <label htmlFor="habilidade-exercicios" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Exercícios de mobilidade
                </label>
              </div>
              
              <div className="flex items-top space-x-2">
                <Checkbox 
                  id="habilidade-outras" 
                  checked={qualidades.habilidades?.includes('Outras habilidades')}
                  onCheckedChange={(checked) => handleHabilidadesChange('Outras habilidades', checked === true)}
                />
                <label htmlFor="habilidade-outras" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Outras habilidades: 
                  <input
                    type="text"
                    className="ml-2 px-2 py-1 border border-gray-300 rounded"
                  />
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="qual-horariosDisponiveis" className="block font-medium mb-1 required-field">
              Quais são seus horários disponíveis para trabalho?
            </label>
            <Textarea
              id="qual-horariosDisponiveis"
              value={qualidades.horariosDisponiveis}
              onChange={handleQualidadesChange}
              className="bg-gray-100"
              required
            />
          </div>
          
          <div>
            <p className="mb-2 font-medium required-field">Disponibilidade para Plantões?</p>
            <div className="space-y-1">
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="disponibilidade-plantoes"
                  checked={qualidades.disponibilidadePlantoes === true}
                  onChange={() => setQualidades(prev => ({...prev, disponibilidadePlantoes: true}))}
                  required
                />
                <span>Sim</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="disponibilidade-plantoes"
                  checked={qualidades.disponibilidadePlantoes === false}
                  onChange={() => setQualidades(prev => ({...prev, disponibilidadePlantoes: false}))}
                />
                <span>Não</span>
              </label>
            </div>
          </div>
          
          <div>
            <label htmlFor="qual-qualidadesImportantes" className="block font-medium mb-1 required-field">
              Descreva suas qualidades mais importantes como cuidador(a):
            </label>
            <Textarea
              id="qual-qualidadesImportantes"
              value={qualidades.qualidadesImportantes}
              onChange={handleQualidadesChange}
              className="bg-gray-100"
              required
            />
          </div>
        </div>

        <h3 className="text-lg font-bold mt-6">4. Referências:</h3>
        <div>
          <label htmlFor="referencia-nome" className="block font-medium mb-1 required-field">
            Nome e Contato de Referência Profissional:
          </label>
          <input
            type="text"
            id="referencia-nome"
            value={referencias.nomeContato}
            onChange={handleReferenciaChange}
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
            required
          />
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

export default QuestionarioCuidador;
