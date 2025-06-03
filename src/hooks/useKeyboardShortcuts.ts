import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useKeyboardShortcuts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Verifica se Alt está pressionado
      if (event.altKey) {
        switch (event.key) {
          case '1':
            navigate('/');
            break;
          case '2':
            navigate('/servicos');
            break;
          case '3':
            navigate('/sobre-nos');
            break;
          case '4':
            navigate('/avaliacoes');
            break;
          case 'c':
            navigate('/contato');
            break;
          case 'a':
            // Foca no menu de acessibilidade
            const accessibilityButton = document.querySelector('[aria-label="Abrir menu de acessibilidade"]');
            if (accessibilityButton instanceof HTMLElement) {
              accessibilityButton.focus();
              accessibilityButton.click();
            }
            break;
          case 'm':
            // Foca no conteúdo principal
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
              mainContent.focus();
            }
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);
};

export default useKeyboardShortcuts; 