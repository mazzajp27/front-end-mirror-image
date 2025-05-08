
import axios from 'axios';

// Defina a URL base da sua API aqui
const API_BASE_URL = 'https://sua-api-amigo-cuidador.com/api';

// Crie uma instância do axios com configurações padrão
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interface para tipagem dos dados do cuidador
export interface CuidadorData {
  nome: string;
  cpf: string;
  email: string;
  dataNascimento: string;
  telefone: string;
  genero: string;
  senha: string;
}

// Serviço para cuidadores
export const cuidadorService = {
  // Cadastrar novo cuidador
  cadastrar: async (cuidadorData: CuidadorData) => {
    try {
      const response = await api.post('/cuidadores', cuidadorData);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar cuidador:', error);
      throw error;
    }
  },
};

export default api;
