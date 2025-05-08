
import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService, LoginData } from '../services/api';
import { Button } from './ui/button';

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
      toast.success("Login realizado com sucesso!");
      navigate('/dashboard'); // Redireciona para o dashboard após login
    } catch (error: any) {
      console.error('Erro durante o login:', error);
      toast.error(error.response?.data?.message || "E-mail ou senha incorretos. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#0056a4] mb-2">Amigo Cuidador</h1>
          <p className="text-lg font-medium text-[#0056a4]">CUIDANDO DE QUEM SEMPRE CUIDOU DE VOCÊ</p>
          <div className="mt-6">
            <img 
              src="/lovable-uploads/5a39454b-b30c-4703-9a08-fb4ca441e2b9.png" 
              alt="Amigo Cuidador Logo" 
              className="h-20 mx-auto"
            />
          </div>
          <h2 className="text-2xl font-semibold mt-6 text-[#0056a4]">Login</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
              placeholder="exemplo@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="senha" className="block text-sm font-medium">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="senha"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md pr-10"
                value={formData.senha}
                onChange={handleChange}
              />
              <button 
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Eye className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
          
          <div className="text-sm">
            <a href="/reset-password" className="text-[#0056a4] hover:underline">
              Esqueceu sua Senha?
            </a>
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#0056a4] text-white rounded-full hover:bg-[#004483] transition-colors duration-300 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm">
            Não tem uma conta?{' '}
            <a href="/tipo-cadastro" className="text-[#0056a4] font-bold hover:underline">
              CADASTRAR-SE
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
