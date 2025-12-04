
import React, { useState } from 'react';
import { Eye, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService, LoginData } from '../services/api';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    senha: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.senha) {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await authService.login(formData);
      localStorage.setItem('token', response.token);
      localStorage.setItem('userType', response.tipo_usuario);
      localStorage.setItem('userId', response.id.toString());
      localStorage.setItem('userName', response.nome);
      
      // Dispara evento customizado para atualizar o Header
      window.dispatchEvent(new Event('auth-change'));
      
      toast.success("Login realizado com sucesso!");
      
      // Redireciona baseado no tipo de usuário
      if (response.tipo_usuario === 'contratante') {
        navigate('/cuidadores'); // Contratantes veem cuidadores disponíveis
      } else if (response.tipo_usuario === 'cuidador') {
        navigate('/'); // Cuidadores vão para a página inicial
      } else {
        navigate('/'); // Fallback para página inicial
      }
    } catch (error: any) {
      console.error('Erro durante o login:', error);
      toast.error(error.response?.data?.message || "E-mail ou senha incorretos. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        {/* Botão Voltar */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-[#0056a4] hover:text-[#004483] transition-colors text-sm font-medium"
        >
          <ArrowLeft size={18} />
          Voltar para a página inicial
        </button>

        {/* Card Principal */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
          {/* Logo e Título */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <img 
                src="/lovable-uploads/ae6d71a7-8de9-40f0-a34b-848a22c94d66.png" 
                alt="Amigo Cuidador Logo" 
                className="h-24 mx-auto"
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Bem-vindo de volta
            </h1>
            <p className="text-gray-600 text-sm">
              Entre com suas credenciais para continuar
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo E-mail */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  id="email"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:border-transparent transition-all placeholder:text-gray-400"
                  placeholder="exemplo@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            {/* Campo Senha */}
            <div className="space-y-2">
              <label htmlFor="senha" className="block text-sm font-semibold text-gray-700">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="senha"
                  className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:border-transparent transition-all placeholder:text-gray-400"
                  placeholder="Digite sua senha"
                  value={formData.senha}
                  onChange={handleChange}
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:opacity-70 transition-opacity"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  <Eye className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            {/* Link Esqueceu Senha */}
            <div className="flex justify-end">
              <a 
                href="/reset-password" 
                className="text-sm text-[#0056a4] hover:text-[#004483] font-medium transition-colors"
              >
                Esqueceu sua senha?
              </a>
            </div>
            
            {/* Botão Entrar */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#0056a4] text-white rounded-lg hover:bg-[#004483] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Entrando...
                  </span>
                ) : (
                  'Entrar'
                )}
              </button>
            </div>
          </form>
          
          {/* Divisor */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">ou</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>
          
          {/* Link Cadastro */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{' '}
              <a 
                href="/tipo-cadastro" 
                className="text-[#0056a4] font-bold hover:text-[#004483] transition-colors hover:underline"
              >
                Cadastre-se
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
