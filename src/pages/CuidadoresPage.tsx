import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Phone, MessageCircle, Heart, Filter, Search, Award, Shield, Users, User, LogOut } from 'lucide-react';

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
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    
    if (token && name) {
      setIsLoggedIn(true);
      setUserName(name);
    } else {
      setIsLoggedIn(false);
      setUserName(null);
    }
  };

  useEffect(() => {
    checkAuth();
    
    // Listener para evento customizado (quando login/logout acontece)
    const handleAuthChange = () => {
      checkAuth();
    };
    
    window.addEventListener('auth-change', handleAuthChange);
    
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    
    // Dispara evento customizado para atualizar outros componentes
    window.dispatchEvent(new Event('auth-change'));
    
    setIsLoggedIn(false);
    setUserName(null);
    navigate('/');
  };

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

  const filteredCuidadores = cuidadores.filter(cuidador => {
    const matchesSearch = cuidador.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cuidador.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSpecialty = selectedSpecialty === '' || selectedSpecialty === 'Todas as especialidades' ||
                            cuidador.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
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
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
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
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Cuidadores Disponíveis</h1>
                <p className="text-gray-600 mt-1">Encontre o cuidador ideal para sua família</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-[#0056a4]">
                    <User size={20} />
                    <span className="text-lg font-medium">Olá, {userName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-[#0056a4] hover:text-[#003d74] text-lg focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2 rounded-md px-3 py-2 hover:bg-gray-100 transition-colors"
                    aria-label="Sair da conta"
                  >
                    <LogOut size={18} />
                    Sair
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/tipo-cadastro')}
                    className="bg-[#0056a4] text-white px-4 py-2 rounded-lg hover:bg-[#004483] transition-colors"
                  >
                    Cadastre-se
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className="flex items-center gap-2 text-[#0056a4] hover:text-[#003d74]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Entrar
                  </button>
                </>
              )}
              <img 
                src="/lovable-uploads/ae6d71a7-8de9-40f0-a34b-848a22c94d66.png" 
                alt="Amigo Cuidador Logo" 
                className="h-8"
              />
            </div>
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
            <div className="md:w-64">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:border-transparent"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredCuidadores.length} cuidador{filteredCuidadores.length !== 1 ? 'es' : ''} encontrado{filteredCuidadores.length !== 1 ? 's' : ''}
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
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Heart size={20} />
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