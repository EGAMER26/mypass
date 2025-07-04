"use client";

import { useEffect, useState } from "react";
import UserOptions from "@/components/UserOptions"; // ajuste o caminho conforme sua estrutura
import { LayoutList } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateModals } from "@/store/modules/Modals/actions";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  // Verifica preferência de tema no localStorage ou no sistema
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDarkMode;
    setIsDarkMode(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="fixed top-0 w-full py-2 z-10
      bg-violet-500 dark:bg-violet-600
      text-gray-900 dark:text-gray-100
      px-6 md:px-12 flex justify-between items-center
      border-b border-gray-200 dark:border-gray-700
      transition-colors duration-300
      high-contrast:bg-highContrast-bg high-contrast:text-highContrast-text high-contrast:border-highContrast-border
      ">
      <div className="flex w-16 rounded-full p-2 items-center gap-2 justify-center
        bg-white dark:bg-linear-to-tl cursor-pointer dark:bg-gray-100
        high-contrast:bg-highContrast-bg high-contrast:border-2 high-contrast:border-highContrast-primary
      "
      onClick={() => router.push("/")}>
        <Image
          src={"/assets/logo02.png"} // Ajuste este logo se precisar de uma versão específica para alto contraste
          alt="logo MyPass"
          width={40}
          height={2}
          // Para imagens, você pode considerar ter uma versão monocromática ou com alto contraste
          // high-contrast:filter high-contrast:brightness-0 high-contrast:invert
          // ou ter um src condicional: src={highContrastMode ? "/assets/logo-hc.png" : "/assets/logo02.png"}
        />
        {/* <h1 className="text-xl font-bold">MyPass</h1> */}
      </div>

      <div className="flex items-center gap-4">
        {/* Aqui substituímos o botão de imagem estático por <UserOptions /> */}
        <button
          className="p-2 rounded-full
            bg-gray-200 dark:bg-gray-700
            text-gray-700 dark:text-gray-200
            hover:bg-gray-300 dark:hover:bg-gray-600
            transition-colors duration-300
            high-contrast:bg-highContrast-bg high-contrast:text-highContrast-primary
            high-contrast:border-2 high-contrast:border-highContrast-primary
            high-contrast:hover:bg-highContrast-primary high-contrast:hover:text-highContrast-bg
            "
          aria-label="Suas senhas"
          onClick={() => dispatch(updateModals({ passwords: true }))}
        >
          <LayoutList className="high-contrast:text-highContrast-primary"/>
        </button>
        <UserOptions />

        {/* Botão de toggle de tema */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full
            bg-gray-200 dark:bg-gray-700
            text-gray-700 dark:text-gray-200
            hover:bg-gray-300 dark:hover:bg-gray-600
            transition-colors duration-300
            high-contrast:bg-highContrast-bg high-contrast:text-highContrast-primary
            high-contrast:border-2 high-contrast:border-highContrast-primary
            high-contrast:hover:bg-highContrast-primary high-contrast:hover:text-highContrast-bg
            "
          aria-label={
            isDarkMode ? "Mudar para tema claro" : "Mudar para tema escuro"
          }
        >
          {/* Adicione as classes high-contrast aos SVGs */}
          {isDarkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 high-contrast:text-highContrast-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h1M3 12H2m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 high-contrast:text-highContrast-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;