// tailwind.config.js (ou tailwind.config.ts)

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Mantenha isso para o dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Suas cores existentes (incluindo as para o dark mode)
        // ... exemplo:
        // 'primary': '#whatever',
        // 'secondary': '#whatever',

        // Cores específicas para o modo de alto contraste
        // Estas são as cores que você usará com as classes 'high-contrast:'
        highContrast: {
          bg: "var(--color-high-contrast-bg)",       // Fundo (ex: preto)
          text: "var(--color-high-contrast-text)",     // Texto (ex: branco)
          primary: "var(--color-high-contrast-primary)", // Cor de destaque (ex: amarelo vibrante)
          // Adicione outras cores conforme necessário para botões, bordas, etc.
          border: "var(--color-high-contrast-border)", // Exemplo para bordas
        },
      },
      // ... outras extensões de tema (fontes, espaçamento, etc.)
    },
  },
  plugins: [],
};