import React, { useState, useEffect } from 'react';
import useDraggable from '../hooks/useDraggable';

interface AccessibilityControlsProps {
  position?: 'left' | 'right';
}

const AccessibilityControls: React.FC<AccessibilityControlsProps> = ({ position = 'right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(90);
  const [highContrast, setHighContrast] = useState(false);
  const [showTooltips, setShowTooltips] = useState(false);
  const [dyslexicMode, setDyslexicMode] = useState(false);
  const [colorblindMode, setColorblindMode] = useState<'none' | 'deuteranopia' | 'protanopia' | 'tritanopia'>('none');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [increasedSpacing, setIncreasedSpacing] = useState(false);
  const [largeCursor, setLargeCursor] = useState(false);
  const [readingMode, setReadingMode] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  
  const { position: dragPosition, isDragging, handleMouseDown } = useDraggable();

  // Efeitos para cada configuração
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) document.body.classList.add('high-contrast');
    else document.body.classList.remove('high-contrast');
    localStorage.setItem('highContrast', String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    if (showTooltips) document.body.classList.add('show-tooltips');
    else document.body.classList.remove('show-tooltips');
    localStorage.setItem('showTooltips', String(showTooltips));
  }, [showTooltips]);

  useEffect(() => {
    if (dyslexicMode) document.body.classList.add('dyslexic-mode');
    else document.body.classList.remove('dyslexic-mode');
    localStorage.setItem('dyslexicMode', String(dyslexicMode));
  }, [dyslexicMode]);

  useEffect(() => {
    document.body.classList.remove('deuteranopia', 'protanopia', 'tritanopia');
    if (colorblindMode !== 'none') document.body.classList.add(colorblindMode);
    localStorage.setItem('colorblindMode', colorblindMode);
  }, [colorblindMode]);

  useEffect(() => {
    if (reducedMotion) document.body.classList.add('reduced-motion');
    else document.body.classList.remove('reduced-motion');
    localStorage.setItem('reducedMotion', String(reducedMotion));
  }, [reducedMotion]);

  useEffect(() => {
    if (increasedSpacing) document.body.classList.add('increased-spacing');
    else document.body.classList.remove('increased-spacing');
    localStorage.setItem('increasedSpacing', String(increasedSpacing));
  }, [increasedSpacing]);

  useEffect(() => {
    if (largeCursor) document.body.classList.add('large-cursor');
    else document.body.classList.remove('large-cursor');
    localStorage.setItem('largeCursor', String(largeCursor));
  }, [largeCursor]);

  useEffect(() => {
    if (readingMode) document.body.classList.add('reading-mode');
    else document.body.classList.remove('reading-mode');
    localStorage.setItem('readingMode', String(readingMode));
  }, [readingMode]);

  useEffect(() => {
    if (focusMode) document.body.classList.add('focus-mode');
    else document.body.classList.remove('focus-mode');
    localStorage.setItem('focusMode', String(focusMode));
  }, [focusMode]);

  // Recupera configurações salvas
  useEffect(() => {
    const savedSettings = {
      fontSize: localStorage.getItem('fontSize'),
      highContrast: localStorage.getItem('highContrast'),
      showTooltips: localStorage.getItem('showTooltips'),
      dyslexicMode: localStorage.getItem('dyslexicMode'),
      colorblindMode: localStorage.getItem('colorblindMode'),
      reducedMotion: localStorage.getItem('reducedMotion'),
      increasedSpacing: localStorage.getItem('increasedSpacing'),
      largeCursor: localStorage.getItem('largeCursor'),
      readingMode: localStorage.getItem('readingMode'),
      focusMode: localStorage.getItem('focusMode'),
    };

    if (savedSettings.fontSize) setFontSize(Number(savedSettings.fontSize));
    if (savedSettings.highContrast) setHighContrast(savedSettings.highContrast === 'true');
    if (savedSettings.showTooltips) setShowTooltips(savedSettings.showTooltips === 'true');
    if (savedSettings.dyslexicMode) setDyslexicMode(savedSettings.dyslexicMode === 'true');
    if (savedSettings.colorblindMode) setColorblindMode(savedSettings.colorblindMode as any);
    if (savedSettings.reducedMotion) setReducedMotion(savedSettings.reducedMotion === 'true');
    if (savedSettings.increasedSpacing) setIncreasedSpacing(savedSettings.increasedSpacing === 'true');
    if (savedSettings.largeCursor) setLargeCursor(savedSettings.largeCursor === 'true');
    if (savedSettings.readingMode) setReadingMode(savedSettings.readingMode === 'true');
    if (savedSettings.focusMode) setFocusMode(savedSettings.focusMode === 'true');
  }, []);

  const increaseFontSize = () => {
    if (fontSize < 150) setFontSize(prev => prev + 10);
  };

  const decreaseFontSize = () => {
    if (fontSize > 80) setFontSize(prev => prev - 10);
  };

  const resetFontSize = () => {
    setFontSize(90);
  };

  return (
    <>
      {/* SVG Filters para Daltonismo */}
      <svg className="color-filters">
        <defs>
          <filter id="deuteranopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.625 0.375 0 0 0
                      0.7 0.3 0 0 0
                      0 0.3 0.7 0 0
                      0 0 0 1 0"
            />
          </filter>
          <filter id="protanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.567 0.433 0 0 0
                      0.558 0.442 0 0 0
                      0 0.242 0.758 0 0
                      0 0 0 1 0"
            />
          </filter>
          <filter id="tritanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.95 0.05 0 0 0
                      0 0.433 0.567 0 0
                      0 0.475 0.525 0 0
                      0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>

      {/* Botão fixo */}
      <div 
        className={`fixed ${position === 'right' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 z-50`}
        role="region"
        aria-label="Controles de acessibilidade"
      >
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="bg-[#0056a4] text-white p-4 rounded-full shadow-lg hover:bg-[#004483] transition-colors"
          aria-expanded={isOpen}
          aria-label="Abrir menu de acessibilidade"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"></path>
            <path d="M12 11v6"></path>
            <path d="M9 14h6"></path>
          </svg>
        </button>
      </div>

      {/* Menu arrastável */}
      {isOpen && (
        <div 
          className="fixed z-50 bg-white rounded-lg shadow-xl"
          style={{
            left: dragPosition.x,
            top: dragPosition.y,
            width: '20rem'
          }}
        >
          <div
            onMouseDown={handleMouseDown}
            className="bg-[#0056a4] text-white p-2 rounded-t-lg flex items-center justify-between cursor-grab active:cursor-grabbing"
          >
            <span className="text-sm font-medium">Menu de Acessibilidade</span>
            <span className="text-xs">(Arraste aqui)</span>
          </div>

          <div className="p-4 border border-gray-200 rounded-b-lg max-h-[80vh] overflow-y-auto">
            <div className="space-y-4">
              {/* Controle de Fonte */}
              <div className="border-b pb-4">
                <h3 className="text-base font-medium mb-2">Tamanho da Fonte</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={decreaseFontSize}
                    className="bg-gray-100 p-2 rounded hover:bg-gray-200 transition-colors"
                    aria-label="Diminuir tamanho da fonte"
                    disabled={fontSize <= 80}
                  >
                    A-
                  </button>
                  <button
                    onClick={resetFontSize}
                    className="bg-gray-100 p-2 rounded hover:bg-gray-200 transition-colors"
                    aria-label="Restaurar tamanho padrão da fonte"
                  >
                    A
                  </button>
                  <button
                    onClick={increaseFontSize}
                    className="bg-gray-100 p-2 rounded hover:bg-gray-200 transition-colors"
                    aria-label="Aumentar tamanho da fonte"
                    disabled={fontSize >= 150}
                  >
                    A+
                  </button>
                  <span className="ml-2 text-sm text-gray-600">{fontSize}%</span>
                </div>
              </div>

              {/* Alto Contraste */}
              <div className="border-b pb-4">
                <h3 className="text-base font-medium mb-2">Alto Contraste</h3>
                <button
                  onClick={() => setHighContrast(prev => !prev)}
                  className={`w-full p-2 rounded transition-colors ${
                    highContrast 
                      ? 'bg-[#0056a4] text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  aria-pressed={highContrast}
                >
                  {highContrast ? 'Desativar' : 'Ativar'} Alto Contraste
                </button>
              </div>

              {/* Modo Dislexia */}
              <div className="border-b pb-4">
                <h3 className="text-base font-medium mb-2">Modo Dislexia</h3>
                <button
                  onClick={() => setDyslexicMode(prev => !prev)}
                  className={`w-full p-2 rounded transition-colors ${
                    dyslexicMode 
                      ? 'bg-[#0056a4] text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  aria-pressed={dyslexicMode}
                >
                  {dyslexicMode ? 'Desativar' : 'Ativar'} Modo Dislexia
                </button>
              </div>

              {/* Modo Daltonismo */}
              <div className="border-b pb-4">
                <h3 className="text-base font-medium mb-2">Modo Daltonismo</h3>
                <select
                  value={colorblindMode}
                  onChange={(e) => setColorblindMode(e.target.value as any)}
                  className="w-full p-2 rounded border border-gray-300"
                >
                  <option value="none">Desativado</option>
                  <option value="deuteranopia">Deuteranopia</option>
                  <option value="protanopia">Protanopia</option>
                  <option value="tritanopia">Tritanopia</option>
                </select>
              </div>

              {/* Redução de Movimento */}
              <div className="border-b pb-4">
                <h3 className="text-base font-medium mb-2">Redução de Movimento</h3>
                <button
                  onClick={() => setReducedMotion(prev => !prev)}
                  className={`w-full p-2 rounded transition-colors ${
                    reducedMotion 
                      ? 'bg-[#0056a4] text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  aria-pressed={reducedMotion}
                >
                  {reducedMotion ? 'Desativar' : 'Ativar'} Redução de Movimento
                </button>
              </div>

              {/* Espaçamento de Texto */}
              <div className="border-b pb-4">
                <h3 className="text-base font-medium mb-2">Espaçamento de Texto</h3>
                <button
                  onClick={() => setIncreasedSpacing(prev => !prev)}
                  className={`w-full p-2 rounded transition-colors ${
                    increasedSpacing 
                      ? 'bg-[#0056a4] text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  aria-pressed={increasedSpacing}
                >
                  {increasedSpacing ? 'Desativar' : 'Ativar'} Espaçamento Aumentado
                </button>
              </div>

              {/* Cursor Grande */}
              <div className="border-b pb-4">
                <h3 className="text-base font-medium mb-2">Cursor Grande</h3>
                <button
                  onClick={() => setLargeCursor(prev => !prev)}
                  className={`w-full p-2 rounded transition-colors ${
                    largeCursor 
                      ? 'bg-[#0056a4] text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  aria-pressed={largeCursor}
                >
                  {largeCursor ? 'Desativar' : 'Ativar'} Cursor Grande
                </button>
              </div>

              {/* Modo Leitura */}
              <div className="border-b pb-4">
                <h3 className="text-base font-medium mb-2">Modo Leitura</h3>
                <button
                  onClick={() => setReadingMode(prev => !prev)}
                  className={`w-full p-2 rounded transition-colors ${
                    readingMode 
                      ? 'bg-[#0056a4] text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  aria-pressed={readingMode}
                >
                  {readingMode ? 'Desativar' : 'Ativar'} Modo Leitura
                </button>
              </div>

              {/* Modo Foco */}
              <div className="border-b pb-4">
                <h3 className="text-base font-medium mb-2">Modo Foco</h3>
                <button
                  onClick={() => setFocusMode(prev => !prev)}
                  className={`w-full p-2 rounded transition-colors ${
                    focusMode 
                      ? 'bg-[#0056a4] text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  aria-pressed={focusMode}
                >
                  {focusMode ? 'Desativar' : 'Ativar'} Modo Foco
                </button>
              </div>

              {/* Dicas de Navegação */}
              <div>
                <h3 className="text-base font-medium mb-2">Dicas de Navegação</h3>
                <button
                  onClick={() => setShowTooltips(prev => !prev)}
                  className={`w-full p-2 rounded transition-colors ${
                    showTooltips 
                      ? 'bg-[#0056a4] text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  aria-pressed={showTooltips}
                >
                  {showTooltips ? 'Ocultar' : 'Mostrar'} Dicas
                </button>
              </div>

              {/* Atalhos de Teclado */}
              <div className="mt-4 text-sm text-gray-600">
                <h3 className="font-medium mb-1">Atalhos de Teclado:</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Tab: Navegar entre elementos</li>
                  <li>Enter/Space: Selecionar/Ativar</li>
                  <li>Esc: Fechar menus</li>
                  <li>Alt + 1: Ir para o início</li>
                  <li>Alt + 2: Ir para serviços</li>
                  <li>Alt + A: Abrir menu de acessibilidade</li>
                  <li>Alt + C: Ir para contato</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityControls; 