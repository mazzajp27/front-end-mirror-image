import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Star, MapPin, Clock, Heart, Search,
  Shield, User, LogOut, Loader2, ChevronDown
} from 'lucide-react';

import { cuidadorService, CuidadorResponse } from '../services/api';
import { toast } from 'sonner';
import CuidadorDetailsModal from '../components/CuidadorDetailsModal';
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

  // -------- FAVORITOS (localStorage) --------
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('cuidadoresFavoritos');
    if (saved) {
      setFavoriteIds(new Set(JSON.parse(saved)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cuidadoresFavoritos', JSON.stringify([...favoriteIds]));
  }, [favoriteIds]);

  const toggleFavorito = (id: string) => {
    setFavoriteIds(prev => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  };

  const isFavoritado = (id: string) => favoriteIds.has(id);

  // -------- AUTH --------
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');

    setIsLoggedIn(!!token);
    setUserName(name || null);
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener('auth-change', checkAuth);
    return () => window.removeEventListener('auth-change', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event('auth-change'));
    navigate('/');
  };

  // -------- API --------
  const [cuidadores, setCuidadores] = useState<Cuidador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const calculateAge = (date?: string) => {
    if (!date) return 0;
    const d = new Date(date);
    return new Date().getFullYear() - d.getFullYear();
  };

  const mapCuidadorFromAPI = (api: CuidadorResponse): Cuidador => ({
    id: api.id_cuidador.toString(),
    name: api.nome,
    rating: 4.5,
    reviews: 0,
    age: calculateAge(api.data_nascimento),
    location: 'Brasília, DF',
    availability: 'A definir',
    specialties: ['Cuidados Gerais'],
    experience: 'Experiência confirmada',
    description: 'Cuidador(a) com experiência em idosos.',
    hobbies: [],
    isAvailable: true,
    price: 'A combinar',
    image: '/api/placeholder/150/150',
    verified: true,
    distance: 'Não calculada'
  });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await cuidadorService.listar();
        setCuidadores(data.map(mapCuidadorFromAPI));
      } catch {
        setError('Erro ao carregar cuidadores.');
        toast.error('Erro ao carregar cuidadores.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);
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

  const filteredCuidadores = cuidadores.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSpecialty =
      selectedSpecialty === '' ||
      selectedSpecialty === 'Todas as especialidades' ||
      c.specialties.includes(selectedSpecialty);

    const matchesFavorites =
      !showFavorites || favoriteIds.has(c.id);

    return matchesSearch && matchesSpecialty && matchesFavorites;
  });

  const favoritados = cuidadores.filter(c => favoriteIds.has(c.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Header interno */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/')}
              className="text-[#0056a4] hover:text-[#004483] p-2"
            >
              ← Voltar
            </button>

            <h1 className="text-3xl font-bold">Cuidadores Disponíveis</h1>

            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-2 text-[#0056a4]">
                    <User size={20} />
                    <span>Olá, {userName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-[#0056a4] hover:text-[#004483] flex gap-2 items-center"
                  >
                    <LogOut size={18} /> Sair
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/tipo-cadastro')}
                    className="bg-[#0056a4] text-white px-4 py-2 rounded-lg"
                  >
                    Cadastre-se
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className="text-[#0056a4]"
                  >
                    Entrar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-3 border rounded-lg"
              placeholder="Buscar por nome ou especialidade..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="md:w-64 relative">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg appearance-none"
            >
              {specialties.map(s => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-400" />
          </div>

          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`px-4 py-3 border rounded-lg flex items-center gap-2 ${
              showFavorites ? 'bg-red-50 text-red-600' : ''
            }`}
          >
            <Heart size={20} className={showFavorites ? 'fill-red-500' : ''} />
            Favoritos
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-[#0056a4]" />
            <p className="text-gray-600 mt-4">Carregando cuidadores...</p>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <>
            {/* Favoritados */}
            {!showFavorites && favoritados.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                  <Heart className="text-red-500 fill-red-500" />
                  Favoritos ({favoritados.length})
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoritados.map(c => (
                    <div key={c.id} className="bg-white shadow rounded-lg p-6 border border-red-200">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-semibold">{c.name}</h3>
                        <button onClick={() => toggleFavorito(c.id)}>
                          <Heart className="text-red-500 fill-red-500" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{c.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lista Geral */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCuidadores.map(c => (
                <div key={c.id} className="bg-white shadow rounded-lg p-6 hover:shadow-lg">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold">{c.name}</h3>
                    <button onClick={() => toggleFavorito(c.id)}>
                      <Heart className={isFavoritado(c.id) ? 'text-red-500 fill-red-500' : ''} />
                    </button>
                  </div>

                  <p className="text-gray-600 mt-2">{c.description}</p>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm">{c.experience}</span>
                    <span className="text-[#0056a4] font-bold">{c.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      <CuidadorDetailsModal
        isOpen={false}
        onClose={() => {}}
        cuidadorId={0}
        cuidadorName=""
      />
    </div>
  );
};

export default CuidadoresPage;
