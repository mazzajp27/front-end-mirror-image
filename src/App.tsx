
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import LoginForm from "./components/LoginForm";
import TipoCadastro from "./components/TipoCadastro";
import CuidadorForm from "./components/cuidador/CuidadorForm";
import IdosoForm from "./components/idoso/IdosoForm";
import HomePage from "./pages/HomePage";
import ServicosPage from "./pages/ServicosPage";
import AvaliacoesPage from "./pages/AvaliacoesPage";
import SobreNosPage from "./pages/SobreNosPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/tipo-cadastro" element={<TipoCadastro />} />
          <Route path="/cadastro/cuidador" element={<CuidadorForm />} />
          <Route path="/cadastro/idoso" element={<IdosoForm />} />
          <Route path="/servicos" element={<ServicosPage />} />
          <Route path="/avaliacoes" element={<AvaliacoesPage />} />
          <Route path="/sobre-nos" element={<SobreNosPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
