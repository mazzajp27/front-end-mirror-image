import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  Clock, 
  MessageCircle, 
  HelpCircle, 
  Users, 
  Shield, 
  Heart,
  ArrowLeft,
  CheckCircle,
  Send,
  MapPin,
  Globe
} from 'lucide-react';

const CanalSuportePage: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => {
      setNome('');
      setEmail('');
      setTelefone('');
      setAssunto('');
      setMensagem('');
      setEnviado(false);
    }, 3000);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const suporteOptions = [
    {
      icon: <Phone size={24} className="text-[#0056a4]" />,
      title: "Telefone",
      description: "Fale diretamente com nossa equipe",
      contact: "(61) 99999-9999",
      availability: "Segunda a Sexta, 8h às 18h"
    },
    {
      icon: <Mail size={24} className="text-[#0056a4]" />,
      title: "E-mail",
      description: "Envie sua dúvida por e-mail",
      contact: "suporte@amigocuidador.com",
      availability: "Resposta em até 24h"
    },
    {
      icon: <MessageCircle size={24} className="text-[#0056a4]" />,
      title: "Chat Online",
      description: "Conversa em tempo real",
      contact: "Disponível agora",
      availability: "24h por dia"
    }
  ];

  const faqItems = [
    {
      question: "Como funciona o cadastro de cuidadores?",
      answer: "O cadastro é simples e gratuito. Basta preencher o formulário com seus dados pessoais, especialidades e disponibilidade."
    },
    {
      question: "Quais são os requisitos para ser cuidador?",
      answer: "Ter experiência comprovada, ser maior de 18 anos, ter disponibilidade e principalmente, ter amor pelo cuidado com idosos."
    },
    {
      question: "Como é feita a seleção de cuidadores?",
      answer: "Nossa equipe verifica as credenciais, experiência e realiza entrevistas para garantir a qualidade do serviço."
    },
    {
      question: "Qual o valor dos serviços?",
      answer: "Os valores variam conforme a especialidade e experiência do cuidador, geralmente entre R$ 45 a R$ 60 por hora."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackToHome}
                className="text-[#0056a4] hover:text-[#004483] p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Voltar para página inicial"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Canal de Suporte</h1>
                <p className="text-gray-600 mt-1">Estamos aqui para ajudar você</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img 
                src="/lovable-uploads/ae6d71a7-8de9-40f0-a34b-848a22c94d66.png" 
                alt="Amigo Cuidador Logo" 
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Options */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <HelpCircle size={24} className="text-[#0056a4]" />
                Formas de Contato
              </h2>
              <div className="space-y-4">
                {suporteOptions.map((option, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      {option.icon}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{option.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                        <p className="text-sm font-medium text-[#0056a4]">{option.contact}</p>
                        <p className="text-xs text-gray-500">{option.availability}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users size={24} className="text-[#0056a4]" />
                Perguntas Frequentes
              </h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
                    <p className="text-sm text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageCircle size={24} className="text-[#0056a4]" />
                Envie sua Mensagem
              </h2>
              
              {enviado ? (
                <div className="text-center py-8">
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Mensagem Enviada!</h3>
                  <p className="text-gray-600 mb-4">Nossa equipe entrará em contato em breve.</p>
                  <button
                    onClick={() => setEnviado(false)}
                    className="bg-[#0056a4] text-white px-6 py-2 rounded-lg hover:bg-[#004483] transition-colors"
                  >
                    Enviar Nova Mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome Completo *
                      </label>
                      <input
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:border-transparent"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-mail *
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:border-transparent"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone
                      </label>
                      <input
                        id="telefone"
                        type="tel"
                        value={telefone}
                        onChange={e => setTelefone(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:border-transparent"
                        placeholder="(61) 99999-9999"
                      />
                    </div>
                    <div>
                      <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-1">
                        Assunto *
                      </label>
                      <select
                        id="assunto"
                        value={assunto}
                        onChange={e => setAssunto(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:border-transparent"
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="cadastro">Dúvidas sobre Cadastro</option>
                        <option value="cuidadores">Informações sobre Cuidadores</option>
                        <option value="pagamento">Dúvidas sobre Pagamento</option>
                        <option value="tecnico">Problema Técnico</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensagem *
                    </label>
                    <textarea
                      id="mensagem"
                      value={mensagem}
                      onChange={e => setMensagem(e.target.value)}
                      required
                      rows={5}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:border-transparent"
                      placeholder="Descreva sua dúvida ou solicitação..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0056a4] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#004483] transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Enviar Mensagem
                  </button>
                </form>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-6 bg-gradient-to-r from-[#0056a4] to-[#004483] rounded-lg p-6 text-white">
              <div className="flex items-start gap-4">
                <Heart size={24} className="text-white mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Nossa Missão</h3>
                  <p className="text-sm opacity-90">
                    Conectamos famílias a cuidadores qualificados, proporcionando cuidado, 
                    segurança e bem-estar para nossos idosos. Estamos comprometidos em 
                    oferecer o melhor serviço de cuidado domiciliar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanalSuportePage; 