import React, { useState, useEffect } from 'react';
import ColorblindFilters from './ColorblindFilters';

interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'extra-large';
  contrast: 'normal' | 'high' | 'dark';
  spacing: 'normal' | 'wide' | 'wider';
  reduceMotion: boolean;
  dyslexicFont: boolean;
  cursorSize: 'normal' | 'large';
  screenReader: boolean;
  highlightLinks: boolean;
  highlightFocus: boolean;
  colorblindMode: 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';
  navigationAssist: boolean;
  keyboardNavigation: boolean;
}

const AccessibilityMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const savedSettings = localStorage.getItem('accessibility-settings');
    return savedSettings ? JSON.parse(savedSettings) : {
      fontSize: 'normal',
      contrast: 'normal',
      spacing: 'normal',
      reduceMotion: false,
      dyslexicFont: false,
      cursorSize: 'normal',
      screenReader: false,
      highlightLinks: false,
      highlightFocus: true,
      colorblindMode: 'normal',
      navigationAssist: false,
      keyboardNavigation: false,
    };
  });

  // Efeito para gerenciar navegação por teclado
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!settings.keyboardNavigation) return;

      if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
          
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (settings.keyboardNavigation) {
      window.addEventListener('keydown', handleKeyPress);
      document.documentElement.setAttribute('data-keyboard-nav', 'true');
    } else {
      document.documentElement.removeAttribute('data-keyboard-nav');
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [settings.keyboardNavigation]);

  // Efeito para aplicar configurações
  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));

    // Remover classes existentes
    document.documentElement.classList.remove(
      'text-normal', 'text-large', 'text-extra-large',
      'contrast-normal', 'contrast-high', 'contrast-dark',
      'spacing-normal', 'spacing-wide', 'spacing-wider',
      'cursor-normal', 'cursor-large',
      'highlight-links', 'highlight-focus',
      'colorblind-normal', 'colorblind-protanopia', 'colorblind-deuteranopia',
      'colorblind-tritanopia', 'colorblind-achromatopsia',
      'navigation-assist'
    );

    // Aplicar configurações
    document.documentElement.classList.add(`text-${settings.fontSize}`);
    document.documentElement.classList.add(`contrast-${settings.contrast}`);
    document.documentElement.classList.add(`spacing-${settings.spacing}`);
    document.documentElement.classList.add(`cursor-${settings.cursorSize}`);
    document.documentElement.classList.add(`colorblind-${settings.colorblindMode}`);
    
    if (settings.dyslexicFont) {
      document.documentElement.classList.add('font-dyslexic');
    }
    if (settings.reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
    }
    if (settings.highlightLinks) {
      document.documentElement.classList.add('highlight-links');
    }
    if (settings.highlightFocus) {
      document.documentElement.classList.add('highlight-focus');
    }
    if (settings.navigationAssist) {
      document.documentElement.classList.add('navigation-assist');
    }

    // Configurar atributos ARIA
    if (settings.screenReader) {
      document.documentElement.setAttribute('role', 'application');
      document.querySelectorAll('button, a, input, select').forEach(element => {
        if (!element.getAttribute('aria-label')) {
          element.setAttribute('aria-label', element.textContent || '');
        }
      });
    } else {
      document.documentElement.removeAttribute('role');
    }

    // Adicionar indicadores de navegação se necessário
    if (settings.navigationAssist) {
      document.querySelectorAll('a, button, input, select').forEach(element => {
        if (!element.querySelector('.navigation-indicator')) {
          const indicator = document.createElement('span');
          indicator.className = 'navigation-indicator';
          indicator.textContent = element.tagName === 'A' ? '🔗' : '👆';
          element.appendChild(indicator);
        }
      });
    } else {
      document.querySelectorAll('.navigation-indicator').forEach(element => {
        element.remove();
      });
    }
  }, [settings]);

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings({
      fontSize: 'normal',
      contrast: 'normal',
      spacing: 'normal',
      reduceMotion: false,
      dyslexicFont: false,
      cursorSize: 'normal',
      screenReader: false,
      highlightLinks: false,
      highlightFocus: true,
      colorblindMode: 'normal',
      navigationAssist: false,
      keyboardNavigation: false,
    });
  };

  return (
    <>
      <ColorblindFilters />
      <div className="fixed left-4 top-1/4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#0056a4] text-white p-3 rounded-full shadow-lg hover:bg-[#004483] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0056a4]"
          aria-expanded={isOpen}
          aria-label="Menu de Acessibilidade"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2Z"></path>
            <path d="M12 5v.01"></path>
            <path d="M12 19v.01"></path>
            <path d="M5 12h.01"></path>
            <path d="M19 12h.01"></path>
          </svg>
        </button>

        {isOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <div 
              className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              role="dialog"
              aria-label="Opções de Acessibilidade"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Configurações de Acessibilidade</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Fechar menu de acessibilidade"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Seção de Visualização */}
                <section className="border-b pb-6">
                  <h3 className="text-lg font-semibold mb-4">Visualização</h3>
                  
                  <div className="space-y-4">
                    {/* Tamanho da Fonte */}
                    <div>
                      <label className="block text-gray-700 mb-2">Tamanho do Texto</label>
                      <div className="flex gap-2">
                        {['normal', 'large', 'extra-large'].map((size) => (
                          <button
                            key={size}
                            onClick={() => updateSetting('fontSize', size)}
                            className={`px-4 py-2 rounded-lg ${
                              settings.fontSize === size
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            aria-pressed={settings.fontSize === size}
                          >
                            {size === 'normal' ? 'Normal' : size === 'large' ? 'Grande' : 'Extra Grande'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Contraste */}
                    <div>
                      <label className="block text-gray-700 mb-2">Contraste</label>
                      <div className="flex gap-2">
                        {['normal', 'high', 'dark'].map((contrast) => (
                          <button
                            key={contrast}
                            onClick={() => updateSetting('contrast', contrast)}
                            className={`px-4 py-2 rounded-lg ${
                              settings.contrast === contrast
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            aria-pressed={settings.contrast === contrast}
                          >
                            {contrast === 'normal' ? 'Normal' : 
                             contrast === 'high' ? 'Alto Contraste' : 'Modo Escuro'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Cursor */}
                    <div>
                      <label className="block text-gray-700 mb-2">Tamanho do Cursor</label>
                      <div className="flex gap-2">
                        {['normal', 'large'].map((size) => (
                          <button
                            key={size}
                            onClick={() => updateSetting('cursorSize', size)}
                            className={`px-4 py-2 rounded-lg ${
                              settings.cursorSize === size
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            aria-pressed={settings.cursorSize === size}
                          >
                            {size === 'normal' ? 'Normal' : 'Grande'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Modo Daltônico */}
                    <div>
                      <label className="block text-gray-700 mb-2">Modo Daltônico</label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { value: 'normal', label: 'Normal' },
                          { value: 'protanopia', label: 'Protanopia' },
                          { value: 'deuteranopia', label: 'Deuteranopia' },
                          { value: 'tritanopia', label: 'Tritanopia' },
                          { value: 'achromatopsia', label: 'Achromatopsia' }
                        ].map((mode) => (
                          <button
                            key={mode.value}
                            onClick={() => updateSetting('colorblindMode', mode.value)}
                            className={`px-4 py-2 rounded-lg ${
                              settings.colorblindMode === mode.value
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            aria-pressed={settings.colorblindMode === mode.value}
                          >
                            {mode.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Seção de Navegação */}
                <section className="border-b pb-6">
                  <h3 className="text-lg font-semibold mb-4">Navegação</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label htmlFor="navigationAssist" className="text-gray-700">
                        Assistente de Navegação
                        <p className="text-sm text-gray-500">Adiciona indicadores visuais para elementos interativos</p>
                      </label>
                      <div className="relative inline-block w-12 h-6">
                        <input
                          type="checkbox"
                          id="navigationAssist"
                          className="sr-only"
                          checked={settings.navigationAssist}
                          onChange={(e) => updateSetting('navigationAssist', e.target.checked)}
                        />
                        <div
                          className={`block w-12 h-6 rounded-full transition-colors ${
                            settings.navigationAssist ? 'bg-black' : 'bg-gray-300'
                          }`}
                        />
                        <div
                          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                            settings.navigationAssist ? 'transform translate-x-6' : ''
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label htmlFor="keyboardNavigation" className="text-gray-700">
                        Navegação por Teclado
                        <p className="text-sm text-gray-500">Permite navegar usando apenas o teclado</p>
                      </label>
                      <div className="relative inline-block w-12 h-6">
                        <input
                          type="checkbox"
                          id="keyboardNavigation"
                          className="sr-only"
                          checked={settings.keyboardNavigation}
                          onChange={(e) => updateSetting('keyboardNavigation', e.target.checked)}
                        />
                        <div
                          className={`block w-12 h-6 rounded-full transition-colors ${
                            settings.keyboardNavigation ? 'bg-black' : 'bg-gray-300'
                          }`}
                        />
                        <div
                          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                            settings.keyboardNavigation ? 'transform translate-x-6' : ''
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label htmlFor="highlightLinks" className="text-gray-700">
                        Destacar Links
                      </label>
                      <div className="relative inline-block w-12 h-6">
                        <input
                          type="checkbox"
                          id="highlightLinks"
                          className="sr-only"
                          checked={settings.highlightLinks}
                          onChange={(e) => updateSetting('highlightLinks', e.target.checked)}
                        />
                        <div
                          className={`block w-12 h-6 rounded-full transition-colors ${
                            settings.highlightLinks ? 'bg-black' : 'bg-gray-300'
                          }`}
                        />
                        <div
                          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                            settings.highlightLinks ? 'transform translate-x-6' : ''
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label htmlFor="highlightFocus" className="text-gray-700">
                        Destacar Foco
                      </label>
                      <div className="relative inline-block w-12 h-6">
                        <input
                          type="checkbox"
                          id="highlightFocus"
                          className="sr-only"
                          checked={settings.highlightFocus}
                          onChange={(e) => updateSetting('highlightFocus', e.target.checked)}
                        />
                        <div
                          className={`block w-12 h-6 rounded-full transition-colors ${
                            settings.highlightFocus ? 'bg-black' : 'bg-gray-300'
                          }`}
                        />
                        <div
                          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                            settings.highlightFocus ? 'transform translate-x-6' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Seção de Assistência */}
                <section className="border-b pb-6">
                  <h3 className="text-lg font-semibold mb-4">Assistência</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label htmlFor="screenReader" className="text-gray-700">
                        Modo Leitor de Tela
                      </label>
                      <div className="relative inline-block w-12 h-6">
                        <input
                          type="checkbox"
                          id="screenReader"
                          className="sr-only"
                          checked={settings.screenReader}
                          onChange={(e) => updateSetting('screenReader', e.target.checked)}
                        />
                        <div
                          className={`block w-12 h-6 rounded-full transition-colors ${
                            settings.screenReader ? 'bg-black' : 'bg-gray-300'
                          }`}
                        />
                        <div
                          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                            settings.screenReader ? 'transform translate-x-6' : ''
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label htmlFor="dyslexicFont" className="text-gray-700">
                        Fonte para Dislexia
                      </label>
                      <div className="relative inline-block w-12 h-6">
                        <input
                          type="checkbox"
                          id="dyslexicFont"
                          className="sr-only"
                          checked={settings.dyslexicFont}
                          onChange={(e) => updateSetting('dyslexicFont', e.target.checked)}
                        />
                        <div
                          className={`block w-12 h-6 rounded-full transition-colors ${
                            settings.dyslexicFont ? 'bg-black' : 'bg-gray-300'
                          }`}
                        />
                        <div
                          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                            settings.dyslexicFont ? 'transform translate-x-6' : ''
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label htmlFor="reduceMotion" className="text-gray-700">
                        Reduzir Animações
                      </label>
                      <div className="relative inline-block w-12 h-6">
                        <input
                          type="checkbox"
                          id="reduceMotion"
                          className="sr-only"
                          checked={settings.reduceMotion}
                          onChange={(e) => updateSetting('reduceMotion', e.target.checked)}
                        />
                        <div
                          className={`block w-12 h-6 rounded-full transition-colors ${
                            settings.reduceMotion ? 'bg-black' : 'bg-gray-300'
                          }`}
                        />
                        <div
                          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                            settings.reduceMotion ? 'transform translate-x-6' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Botões de Ação */}
                <div className="flex justify-between pt-4">
                  <button
                    onClick={resetSettings}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded"
                  >
                    Restaurar Padrões
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Concluído
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AccessibilityMenu; 