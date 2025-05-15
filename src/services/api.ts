import axios from 'axios';

// Define a URL base da API
const API_BASE_URL = 'http://localhost:8000/api';

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
  // Endereço
  estado?: string;
  cidade?: string;
  endereco?: string;
  bairro?: string;
  cep?: string;
  numero?: string;
  complemento?: string;
  referencia?: string;
  // Questionário
  formacaoAcademica?: {
    cursos?: string;
    instituicao?: string;
    area?: string;
  };
  experienciaProfissional?: {
    tempoExperiencia?: string;
    responsabilidades?: string;
    possuiCertificacao?: boolean;
    certificacoes?: string;
  };
  qualidades?: {
    habilidades?: string[];
    horariosDisponiveis?: string;
    disponibilidadePlantoes?: boolean;
    qualidadesImportantes?: string;
  };
  referencias?: {
    nomeContato?: string;
  };
  // Hobbies
  interesses?: {
    atividadesTempo?: string[];
    atividadesManuais?: {
      gosta: boolean;
      quais?: string;
    };
    prefCulturais?: {
      generosMusicais?: string;
      filmesTV?: string;
      atividadesSociais?: {
        participa: boolean;
        quais?: string;
      };
    };
    habilidadesPreferencias?: {
      gostaEnsinar?: {
        gosta: boolean;
        oquePoderia?: string;
      };
      interesseTecnologia?: {
        interessado: boolean;
        quais?: string;
      };
    };
    comentarios?: string;
  };
}

// Interface para tipagem dos dados do contratante
export interface ContratanteData {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  telefone_emergencia?: string;
  senha: string;
  genero?: string;
  data_nascimento?: string;
}

// Interface para tipagem dos dados de login
export interface LoginData {
  email: string;
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
  
  // Atualizar dados do cuidador
  atualizar: async (id: string, cuidadorData: Partial<CuidadorData>) => {
    try {
      const response = await api.put(`/cuidadores/${id}`, cuidadorData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar cuidador:', error);
      throw error;
    }
  },
};

// Serviço para contratantes
export const contratanteService = {
  // Cadastrar novo contratante
  cadastrar: async (contratanteData: ContratanteData) => {
    try {
      const response = await api.post('/contratante/', contratanteData);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar contratante:', error);
      throw error;
    }
  },

  // Listar todos os contratantes
  listarTodos: async () => {
    try {
      const response = await api.get('/contratantes/');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar contratantes:', error);
      throw error;
    }
  },

  // Buscar contratante por ID
  buscarPorId: async (id: number) => {
    try {
      const response = await api.get(`/contratantes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar contratante:', error);
      throw error;
    }
  },
  
  // Atualizar dados do contratante
  atualizar: async (id: number, contratanteData: Partial<ContratanteData>) => {
    try {
      const response = await api.put(`/contratante/${id}`, contratanteData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar contratante:', error);
      throw error;
    }
  },

  // Deletar contratante
  deletar: async (id: number) => {
    try {
      const response = await api.delete(`/contratante/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar contratante:', error);
      throw error;
    }
  }
};

// Serviço de autenticação
export const authService = {
  login: async (loginData: LoginData) => {
    try {
      const response = await api.post('/auth/login', loginData);
      return response.data;
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      throw error;
    }
  },
};

export default api;
