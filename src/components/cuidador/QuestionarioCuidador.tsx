
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { CuidadorData } from '../../services/api';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

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
            <label htmlFor="formacao-cursos" className="block font-medium mb-1">
              Cursos Realizados:
            </label>
            <Textarea
              id="formacao-cursos"
              value={formacaoAcademica.cursos}
              onChange={handleFormacaoChange}
              placeholder="Liste seus cursos relevantes"
              className="bg-gray-100"
            />
          </div>
          
          <div>
            <label htmlFor="formacao-instituicao" className="block font-medium mb-1">
              Instituição de Ensino:
            </label>
            <input
              type="text"
              id="formacao-instituicao"
              value={formacaoAcademica.instituicao}
              onChange={handleFormacaoChange}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="formacao-area" className="block font-medium mb-1">
              Área de Formação:
            </label>
            <input
              type="text"
              id="formacao-area"
              value={formacaoAcademica.area}
              onChange={handleFormacaoChange}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <h3 className="text-lg font-bold mt-6">2. Experiência Profissional</h3>
        <div className="space-y-4">
          <div>
            <p className="mb-2 font-medium">Você já trabalhou como cuidador(a) de idosos?</p>
            <div>
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="trabalhou-como-cuidador" 
                  value="sim"
                />
                <span>Sim</span>
              </label>
              <label className="flex items-center space-x-2 mt-1">
                <input 
                  type="radio" 
                  name="trabalhou-como-cuidador" 
                  value="nao"
                />
                <span>Não</span>
              </label>
            </div>
          </div>
          
          <div>
            <label htmlFor="exp-tempoExperiencia" className="block font-medium mb-1">
              Se sim, há quanto tempo você trabalha como cuidador(a) de idosos?
            </label>
            <input
              type="text"
              id="exp-tempoExperiencia"
              value={experienciaProfissional.tempoExperiencia}
              onChange={handleExperienciaChange}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="exp-responsabilidades" className="block font-medium mb-1">
              Quais suas principais responsabilidades?
            </label>
            <Textarea
              id="exp-responsabilidades"
              value={experienciaProfissional.responsabilidades}
              onChange={handleExperienciaChange}
              className="bg-gray-100"
            />
          </div>
          
          <div>
            <p className="mb-2 font-medium">Já possui certificação em cuidados com idosos?</p>
            <div>
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="possui-certificacao" 
                  checked={experienciaProfissional.possuiCertificacao === true}
                  onChange={() => setExperienciaProfissional(prev => ({...prev, possuiCertificacao: true}))}
                />
                <span>Sim</span>
              </label>
              <label className="flex items-center space-x-2 mt-1">
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
            <p className="mb-2 font-medium">Quais são suas principais habilidades como cuidador(a)? (Marque todas as que se aplicam)</p>
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
            <label htmlFor="qual-horariosDisponiveis" className="block font-medium mb-1">
              Quais são seus horários disponíveis para o trabalho?
            </label>
            <input
              type="text"
              id="qual-horariosDisponiveis"
              value={qualidades.horariosDisponiveis}
              onChange={handleQualidadesChange}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <p className="mb-2 font-medium">Você possui disponibilidade para plantões noturnos ou finais de semana?</p>
            <div>
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="disponibilidade-plantoes"
                  checked={qualidades.disponibilidadePlantoes === true}
                  onChange={() => setQualidades(prev => ({...prev, disponibilidadePlantoes: true}))}
                />
                <span>Sim</span>
              </label>
              <label className="flex items-center space-x-2 mt-1">
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
            <label htmlFor="qual-qualidadesImportantes" className="block font-medium mb-1">
              Quais qualidades você considera mais importantes para ser um bom cuidador(a)?
            </label>
            <Textarea
              id="qual-qualidadesImportantes"
              value={qualidades.qualidadesImportantes}
              onChange={handleQualidadesChange}
              className="bg-gray-100"
            />
          </div>
        </div>

        <h3 className="text-lg font-bold mt-6">4. Referências:</h3>
        <div>
          <label htmlFor="referencia-nome" className="block font-medium mb-1">
            Nome e Contato de Referência Profissional:
          </label>
          <input
            type="text"
            id="referencia-nome"
            value={referencias.nomeContato}
            onChange={handleReferenciaChange}
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
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
