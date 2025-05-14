import axios from 'axios';

// Define a URL base da API
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
export interface IdosoData {
  nome: string;
  cpf: string;
  email: string;
  cep: string;
  telefone: string;
  telefone_emergencia: string;
  genero: string;
  data_nascimento: string;
  senha: string;
  // Endereço
  estado?: string;
  cidade?: string;
  endereco?: string;
  bairro?: string;
  numero?: string;
  complemento?: string;
  referencia?: string;
  // Questionário
  historicoMedico?: {
    condicaoMedica?: string;
    qualCondicao?: string;
    tomaMedicamento?: boolean;
    quaisMedicamentos?: string;
  };
  atividadesDiarias?: {
    realizaSozinho?: boolean;
    quaisAtividadesPrecisaAjuda?: string;
  };
  familiaApoio?: {
    visitasFrequentes?: boolean;
    frequenciaVisitas?: string;
  };
  qualidadesPreferencias?: {
    principaisQualidades?: string;
    expectativasCuidador?: string;
  };
  deficienciasNecessidades?: {
    possuiDeficiencia?: boolean;
    qualDeficiencia?: string;
    informacoesAdicionais?: string;
  };
  // Hobbies
  interesses?: {
    atividadesTempo?: string[];
    praticaEsporte?: {
      pratica: boolean;
      quais?: string;
    };
    atividadesManuais?: {
      gosta: boolean;
      quais?: string;
    };
    interesseAprender?: {
      interessado: boolean;
      oque?: string;
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
export const idosoService = {
  // Cadastrar novo contratante
  cadastrar: async (idosoData: IdosoData) => {
    try {
      const response = await api.post('/contratantes', idosoData);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar contratante:', error);
      throw error;
    }
  },
  
  // Atualizar dados do contratante
  atualizar: async (id: string, idosoData: Partial<IdosoData>) => {
    try {
      const response = await api.put(`/contratantes/${id}`, idosoData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar contratante:', error);
      throw error;
    }
  },
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
