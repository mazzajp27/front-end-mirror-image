import { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface UseDraggableProps {
  initialPosition?: Position;
}

const useDraggable = ({ initialPosition = { x: 0, y: 0 } }: UseDraggableProps = {}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position>(initialPosition);
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });

  // Recupera a posição salva do localStorage
  useEffect(() => {
    const savedPosition = localStorage.getItem('accessibilityMenuPosition');
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    const element = e.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newPosition = {
        x: e.clientX - offset.x,
        y: e.clientY - offset.y
      };

      // Limita a posição dentro da janela
      const maxX = window.innerWidth - 50; // 50 é uma estimativa da largura do botão
      const maxY = window.innerHeight - 50; // 50 é uma estimativa da altura do botão

      newPosition.x = Math.max(0, Math.min(newPosition.x, maxX));
      newPosition.y = Math.max(0, Math.min(newPosition.y, maxY));

      setPosition(newPosition);
      
      // Salva a posição no localStorage
      localStorage.setItem('accessibilityMenuPosition', JSON.stringify(newPosition));
    }
  }, [isDragging, offset]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    position,
    isDragging,
    handleMouseDown
  };
};

export default useDraggable; 