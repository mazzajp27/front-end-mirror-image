import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Loader2, GraduationCap, Clock, Heart, Music, Film, Users, BookOpen, Laptop, MessageSquare } from 'lucide-react';
import { cuidadorService, QuestionarioCuidadorResponse, HobbiesCuidadorResponse } from '../services/api';

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
  const [questionario, setQuestionario] = useState<QuestionarioCuidadorResponse | null>(null);
  const [hobbies, setHobbies] = useState<HobbiesCuidadorResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && cuidadorId) {
      fetchCuidadorDetails();
    } else {
      // Limpar dados quando o modal fechar
      setQuestionario(null);
      setHobbies(null);
      setError(null);
    }
  }, [isOpen, cuidadorId]);

  const fetchCuidadorDetails = async () => {
    if (!cuidadorId) {
      console.error('ID do cuidador não fornecido');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('Buscando detalhes do cuidador ID:', cuidadorId);

      // Buscar questionário e hobbies em paralelo (não buscamos endereço)
      const [questionariosData, hobbiesData] = await Promise.all([
        cuidadorService.buscarQuestionario(cuidadorId).catch((err) => {
          console.error('Erro ao buscar questionário:', err);
          return [];
        }),
        cuidadorService.buscarHobbies(cuidadorId).catch((err) => {
          console.error('Erro ao buscar hobbies:', err);
          return [];
        }),
      ]);

      console.log('Dados recebidos:', {
        questionarios: questionariosData,
        hobbies: hobbiesData,
      });

      // Pegar o primeiro resultado de cada (assumindo que há apenas um de cada)
      const questionarioResult = Array.isArray(questionariosData) ? questionariosData[0] : questionariosData;
      const hobbiesResult = Array.isArray(hobbiesData) ? hobbiesData[0] : hobbiesData;

      setQuestionario(questionarioResult || null);
      setHobbies(hobbiesResult || null);

      console.log('Dados processados:', {
        questionario: questionarioResult,
        hobbies: hobbiesResult,
      });
    } catch (err: any) {
      console.error('Erro ao buscar detalhes do cuidador:', err);
      setError('Erro ao carregar informações do cuidador. Tente novamente mais tarde.');
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
                      <p className="text-gray-600">{questionario.cursos_realizados && questionario.cursos_realizados.trim() ? questionario.cursos_realizados : 'Não informado'}</p>
                    </div>
                    <div>
                      <p className="font-medium">Instituição de Ensino:</p>
                      <p className="text-gray-600">{questionario.instituicao_ensino && questionario.instituicao_ensino.trim() ? questionario.instituicao_ensino : 'Não informado'}</p>
                    </div>
                    <div>
                      <p className="font-medium">Área de Formação:</p>
                      <p className="text-gray-600">{questionario.area_formacao && questionario.area_formacao.trim() ? questionario.area_formacao : 'Não informado'}</p>
                    </div>
                    <div>
                      <p className="font-medium">Tempo de Experiência:</p>
                      <p className="text-gray-600">{questionario.tempo_experiencia && questionario.tempo_experiencia.trim() ? questionario.tempo_experiencia : 'Não informado'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Principais Responsabilidades:</p>
                    <p className="text-gray-600">{questionario.principais_responsabilidades && questionario.principais_responsabilidades.trim() ? questionario.principais_responsabilidades : 'Não informado'}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Possui Certificação:</p>
                      <p className="text-gray-600">{questionario.possui_certificacao && questionario.possui_certificacao.trim() ? questionario.possui_certificacao : 'Não informado'}</p>
                    </div>
                    <div>
                      <p className="font-medium">Certificações:</p>
                      <p className="text-gray-600">{questionario.certificacao && questionario.certificacao.trim() ? questionario.certificacao : 'Não informado'}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="text-[#0056a4] h-5 w-5" />
                        <p className="font-medium">Horário Disponível:</p>
                      </div>
                      <p className="text-gray-600">{questionario.horario_disponivel && questionario.horario_disponivel.trim() ? questionario.horario_disponivel : 'Não informado'}</p>
                    </div>
                    <div>
                      <p className="font-medium">Disponibilidade para Plantão:</p>
                      <p className="text-gray-600">{questionario.disponibilidade_plantao && questionario.disponibilidade_plantao.trim() ? questionario.disponibilidade_plantao : 'Não informado'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Qualidades e Preferências:</p>
                    <p className="text-gray-600">{questionario.qualidades_preferencias && questionario.qualidades_preferencias.trim() ? questionario.qualidades_preferencias : 'Não informado'}</p>
                  </div>
                  <div>
                    <p className="font-medium">Qualidades do Cuidador:</p>
                    <p className="text-gray-600">{questionario.qualidades_cuidador && questionario.qualidades_cuidador.trim() ? questionario.qualidades_cuidador : 'Não informado'}</p>
                  </div>
                  <div>
                    <p className="font-medium">Referências:</p>
                    <p className="text-gray-600">{questionario.referencia_cuidador && questionario.referencia_cuidador.trim() ? questionario.referencia_cuidador : 'Não informado'}</p>
                  </div>
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
                      <p className="text-gray-600">{hobbies.atividades_gosta && hobbies.atividades_gosta.trim() ? hobbies.atividades_gosta : 'Não informado'}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="text-[#0056a4] h-5 w-5" />
                        <p className="font-medium">Atividades Manuais:</p>
                      </div>
                      <p className="text-gray-600">{hobbies.atividades_manuais && hobbies.atividades_manuais.trim() ? hobbies.atividades_manuais : 'Não informado'}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Music className="text-[#0056a4] h-5 w-5" />
                        <p className="font-medium">Gênero Musical:</p>
                      </div>
                      <p className="text-gray-600">{hobbies.gerenero_musical && hobbies.gerenero_musical.trim() ? hobbies.gerenero_musical : 'Não informado'}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Film className="text-[#0056a4] h-5 w-5" />
                        <p className="font-medium">Filmes e TV:</p>
                      </div>
                      <p className="text-gray-600">{hobbies.filmes_tv && hobbies.filmes_tv.trim() ? hobbies.filmes_tv : 'Não informado'}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="text-[#0056a4] h-5 w-5" />
                        <p className="font-medium">Participa de Eventos:</p>
                      </div>
                      <p className="text-gray-600">{hobbies.participa_eventos && hobbies.participa_eventos.trim() ? hobbies.participa_eventos : 'Não informado'}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="text-[#0056a4] h-5 w-5" />
                        <p className="font-medium">Gosta de Ensinar:</p>
                      </div>
                      <p className="text-gray-600">{hobbies.gosta_ensinar && hobbies.gosta_ensinar.trim() ? hobbies.gosta_ensinar : 'Não informado'}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Laptop className="text-[#0056a4] h-5 w-5" />
                        <p className="font-medium">Atividades Tecnológicas:</p>
                      </div>
                      <p className="text-gray-600">{hobbies.atividades_tecnologicas && hobbies.atividades_tecnologicas.trim() ? hobbies.atividades_tecnologicas : 'Não informado'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Comentários Adicionais:</p>
                    <p className="text-gray-600">{hobbies.comentarios && hobbies.comentarios.trim() ? hobbies.comentarios : 'Não informado'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mensagem quando não há informações */}
            {!questionario && !hobbies && !loading && !error && (
              <div className="text-center py-12">
                <p className="text-gray-600">Este cuidador ainda não completou seu perfil.</p>
                <p className="text-sm text-gray-500 mt-2">Não há informações de questionário ou hobbies cadastradas.</p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CuidadorDetailsModal;

