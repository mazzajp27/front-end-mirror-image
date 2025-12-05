import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Star, MapPin, Clock, Heart, Search,
  Shield, Loader2, ChevronDown
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
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  // -------- FAVORITOS (localStorage associado ao usuário) --------
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  // Função para obter a chave do localStorage baseada no userId
  const getFavoritesKey = () => {
    const userId = localStorage.getItem('userId');
    return userId ? `cuidadoresFavoritos_${userId}` : null;
  };

  // Função para carregar favoritos do usuário atual
  const loadFavorites = useCallback(() => {
    const favoritesKey = getFavoritesKey();
    if (favoritesKey) {
      const saved = localStorage.getItem(favoritesKey);
      if (saved) {
        setFavoriteIds(new Set(JSON.parse(saved)));
      } else {
        setFavoriteIds(new Set());
      }
    } else {
      // Se não há usuário logado, limpar favoritos
      setFavoriteIds(new Set());
    }
  }, []);

  // Carregar favoritos quando o componente monta ou quando a rota muda
  useEffect(() => {
    // Pequeno delay para garantir que o localStorage foi atualizado após o login
    const timer = setTimeout(() => {
      loadFavorites();
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname, loadFavorites]);

  // Salvar favoritos no localStorage quando mudarem (apenas se houver usuário logado)
  useEffect(() => {
    const favoritesKey = getFavoritesKey();
    if (favoritesKey && favoriteIds.size > 0) {
      localStorage.setItem(favoritesKey, JSON.stringify([...favoriteIds]));
    }
  }, [favoriteIds]);

  // Recarregar favoritos quando o usuário fizer login/logout ou mudar de usuário
  useEffect(() => {
    const handleAuthChange = () => {
      // Pequeno delay para garantir que o localStorage foi atualizado
      setTimeout(() => {
        loadFavorites();
      }, 100);
    };

    const handleStorageChange = (e: StorageEvent) => {
      // Se o userId mudou, recarregar favoritos
      if (e.key === 'userId' || e.key === 'token') {
        setTimeout(() => {
          loadFavorites();
        }, 100);
      }
    };

    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadFavorites]);

  const toggleFavorito = (id: string) => {
    setFavoriteIds(prev => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  };

  const isFavoritado = (id: string) => favoriteIds.has(id);


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
          <h1 className="text-3xl font-bold text-gray-900">Cuidadores Disponíveis</h1>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-5 md:py-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-3.5 text-gray-400 pointer-events-none" />
            <input
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:border-transparent transition-all"
              placeholder="Buscar por nome ou especialidade..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="md:w-64 relative">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:border-transparent transition-all bg-white cursor-pointer"
            >
              {specialties.map(s => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" size={20} />
          </div>

          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`px-4 py-3 border rounded-lg flex items-center gap-2 transition-colors duration-200 ${
              showFavorites ? 'bg-red-50 text-red-600 border-red-200' : 'hover:bg-gray-50'
            }`}
          >
            <Heart size={20} className={showFavorites ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
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
                    <div key={c.id} className="bg-white shadow-md rounded-lg p-6 border-2 border-red-200 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-gray-900">{c.name}</h3>
                        <button 
                          onClick={() => toggleFavorito(c.id)}
                          className="p-1 hover:scale-110 transition-transform"
                          aria-label="Remover dos favoritos"
                        >
                          <Heart className="text-red-500 fill-red-500" size={20} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">{c.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lista Geral */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCuidadores.map(c => (
                <div key={c.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{c.name}</h3>
                    <button 
                      onClick={() => toggleFavorito(c.id)}
                      className="p-1 hover:scale-110 transition-transform"
                      aria-label={isFavoritado(c.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    >
                      <Heart className={isFavoritado(c.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'} size={20} />
                    </button>
                  </div>

                  <p className="text-gray-600 mt-2 text-sm leading-relaxed">{c.description}</p>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-sm text-gray-500">{c.experience}</span>
                    <span className="text-[#0056a4] font-bold text-lg">{c.price}</span>
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
