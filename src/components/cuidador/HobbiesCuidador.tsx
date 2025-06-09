
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { CuidadorData } from '../../services/api';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface HobbiesCuidadorProps {
  data: CuidadorData;
  updateData: (data: Partial<CuidadorData>) => void;
  onPrevious: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const HobbiesCuidador: React.FC<HobbiesCuidadorProps> = ({ 
  data, 
  updateData, 
  onPrevious, 
  onSubmit,
  isSubmitting 
}) => {
  const [interesses, setInteresses] = useState({
    atividadesTempo: data.interesses?.atividadesTempo || [],
    atividadesManuais: {
      gosta: data.interesses?.atividadesManuais?.gosta || false,
      quais: data.interesses?.atividadesManuais?.quais || '',
    },
    prefCulturais: {
      generosMusicais: data.interesses?.prefCulturais?.generosMusicais || '',
      filmesTV: data.interesses?.prefCulturais?.filmesTV || '',
      atividadesSociais: {
        participa: data.interesses?.prefCulturais?.atividadesSociais?.participa || false,
        quais: data.interesses?.prefCulturais?.atividadesSociais?.quais || '',
      },
    },
    habilidadesPreferencias: {
      gostaEnsinar: {
        gosta: data.interesses?.habilidadesPreferencias?.gostaEnsinar?.gosta || false,
        oquePoderia: data.interesses?.habilidadesPreferencias?.gostaEnsinar?.oquePoderia || '',
      },
      interesseTecnologia: {
        interessado: data.interesses?.habilidadesPreferencias?.interesseTecnologia?.interessado || false,
        quais: data.interesses?.habilidadesPreferencias?.interesseTecnologia?.quais || '',
      },
    },
    comentarios: data.interesses?.comentarios || '',
  });

  const handleAtividadeTempo = (atividade: string, checked: boolean) => {
    setInteresses(prev => {
      const atividades = [...prev.atividadesTempo || []];
      if (checked) {
        return { ...prev, atividadesTempo: [...atividades, atividade] };
      } else {
        return { ...prev, atividadesTempo: atividades.filter(a => a !== atividade) };
      }
    });
  };

  const handleAtividadesManuais = (value: boolean) => {
    setInteresses(prev => ({
      ...prev,
      atividadesManuais: {
        ...prev.atividadesManuais,
        gosta: value
      }
    }));
  };

  const handleQuaisAtividadesManuais = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInteresses(prev => ({
      ...prev,
      atividadesManuais: {
        ...prev.atividadesManuais,
        quais: e.target.value
      }
    }));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    if (id === "generosMusicais") {
      setInteresses(prev => ({
        ...prev,
        prefCulturais: {
          ...prev.prefCulturais,
          generosMusicais: value
        }
      }));
    } else if (id === "filmesTV") {
      setInteresses(prev => ({
        ...prev,
        prefCulturais: {
          ...prev.prefCulturais,
          filmesTV: value
        }
      }));
    } else if (id === "atividadesSociaisQuais") {
      setInteresses(prev => ({
        ...prev,
        prefCulturais: {
          ...prev.prefCulturais,
          atividadesSociais: {
            ...prev.prefCulturais.atividadesSociais,
            quais: value
          }
        }
      }));
    } else if (id === "ensinoQuais") {
      setInteresses(prev => ({
        ...prev,
        habilidadesPreferencias: {
          ...prev.habilidadesPreferencias,
          gostaEnsinar: {
            ...prev.habilidadesPreferencias.gostaEnsinar,
            oquePoderia: value
          }
        }
      }));
    } else if (id === "tecnologiaQuais") {
      setInteresses(prev => ({
        ...prev,
        habilidadesPreferencias: {
          ...prev.habilidadesPreferencias,
          interesseTecnologia: {
            ...prev.habilidadesPreferencias.interesseTecnologia,
            quais: value
          }
        }
      }));
    } else if (id === "comentarios") {
      setInteresses(prev => ({
        ...prev,
        comentarios: value
      }));
    }
  };

  const handleAtividadesSociais = (value: boolean) => {
    setInteresses(prev => ({
      ...prev,
      prefCulturais: {
        ...prev.prefCulturais,
        atividadesSociais: {
          ...prev.prefCulturais.atividadesSociais,
          participa: value
        }
      }
    }));
  };

  const handleGostaEnsinar = (value: boolean) => {
    setInteresses(prev => ({
      ...prev,
      habilidadesPreferencias: {
        ...prev.habilidadesPreferencias,
        gostaEnsinar: {
          ...prev.habilidadesPreferencias.gostaEnsinar,
          gosta: value
        }
      }
    }));
  };

  const handleInteresseTecnologia = (value: boolean) => {
    setInteresses(prev => ({
      ...prev,
      habilidadesPreferencias: {
        ...prev.habilidadesPreferencias,
        interesseTecnologia: {
          ...prev.habilidadesPreferencias.interesseTecnologia,
          interessado: value
        }
      }
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateData({ interesses });
    onSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-8">
      <div className="space-y-6">
        <h3 className="text-lg font-bold">Seção 1: Interesses Gerais</h3>
        <div>
          <p className="mb-2 font-medium">1. Quais atividades você gosta de fazer no seu tempo livre? (Marque todas as opções que se aplicam)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-top space-x-2">
              <Checkbox 
                id="atividade-ler" 
                checked={interesses.atividadesTempo?.includes('Ler livros')}
                onCheckedChange={(checked) => handleAtividadeTempo('Ler livros', checked === true)}
              />
              <label htmlFor="atividade-ler" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Ler livros
              </label>
            </div>
            
            <div className="flex items-top space-x-2">
              <Checkbox 
                id="atividade-pintar" 
                checked={interesses.atividadesTempo?.includes('Pintar ou desenhar')}
                onCheckedChange={(checked) => handleAtividadeTempo('Pintar ou desenhar', checked === true)}
              />
              <label htmlFor="atividade-pintar" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Pintar ou desenhar
              </label>
            </div>
            
            <div className="flex items-top space-x-2">
              <Checkbox 
                id="atividade-caminhar" 
                checked={interesses.atividadesTempo?.includes('Caminhadas ao ar livre')}
                onCheckedChange={(checked) => handleAtividadeTempo('Caminhadas ao ar livre', checked === true)}
              />
              <label htmlFor="atividade-caminhar" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Caminhadas ao ar livre
              </label>
            </div>
            
            <div className="flex items-top space-x-2">
              <Checkbox 
                id="atividade-jogos" 
                checked={interesses.atividadesTempo?.includes('Jogos de tabuleiro ou cartas')}
                onCheckedChange={(checked) => handleAtividadeTempo('Jogos de tabuleiro ou cartas', checked === true)}
              />
              <label htmlFor="atividade-jogos" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Jogos de tabuleiro ou cartas
              </label>
            </div>
            
            <div className="flex items-top space-x-2">
              <Checkbox 
                id="atividade-plantas" 
                checked={interesses.atividadesTempo?.includes('Cuidar de plantas ou jardinagem')}
                onCheckedChange={(checked) => handleAtividadeTempo('Cuidar de plantas ou jardinagem', checked === true)}
              />
              <label htmlFor="atividade-plantas" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Cuidar de plantas ou jardinagem
              </label>
            </div>
            
            <div className="flex items-top space-x-2">
              <Checkbox 
                id="atividade-filmes" 
                checked={interesses.atividadesTempo?.includes('Assistir a filmes ou séries')}
                onCheckedChange={(checked) => handleAtividadeTempo('Assistir a filmes ou séries', checked === true)}
              />
              <label htmlFor="atividade-filmes" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Assistir a filmes ou séries
              </label>
            </div>
            
            <div className="flex items-top space-x-2">
              <Checkbox 
                id="atividade-musica" 
                checked={interesses.atividadesTempo?.includes('Ouvir música')}
                onCheckedChange={(checked) => handleAtividadeTempo('Ouvir música', checked === true)}
              />
              <label htmlFor="atividade-musica" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Ouvir música
              </label>
            </div>
            
            <div className="flex items-top space-x-2">
              <Checkbox 
                id="atividade-cozinhar" 
                checked={interesses.atividadesTempo?.includes('Cozinhar')}
                onCheckedChange={(checked) => handleAtividadeTempo('Cozinhar', checked === true)}
              />
              <label htmlFor="atividade-cozinhar" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Cozinhar
              </label>
            </div>
            
            <div className="flex items-top space-x-2">
              <Checkbox 
                id="atividade-outras" 
                checked={interesses.atividadesTempo?.includes('Outras')}
                onCheckedChange={(checked) => handleAtividadeTempo('Outras', checked === true)}
              />
              <label htmlFor="atividade-outras" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Outras (especificar): 
                <input
                  type="text"
                  className="ml-2 px-2 py-1 border border-gray-300 rounded"
                />
              </label>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-bold">Seção 2: Hobbies Específicos</h3>
        <div className="space-y-4">
          <div>
            <p className="mb-2 font-medium">2. Você gosta de atividades manuais, como tricô, crochê ou trabalhos com madeira?</p>
            <div className="space-y-1">
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="atividades-manuais"
                  checked={interesses.atividadesManuais.gosta === true}
                  onChange={() => handleAtividadesManuais(true)}
                />
                <span>Sim</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="atividades-manuais"
                  checked={interesses.atividadesManuais.gosta === false}
                  onChange={() => handleAtividadesManuais(false)}
                />
                <span>Não</span>
              </label>
              {interesses.atividadesManuais.gosta && (
                <div className="mt-2">
                  <label htmlFor="quais-atividades-manuais" className="block">Se sim, qual(is)?</label>
                  <input
                    type="text"
                    id="quais-atividades-manuais"
                    value={interesses.atividadesManuais.quais}
                    onChange={handleQuaisAtividadesManuais}
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md mt-1"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <h3 className="text-lg font-bold">Seção 3: Preferências Culturais</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="generosMusicais" className="block font-medium mb-1">
              3. Quais são os seus gêneros musicais ou artistas favoritos?
            </label>
            <Textarea
              id="generosMusicais"
              value={interesses.prefCulturais.generosMusicais}
              onChange={handleTextChange}
              placeholder="Resposta aberta"
              className="bg-gray-100"
            />
          </div>
          
          <div>
            <label htmlFor="filmesTV" className="block font-medium mb-1">
              4. Quais são os tipos de filmes ou programas de TV que você mais gosta de assistir?
            </label>
            <Textarea
              id="filmesTV"
              value={interesses.prefCulturais.filmesTV}
              onChange={handleTextChange}
              placeholder="Resposta aberta"
              className="bg-gray-100"
            />
          </div>
          
          <div>
            <p className="mb-2 font-medium">5. Você gosta de participar de atividades sociais ou eventos, como encontros ou grupos de convivência?</p>
            <div className="space-y-1">
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="atividades-sociais"
                  checked={interesses.prefCulturais.atividadesSociais.participa === true}
                  onChange={() => handleAtividadesSociais(true)}
                />
                <span>Sim</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="atividades-sociais"
                  checked={interesses.prefCulturais.atividadesSociais.participa === false}
                  onChange={() => handleAtividadesSociais(false)}
                />
                <span>Não</span>
              </label>
              {interesses.prefCulturais.atividadesSociais.participa && (
                <div className="mt-2">
                  <label htmlFor="atividadesSociaisQuais" className="block">Se sim, quais?</label>
                  <input
                    type="text"
                    id="atividadesSociaisQuais"
                    value={interesses.prefCulturais.atividadesSociais.quais}
                    onChange={handleTextChange}
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md mt-1"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <h3 className="text-lg font-bold">Seção 4: Habilidades e Preferências</h3>
        <div className="space-y-4">
          <div>
            <p className="mb-2 font-medium">6. Você gosta de ensinar algo para os outros, como habilidades ou conhecimentos que você tem?</p>
            <div className="space-y-1">
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="gosta-ensinar"
                  checked={interesses.habilidadesPreferencias.gostaEnsinar.gosta === true}
                  onChange={() => handleGostaEnsinar(true)}
                />
                <span>Sim</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="gosta-ensinar"
                  checked={interesses.habilidadesPreferencias.gostaEnsinar.gosta === false}
                  onChange={() => handleGostaEnsinar(false)}
                />
                <span>Não</span>
              </label>
              {interesses.habilidadesPreferencias.gostaEnsinar.gosta && (
                <div className="mt-2">
                  <label htmlFor="ensinoQuais" className="block">Se sim, o que gostaria de ensinar?</label>
                  <input
                    type="text"
                    id="ensinoQuais"
                    value={interesses.habilidadesPreferencias.gostaEnsinar.oquePoderia}
                    onChange={handleTextChange}
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md mt-1"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div>
            <p className="mb-2 font-medium">7. Você se interessa por atividades que envolvam tecnologia (como uso de computador, internet ou dispositivos móveis)?</p>
            <div className="space-y-1">
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="interesse-tecnologia"
                  checked={interesses.habilidadesPreferencias.interesseTecnologia.interessado === true}
                  onChange={() => handleInteresseTecnologia(true)}
                />
                <span>Sim</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="interesse-tecnologia"
                  checked={interesses.habilidadesPreferencias.interesseTecnologia.interessado === false}
                  onChange={() => handleInteresseTecnologia(false)}
                />
                <span>Não</span>
              </label>
              {interesses.habilidadesPreferencias.interesseTecnologia.interessado && (
                <div className="mt-2">
                  <label htmlFor="tecnologiaQuais" className="block">Se sim, quais?</label>
                  <input
                    type="text"
                    id="tecnologiaQuais"
                    value={interesses.habilidadesPreferencias.interesseTecnologia.quais}
                    onChange={handleTextChange}
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md mt-1"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <h3 className="text-lg font-bold">Seção 5: Comentários</h3>
        <div>
          <label htmlFor="comentarios" className="block font-medium mb-1">
            8. Existe algum hobby ou interesse que você gostaria de compartilhar ou que você gostaria de tentar no futuro?
          </label>
          <Textarea
            id="comentarios"
            value={interesses.comentarios}
            onChange={handleTextChange}
            placeholder="Resposta aberta"
            className="bg-gray-100"
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
          className="bg-[#0056a4] text-white py-3 px-12 rounded-full hover:bg-[#004483] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Finalizar Cadastro'}
        </button>
      </div>
    </form>
  );
};

export default HobbiesCuidador;
