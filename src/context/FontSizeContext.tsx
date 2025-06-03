// context/FontSizeContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type FontSize = 'small' | 'medium' | 'large';

interface FontSizeContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export const FontSizeProvider = ({ children }: { children: ReactNode }) => {
  // Inicializa o estado lendo do localStorage, se houver
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('fontSizePreference') as FontSize) || 'medium';
    }
    return 'medium';
  });

  // Salva a preferência no localStorage sempre que fontSize muda
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fontSizePreference', fontSize);
    }
    // Aplica a classe CSS correspondente ao body/html
    document.documentElement.classList.remove('font-size-small', 'font-size-medium', 'font-size-large');
    document.documentElement.classList.add(`font-size-${fontSize}`);
  }, [fontSize]);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (context === undefined) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
};