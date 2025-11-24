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

// Interceptor para adicionar o token de autenticação em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
  telefone_emergencia: string;
  senha: string;
  genero: string;
  data_nascimento: string;
  // Endereço
  estado: string;
  cidade: string;
  endereco: string;
  bairro: string;
  cep: string;
  numero: string;
  complemento: string;
  referencia?: string;
  // Questionário
  questionario?: {
    saudeGeral: {
      condicoesMedicas: string;
      medicamentosUso: string;
      alergias: string;
      restricoesAlimentares: string;
      mobilidadeRestricoes: string;
    };
    necessidadesCuidado: {
      auxilioAtividadesDiarias: {
        precisa: boolean;
        quais: string;
      };
      auxilioMedicacao: {
        precisa: boolean;
        frequencia: string;
      };
      monitoramentoSinais: {
        necessario: boolean;
        quais: string;
      };
    };
    preferenciasCuidado: {
      horarioPreferencial: string;
      frequenciaCuidado: string;
      caracteristicasCuidador: string;
      observacoesAdicionais: string;
    };
  };
  // Hobbies e Atividades
  hobbies?: string[];
  atividadesFisicas?: {
    pratica: boolean;
    quais: string;
  };
  atividadesSociais?: {
    participa: boolean;
    quais: string;
  };
  preferencias?: {
    alimentacao: string;
    rotinaDiaria: string;
    observacoesAdicionais: string;
  };
}

// Interface para tipagem dos dados de login
export interface LoginData {
  email: string;
  senha: string;
}

// Interface para tipagem da resposta do login
export interface LoginResponse {
  id: number;
  nome: string;
  email: string;
  tipo_usuario: 'contratante' | 'cuidador';
  token: string;
}

// Interface para resposta da API de cuidador
export interface CuidadorResponse {
  id_cuidador: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  genero?: string;
  data_nascimento?: string;
}

// Interface para endereço do cuidador
export interface EnderecoCuidadorResponse {
  id_endereco_cuidador: number;
  estado: string;
  cidade: string;
  endereco: string;
  bairro: string;
  cep: string;
  numero: string;
  complemento?: string;
  referencia?: string;
  id_cuidador: number;
}

// Interface para questionário do cuidador
export interface QuestionarioCuidadorResponse {
  id_questionario_cuidador: number;
  cursos_realizados: string;
  instituicao_ensino: string;
  area_formacao: string;
  tempo_experiencia: string;
  principais_responsabilidades: string;
  possui_certificacao: string;
  certificacao: string;
  qualidades_preferencias: string;
  horario_disponivel: string;
  disponibilidade_plantao: string;
  qualidades_cuidador: string;
  referencia_cuidador: string;
  id_cuidador: number;
}

// Interface para hobbies do cuidador
export interface HobbiesCuidadorResponse {
  id_hobbies_cuidador: number;
  atividades_gosta: string;
  atividades_manuais: string;
  gerenero_musical: string;
  filmes_tv: string;
  participa_eventos: string;
  gosta_ensinar: string;
  atividades_tecnologicas: string;
  comentarios: string;
  id_cuidador: number;
}

// Serviço para cuidadores
export const cuidadorService = {
  // Listar todos os cuidadores
  listar: async (): Promise<CuidadorResponse[]> => {
    try {
      const response = await api.get('/cuidadores/');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar cuidadores:', error);
      throw error;
    }
  },

  // Buscar cuidador por ID
  buscarPorId: async (id: number): Promise<CuidadorResponse> => {
    try {
      const response = await api.get(`/cuidadores/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar cuidador:', error);
      throw error;
    }
  },

  // Buscar endereço do cuidador
  buscarEndereco: async (idCuidador: number): Promise<EnderecoCuidadorResponse[]> => {
    try {
      const response = await api.get(`/enderecos_cuidador/${idCuidador}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar endereço do cuidador:', error);
      throw error;
    }
  },

  // Buscar questionário do cuidador
  buscarQuestionario: async (idCuidador: number): Promise<QuestionarioCuidadorResponse[]> => {
    try {
      const response = await api.get(`/questionarios_cuidador/${idCuidador}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar questionário do cuidador:', error);
      throw error;
    }
  },

  // Buscar hobbies do cuidador
  buscarHobbies: async (idCuidador: number): Promise<HobbiesCuidadorResponse[]> => {
    try {
      const response = await api.get(`/hobbies_cuidador/${idCuidador}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar hobbies do cuidador:', error);
      throw error;
    }
  },

  // Cadastrar novo cuidador
  cadastrar: async (cuidadorData: CuidadorData) => {
    try {
      // Mapear dados do frontend para o formato do backend
      const dataToSend: any = {
        nome: cuidadorData.nome,
        cpf: cuidadorData.cpf,
        email: cuidadorData.email,
        telefone: cuidadorData.telefone,
        senha: cuidadorData.senha,
        genero: cuidadorData.genero || null,
        data_nascimento: cuidadorData.dataNascimento 
          ? new Date(cuidadorData.dataNascimento).toISOString().split('T')[0]
          : null,
        // Endereço
        estado: cuidadorData.estado || null,
        cidade: cuidadorData.cidade || null,
        endereco: cuidadorData.endereco || null,
        bairro: cuidadorData.bairro || null,
        cep: cuidadorData.cep || null,
        numero: cuidadorData.numero || null,
        complemento: cuidadorData.complemento || null,
        referencia: cuidadorData.referencia || null,
        // Questionário
        formacaoAcademica: cuidadorData.formacaoAcademica || null,
        experienciaProfissional: cuidadorData.experienciaProfissional || null,
        qualidades: cuidadorData.qualidades || null,
        referencias: cuidadorData.referencias || null,
        // Hobbies
        interesses: cuidadorData.interesses || null,
      };
      
      const response = await api.post('/cuidadores/', dataToSend);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar cuidador:', error);
      throw error;
    }
  },
  
  // Atualizar dados do cuidador
  atualizar: async (id: string, cuidadorData: Partial<CuidadorData>) => {
    try {
      const response = await api.put(`/cuidador/${id}`, cuidadorData);
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
      // Mapear dados do frontend para o formato do backend
      const dataToSend: any = {
        nome: contratanteData.nome,
        cpf: contratanteData.cpf,
        email: contratanteData.email,
        telefone: contratanteData.telefone,
        telefone_emergencia: contratanteData.telefone_emergencia || null,
        senha: contratanteData.senha,
        genero: contratanteData.genero || null,
        data_nascimento: contratanteData.data_nascimento 
          ? (typeof contratanteData.data_nascimento === 'string' 
              ? contratanteData.data_nascimento 
              : new Date(contratanteData.data_nascimento).toISOString().split('T')[0])
          : null,
        // Endereço
        estado: contratanteData.estado || null,
        cidade: contratanteData.cidade || null,
        endereco: contratanteData.endereco || null,
        bairro: contratanteData.bairro || null,
        cep: contratanteData.cep || null,
        numero: contratanteData.numero || null,
        complemento: contratanteData.complemento || null,
        referencia: contratanteData.referencia || null,
        // Questionário
        questionario: contratanteData.questionario || null,
        // Hobbies
        hobbies: contratanteData.hobbies || null,
        atividadesFisicas: contratanteData.atividadesFisicas || null,
        atividadesSociais: contratanteData.atividadesSociais || null,
        preferencias: contratanteData.preferencias || null,
      };
      
      const response = await api.post('/contratante/', dataToSend);
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
  login: async (loginData: LoginData): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', loginData);
      return response.data;
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      throw error;
    }
  },
};

export default api;
