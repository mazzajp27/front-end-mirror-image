import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Phone, MessageCircle, Heart, Filter, Search, Award, Shield, Users, ChevronDown } from 'lucide-react';
import Header from '../components/Header';

interface Cuidador {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  age: number;
  location: string;
  availability: string;
  specialties: string[];
  experience: string;
  description: string;
  hobbies: string[];
  isAvailable: boolean;
  price: string;
  image: string;
  verified: boolean;
  distance: string;
}

const CuidadoresPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  
  // Estado para gerenciar favoritos com persistência no localStorage
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  // Carregar favoritos do localStorage ao montar o componente
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('cuidadoresFavoritos');
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        setFavoriteIds(new Set(parsedFavorites));
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos do localStorage:', error);
    }
  }, []);

  // Salvar favoritos no localStorage sempre que mudarem
  useEffect(() => {
    try {
      const favoritesArray = Array.from(favoriteIds);
      localStorage.setItem('cuidadoresFavoritos', JSON.stringify(favoritesArray));
    } catch (error) {
      console.error('Erro ao salvar favoritos no localStorage:', error);
    }
  }, [favoriteIds]);

  const cuidadores: Cuidador[] = [
    {
      id: '1',
      name: 'Maria Silva Santos',
      rating: 4.9,
      reviews: 127,
      age: 43,
      location: 'Taguatinga, DF',
      availability: 'Segunda a Sexta',
      specialties: ['Parkinson', 'Diabetes', 'Mobilidade Reduzida', 'Atenção Humanizada'],
      experience: '8 anos',
      description: 'Cuidadora de idosos com sólida experiência e especialização no cuidado de pacientes com Parkinson, diabetes e mobilidade reduzida. Presta um atendimento humanizado e individualizado, com foco na segurança, bem-estar e qualidade de vida do idoso.',
      hobbies: ['Leitura', 'Jardinagem', 'Culinária saudável', 'Caminhadas leves'],
      isAvailable: true,
      price: 'R$ 45/hora',
      image: '/api/placeholder/150/150',
      verified: true,
      distance: '2.5 km'
    },
    {
      id: '2',
      name: 'Ana Costa Oliveira',
      rating: 4.8,
      reviews: 89,
      age: 38,
      location: 'Asa Norte, DF',
      availability: 'Todos os dias',
      specialties: ['Demência', 'Alzheimer', 'Estimulação Cognitiva', 'Fisioterapia'],
      experience: '6 anos',
      description: 'Especialista em cuidados com pacientes com demência e Alzheimer. Desenvolve atividades de estimulação cognitiva e mantém um ambiente seguro e acolhedor para os idosos.',
      hobbies: ['Música', 'Dança', 'Artesanato', 'Meditação'],
      isAvailable: true,
      price: 'R$ 50/hora',
      image: '/api/placeholder/150/150',
      verified: true,
      distance: '1.8 km'
    },
    {
      id: '3',
      name: 'João Pedro Lima',
      rating: 4.7,
      reviews: 95,
      age: 45,
      location: 'Guará, DF',
      availability: 'Finais de semana',
      specialties: ['Cuidados Paliativos', 'Controle de Medicamentos', 'Acompanhamento Médico'],
      experience: '10 anos',
      description: 'Enfermeiro especializado em cuidados paliativos com vasta experiência em controle de medicamentos e acompanhamento médico domiciliar.',
      hobbies: ['Fotografia', 'Leitura médica', 'Caminhadas', 'Culinária'],
      isAvailable: false,
      price: 'R$ 60/hora',
      image: '/api/placeholder/150/150',
      verified: true,
      distance: '3.2 km'
    },
    {
      id: '4',
      name: 'Carla Mendes',
      rating: 4.9,
      reviews: 156,
      age: 41,
      location: 'Águas Claras, DF',
      availability: 'Segunda a Domingo',
      specialties: ['Fisioterapia', 'Reabilitação', 'Exercícios Terapêuticos', 'Mobilidade'],
      experience: '7 anos',
      description: 'Fisioterapeuta especializada em reabilitação de idosos. Desenvolve programas de exercícios terapêuticos personalizados para melhorar a mobilidade e qualidade de vida.',
      hobbies: ['Yoga', 'Pilates', 'Natação', 'Arte terapia'],
      isAvailable: true,
      price: 'R$ 55/hora',
      image: '/api/placeholder/150/150',
      verified: true,
      distance: '4.1 km'
    }
  ];

  const specialties = [
    'Todas as especialidades',
    'Parkinson',
    'Diabetes',
    'Demência',
    'Alzheimer',
    'Mobilidade Reduzida',
    'Cuidados Paliativos',
    'Fisioterapia',
    'Estimulação Cognitiva'
  ];

  // Função para alternar favorito
  const toggleFavorito = (cuidadorId: string) => {
    setFavoriteIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cuidadorId)) {
        newSet.delete(cuidadorId);
      } else {
        newSet.add(cuidadorId);
      }
      return newSet;
    });
  };

  // Verificar se um cuidador está favoritado
  const isFavoritado = (cuidadorId: string) => {
    return favoriteIds.has(cuidadorId);
  };

  // Obter lista de cuidadores favoritados
  const favoritados = cuidadores.filter(cuidador => favoriteIds.has(cuidador.id));

  // Filtrar cuidadores baseado em busca, especialidade e favoritos
  const filteredCuidadores = cuidadores.filter(cuidador => {
    const matchesSearch = cuidador.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cuidador.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSpecialty = selectedSpecialty === '' || selectedSpecialty === 'Todas as especialidades' ||
                            cuidador.specialties.includes(selectedSpecialty);
    const matchesFavorites = !showFavorites || favoriteIds.has(cuidador.id);
    return matchesSearch && matchesSpecialty && matchesFavorites;
  });

  const handleContact = (cuidador: Cuidador) => {
    // Navigate to messages with caregiver data
    const params = new URLSearchParams({
      cuidadorId: cuidador.id,
      cuidadorName: cuidador.name,
      cuidadorRole: 'Cuidador'
    });
    navigate(`/mensagens?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-[#0056a4] hover:text-[#004483] p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Voltar para página inicial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Cuidadores Disponíveis</h1>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por nome ou especialidade..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:border-transparent"
                />
              </div>
            </div>
            <div className="md:w-64 relative">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:border-transparent appearance-none bg-white cursor-pointer"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
              <ChevronDown 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
                size={20}
              />
            </div>
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`px-4 py-3 rounded-lg border transition-colors flex items-center justify-center gap-2 ${
                showFavorites
                  ? 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Heart 
                size={20} 
                className={showFavorites ? 'fill-red-500 text-red-500' : ''} 
              />
              <span className="hidden sm:inline">
                {showFavorites ? 'Mostrar Todos' : 'Favoritos'}
              </span>
              {favoritados.length > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  showFavorites ? 'bg-red-200 text-red-700' : 'bg-red-100 text-red-600'
                }`}>
                  {favoritados.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Seção de Favoritados */}
        {!showFavorites && favoritados.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Heart size={24} className="text-red-500 fill-red-500" />
                <h2 className="text-2xl font-bold text-gray-900">Cuidadores Favoritados</h2>
                <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                  {favoritados.length}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {favoritados.map((cuidador) => (
                <div key={`favorite-${cuidador.id}`} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border-2 border-red-200">
                  {/* Card Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-[#0056a4] to-[#004483] rounded-full flex items-center justify-center">
                            <span className="text-white text-xl font-bold">
                              {cuidador.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          {cuidador.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                              <Shield size={12} className="text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{cuidador.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="text-yellow-400" size={16} fill="currentColor" />
                            <span className="text-sm font-medium text-gray-700">{cuidador.rating}</span>
                            <span className="text-sm text-gray-500">({cuidador.reviews} avaliações)</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorito(cuidador.id);
                        }}
                        className="text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
                        aria-label="Remover dos favoritos"
                      >
                        <Heart size={20} className="fill-current" />
                      </button>
                    </div>

                    {/* Info Row */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={16} />
                        <span>{cuidador.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} />
                        <span>{cuidador.availability}</span>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {cuidador.specialties.slice(0, 2).map((specialty, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {specialty}
                          </span>
                        ))}
                        {cuidador.specialties.length > 2 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{cuidador.specialties.length - 2} mais
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {cuidador.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{cuidador.experience} de experiência</span>
                      <span className="font-semibold text-[#0056a4]">{cuidador.price}</span>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        cuidador.isAvailable 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {cuidador.isAvailable ? 'Disponível' : 'Indisponível'}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleContact(cuidador)}
                        className="flex-1 bg-[#0056a4] text-white py-2 px-4 rounded-lg hover:bg-[#004483] transition-colors flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={16} />
                        Contatar
                      </button>
                      <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                        <Phone size={16} />
                        Ligar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 my-8"></div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {showFavorites 
              ? `${filteredCuidadores.length} cuidador${filteredCuidadores.length !== 1 ? 'es' : ''} favoritado${filteredCuidadores.length !== 1 ? 's' : ''}`
              : `${filteredCuidadores.length} cuidador${filteredCuidadores.length !== 1 ? 'es' : ''} encontrado${filteredCuidadores.length !== 1 ? 's' : ''}`
            }
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCuidadores.map((cuidador) => (
            <div key={cuidador.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#0056a4] to-[#004483] rounded-full flex items-center justify-center">
                        <span className="text-white text-xl font-bold">
                          {cuidador.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      {cuidador.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                          <Shield size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{cuidador.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-400" size={16} fill="currentColor" />
                        <span className="text-sm font-medium text-gray-700">{cuidador.rating}</span>
                        <span className="text-sm text-gray-500">({cuidador.reviews} avaliações)</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorito(cuidador.id);
                    }}
                    className={`transition-colors p-1 rounded-full hover:bg-red-50 ${
                      isFavoritado(cuidador.id)
                        ? 'text-red-500'
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                    aria-label={isFavoritado(cuidador.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    <Heart 
                      size={20} 
                      className={isFavoritado(cuidador.id) ? 'fill-current' : ''} 
                    />
                  </button>
                </div>

                {/* Info Row */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} />
                    <span>{cuidador.distance}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} />
                    <span>{cuidador.availability}</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {cuidador.specialties.slice(0, 2).map((specialty, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                    {cuidador.specialties.length > 2 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{cuidador.specialties.length - 2} mais
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {cuidador.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{cuidador.experience} de experiência</span>
                  <span className="font-semibold text-[#0056a4]">{cuidador.price}</span>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    cuidador.isAvailable 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {cuidador.isAvailable ? 'Disponível' : 'Indisponível'}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleContact(cuidador)}
                    className="flex-1 bg-[#0056a4] text-white py-2 px-4 rounded-lg hover:bg-[#004483] transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} />
                    Contatar
                  </button>
                  <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    <Phone size={16} />
                    Ligar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCuidadores.length === 0 && (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum cuidador encontrado</h3>
            <p className="text-gray-600">Tente ajustar seus filtros de busca</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CuidadoresPage; 