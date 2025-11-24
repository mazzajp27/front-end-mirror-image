import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Loader2, MapPin, GraduationCap, Clock, Heart, Music, Film, Users, BookOpen, Laptop, MessageSquare } from 'lucide-react';
import { cuidadorService, EnderecoCuidadorResponse, QuestionarioCuidadorResponse, HobbiesCuidadorResponse } from '../services/api';

interface CuidadorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  cuidadorId: number;
  cuidadorName: string;
}

const CuidadorDetailsModal: React.FC<CuidadorDetailsModalProps> = ({
  isOpen,
  onClose,
  cuidadorId,
  cuidadorName,
}) => {
  const [loading, setLoading] = useState(false);
  const [endereco, setEndereco] = useState<EnderecoCuidadorResponse | null>(null);
  const [questionario, setQuestionario] = useState<QuestionarioCuidadorResponse | null>(null);
  const [hobbies, setHobbies] = useState<HobbiesCuidadorResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && cuidadorId) {
      fetchCuidadorDetails();
    } else {
      // Limpar dados quando o modal fechar
      setEndereco(null);
      setQuestionario(null);
      setHobbies(null);
      setError(null);
    }
  }, [isOpen, cuidadorId]);

  const fetchCuidadorDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar todas as informações em paralelo
      const [enderecosData, questionariosData, hobbiesData] = await Promise.all([
        cuidadorService.buscarEndereco(cuidadorId).catch(() => []),
        cuidadorService.buscarQuestionario(cuidadorId).catch(() => []),
        cuidadorService.buscarHobbies(cuidadorId).catch(() => []),
      ]);

      // Pegar o primeiro resultado de cada (assumindo que há apenas um de cada)
      setEndereco(enderecosData[0] || null);
      setQuestionario(questionariosData[0] || null);
      setHobbies(hobbiesData[0] || null);
    } catch (err: any) {
      console.error('Erro ao buscar detalhes do cuidador:', err);
      setError('Erro ao carregar informações do cuidador');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#0056a4]">
            Informações Detalhadas - {cuidadorName}
          </DialogTitle>
          <DialogDescription>
            Conheça mais sobre este cuidador profissional
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-[#0056a4] animate-spin mb-4" />
            <p className="text-gray-600">Carregando informações...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <div className="space-y-6 mt-4">
            {/* Endereço */}
            {endereco && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="text-[#0056a4] h-6 w-6" />
                  <h3 className="text-xl font-semibold text-[#0056a4]">Localização</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <p className="font-medium">Endereço:</p>
                    <p>{endereco.endereco}, {endereco.numero}</p>
                    {endereco.complemento && <p>Complemento: {endereco.complemento}</p>}
                  </div>
                  <div>
                    <p className="font-medium">Bairro:</p>
                    <p>{endereco.bairro}</p>
                  </div>
                  <div>
                    <p className="font-medium">Cidade/Estado:</p>
                    <p>{endereco.cidade} - {endereco.estado}</p>
                  </div>
                  <div>
                    <p className="font-medium">CEP:</p>
                    <p>{endereco.cep}</p>
                  </div>
                  {endereco.referencia && (
                    <div className="md:col-span-2">
                      <p className="font-medium">Referência:</p>
                      <p>{endereco.referencia}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Questionário */}
            {questionario && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="text-[#0056a4] h-6 w-6" />
                  <h3 className="text-xl font-semibold text-[#0056a4]">Formação e Experiência</h3>
                </div>
                <div className="space-y-4 text-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Cursos Realizados:</p>
                      <p>{questionario.cursos_realizados || 'Não informado'}</p>
                    </div>
                    <div>
                      <p className="font-medium">Instituição de Ensino:</p>
                      <p>{questionario.instituicao_ensino || 'Não informado'}</p>
                    </div>
                    <div>
                      <p className="font-medium">Área de Formação:</p>
                      <p>{questionario.area_formacao || 'Não informado'}</p>
                    </div>
                    <div>
                      <p className="font-medium">Tempo de Experiência:</p>
                      <p>{questionario.tempo_experiencia || 'Não informado'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Principais Responsabilidades:</p>
                    <p>{questionario.principais_responsabilidades || 'Não informado'}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Possui Certificação:</p>
                      <p>{questionario.possui_certificacao || 'Não informado'}</p>
                    </div>
                    {questionario.certificacao && (
                      <div>
                        <p className="font-medium">Certificações:</p>
                        <p>{questionario.certificacao}</p>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="text-[#0056a4] h-5 w-5" />
                        <p className="font-medium">Horário Disponível:</p>
                      </div>
                      <p>{questionario.horario_disponivel || 'Não informado'}</p>
                    </div>
                    <div>
                      <p className="font-medium">Disponibilidade para Plantão:</p>
                      <p>{questionario.disponibilidade_plantao || 'Não informado'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Qualidades e Preferências:</p>
                    <p>{questionario.qualidades_preferencias || 'Não informado'}</p>
                  </div>
                  <div>
                    <p className="font-medium">Qualidades do Cuidador:</p>
                    <p>{questionario.qualidades_cuidador || 'Não informado'}</p>
                  </div>
                  {questionario.referencia_cuidador && (
                    <div>
                      <p className="font-medium">Referências:</p>
                      <p>{questionario.referencia_cuidador}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Hobbies */}
            {hobbies && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="text-[#0056a4] h-6 w-6" />
                  <h3 className="text-xl font-semibold text-[#0056a4]">Interesses e Hobbies</h3>
                </div>
                <div className="space-y-4 text-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="text-[#0056a4] h-5 w-5" />
                        <p className="font-medium">Atividades que Gosta:</p>
                      </div>
                      <p>{hobbies.atividades_gosta || 'Não informado'}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="text-[#0056a4] h-5 w-5" />
                        <p className="font-medium">Atividades Manuais:</p>
                      </div>
                      <p>{hobbies.atividades_manuais || 'Não informado'}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Music className="text-[#0056a4] h-5 w-5" />
                        <p className="font-medium">Gênero Musical:</p>
                      </div>
                      <p>{hobbies.gerenero_musical || 'Não informado'}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Film className="text-[#0056a4] h-5 w-5" />
                        <p className="font-medium">Filmes e TV:</p>
                      </div>
                      <p>{hobbies.filmes_tv || 'Não informado'}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="text-[#0056a4] h-5 w-5" />
                        <p className="font-medium">Participa de Eventos:</p>
                      </div>
                      <p>{hobbies.participa_eventos || 'Não informado'}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="text-[#0056a4] h-5 w-5" />
                        <p className="font-medium">Gosta de Ensinar:</p>
                      </div>
                      <p>{hobbies.gosta_ensinar || 'Não informado'}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Laptop className="text-[#0056a4] h-5 w-5" />
                        <p className="font-medium">Atividades Tecnológicas:</p>
                      </div>
                      <p>{hobbies.atividades_tecnologicas || 'Não informado'}</p>
                    </div>
                  </div>
                  {hobbies.comentarios && (
                    <div>
                      <p className="font-medium">Comentários Adicionais:</p>
                      <p>{hobbies.comentarios}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mensagem quando não há informações */}
            {!endereco && !questionario && !hobbies && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-600">Este cuidador ainda não completou seu perfil.</p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CuidadorDetailsModal;

