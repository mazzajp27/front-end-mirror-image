import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ServicosPage from './pages/ServicosPage';
import SobreNosPage from './pages/SobreNosPage';
import AvaliacoesPage from './pages/AvaliacoesPage';
import LoginForm from './components/LoginForm';
import TipoCadastro from './components/TipoCadastro';
import CuidadorForm from './components/cuidador/CuidadorForm';
import IdosoForm from './components/idoso/IdosoForm';
import AccessibilityControls from './components/AccessibilityControls';
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts';
import './styles/accessibility.css';

const AppContent: React.FC = () => {
  // Hook de atalhos de teclado
  useKeyboardShortcuts();

  return (
    <>
      {/* Skip Link para acessibilidade */}
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>

      {/* Controles de Acessibilidade */}
      <AccessibilityControls position="right" />

      <div id="main-content" role="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicos" element={<ServicosPage />} />
          <Route path="/sobre-nos" element={<SobreNosPage />} />
          <Route path="/avaliacoes" element={<AvaliacoesPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/cadastro" element={<TipoCadastro />} />
          <Route path="/cadastro/cuidador" element={<CuidadorForm />} />
          <Route path="/cadastro/idoso" element={<IdosoForm />} />
        </Routes>
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
