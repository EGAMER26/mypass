// components/AccessibilityControls.tsx
'use client';

import React from 'react';
import { useFontSize } from '@/context/FontSizeContext';
import { Minus, Plus } from 'lucide-react'; // Ícones para diminuir/aumentar

export default function FontSizeControl() {
  const { fontSize, setFontSize } = useFontSize();

  const decreaseFontSize = () => {
    if (fontSize === 'large') setFontSize('medium');
    else if (fontSize === 'medium') setFontSize('small');
  };

  const increaseFontSize = () => {
    if (fontSize === 'small') setFontSize('medium');
    else if (fontSize === 'medium') setFontSize('large');
  };

  return (
    <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md rounded-full shadow-lg p-2 flex items-center space-x-2 border border-gray-200 dark:border-zinc-700">
      <button
        onClick={decreaseFontSize}
        disabled={fontSize === 'small'}
        className={`p-1 rounded-full transition-colors ${
          fontSize === 'small'
            ? 'bg-gray-200 text-gray-400 dark:bg-zinc-700 dark:text-zinc-500 cursor-not-allowed'
            : 'bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-800 dark:text-violet-100 dark:hover:bg-violet-700'
        }`}
        aria-label="Diminuir tamanho da fonte"
      >
        <Minus size={20} />
      </button>

      <span className="text-gray-800 dark:text-gray-100 text-sm font-semibold">
        {fontSize === 'small' ? 'Pequena' : fontSize === 'medium' ? 'Normal' : 'Grande'}
      </span>

      <button
        onClick={increaseFontSize}
        disabled={fontSize === 'large'}
        className={`p-1 rounded-full transition-colors ${
          fontSize === 'large'
            ? 'bg-gray-200 text-gray-400 dark:bg-zinc-700 dark:text-zinc-500 cursor-not-allowed'
            : 'bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-800 dark:text-violet-100 dark:hover:bg-violet-700'
        }`}
        aria-label="Aumentar tamanho da fonte"
      >
        <Plus size={20} />
      </button>
    </div>
  );
}