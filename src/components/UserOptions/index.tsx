"use client";

import { Menu } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, User, Settings, Text, Contrast } from "lucide-react"; // Importe 'Contrast' aqui!
import { signOut, useSession } from "next-auth/react";
import { updateModals } from "@/store/modules/Modals/actions";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react"; // Importe useEffect
import FontSizeControl from "../FontSizeControl";

export default function UserOptions() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showFontSizeControl, setShowFontSizeControl] = useState(false);
  const [highContrastMode, setHighContrastMode] = useState(false); // Novo estado para alto contraste

  // --- Lógica de Alto Contraste (Copiada da resposta anterior) ---
  // Recupera o estado do localStorage na montagem
  useEffect(() => {
    const savedContrastMode = localStorage.getItem("high-contrast-mode");
    if (savedContrastMode === "enabled") {
      setHighContrastMode(true);
      document.documentElement.classList.add("high-contrast-mode");
    }
  }, []);

  // Nova função para alternar o modo de alto contraste
  const toggleHighContrastMode = () => {
    setHighContrastMode((prev) => {
      const newState = !prev;
      if (newState) {
        document.documentElement.classList.add("high-contrast-mode");
        localStorage.setItem("high-contrast-mode", "enabled");
      } else {
        document.documentElement.classList.remove("high-contrast-mode");
        localStorage.setItem("high-contrast-mode", "disabled");
      }
      return newState;
    });
  };
  // --- Fim da Lógica de Alto Contraste ---

  const toggleAccessibility = () => {
    setShowAccessibility((prev) => !prev);
    setShowFontSizeControl(false);
  };

  const toggleFontSizeControl = () => {
    setShowFontSizeControl((prev) => !prev);
  };

  const accessibilityItems = [
    {
      name: "Acessibilidade",
      icon: Settings,
      onClick: toggleAccessibility,
      submenu: [
        {
          name: "Modo Alto Contraste",
          icon: Contrast, // Use o ícone Contrast
          onClick: toggleHighContrastMode, // Chama a nova função
        },
        {
          name: "Fonte Maior",
          icon: Text,
          onClick: toggleFontSizeControl,
          submenu: <FontSizeControl />,
        },
      ],
    },
  ];

  const userMenuItems = [
    {
      name: "Perfil",
      icon: User,
      onClick: () => dispatch(updateModals({ profile: true })),
    },
    {
      name: "Sair",
      icon: LogOut,
      onClick: () => signOut(),
    },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button
            className="flex items-center p-1 rounded-full
              bg-gray-200 dark:bg-gray-700
              hover:ring-2 hover:ring-violet-500
              transition focus:outline-none
              high-contrast:bg-highContrast-bg high-contrast:border-2 high-contrast:border-highContrast-primary high-contrast:ring-0
              high-contrast:hover:bg-highContrast-primary high-contrast:hover:text-highContrast-bg
            "
          >
            <img
              src={session?.user?.image ?? "/assets/noUser.png"}
              width={32}
              height={32}
              className="rounded-full"
              alt="Ícone do usuário"
            />
          </Menu.Button>

          <AnimatePresence>
            {open && (
              <Menu.Items
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 mt-2 w-60 origin-top-right rounded-xl
                  bg-white/10 dark:bg-zinc-200/10 backdrop-blur-md
                  border border-white/30 shadow-lg ring-1 ring-black/5
                  focus:outline-none z-50 px-1 py-1
                  high-contrast:bg-highContrast-bg high-contrast:border-highContrast-border high-contrast:shadow-none high-contrast:ring-0
                "
              >
                <div>
                  {/* Always render Accessibility options */}
                  {accessibilityItems.map(({ name, icon: Icon, onClick, submenu }) => (
                    <div key={name} className="relative">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={(e) => {
                              if (submenu) {
                                e.preventDefault();
                                onClick();
                              } else {
                                onClick();
                              }
                            }}
                            className={`${active ? "bg-violet-200/20 dark:bg-violet-600/20" : ""}
                              flex w-full items-center px-4 py-2 text-sm
                              text-white dark:text-gray-200
                              gap-2 transition rounded-md
                              high-contrast:text-highContrast-text
                              ${active ? "high-contrast:bg-highContrast-primary high-contrast:text-highContrast-bg" : "high-contrast:bg-highContrast-bg"}
                              `}
                          >
                            <Icon className="w-5 h-5 text-violet-400 high-contrast:text-highContrast-primary" />
                            <span className="text-gray-700 dark:text-gray-300 font-medium high-contrast:text-highContrast-text">
                              {name}
                              {/* Adicione um indicador visual se o alto contraste estiver ativo */}
                              {name === "Modo Alto Contraste" && highContrastMode && (
                                <span className="ml-2 text-green-500 text-xs high-contrast:text-highContrast-primary">(Ativo)</span>
                              )}
                            </span>
                          </button>
                        )}
                      </Menu.Item>

                      {submenu && (
                        <AnimatePresence>
                          {showAccessibility && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 mt-1 border-l border-white/10 pl-4 high-contrast:border-l high-contrast:border-highContrast-border"
                            >
                              {submenu.map(
                                ({ name: subName, icon: SubIcon, onClick, submenu: subSubmenu }) => (
                                  <div key={subName} className="relative">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          onClick={(e) => {
                                            if (subSubmenu) {
                                              e.preventDefault();
                                              onClick();
                                            } else {
                                              onClick();
                                            }
                                          }}
                                          className={`${active ? "bg-violet-200/20 dark:bg-violet-600/20" : ""}
                                            flex w-full items-center px-4 py-2 text-sm
                                            text-white dark:text-gray-200
                                            gap-2 transition rounded-md
                                            high-contrast:text-highContrast-text
                                            ${active ? "high-contrast:bg-highContrast-primary high-contrast:text-highContrast-bg" : "high-contrast:bg-highContrast-bg"}
                                            `}
                                        >
                                          <SubIcon className="w-4 h-4 text-violet-300 high-contrast:text-highContrast-primary" />
                                          <span className="text-gray-600 dark:text-gray-200 high-contrast:text-highContrast-text">
                                            {subName}
                                            {/* Adicione o indicador para Alto Contraste aqui também */}
                                            {subName === "Modo Alto Contraste" && highContrastMode && (
                                              <span className="ml-2 text-green-500 text-xs high-contrast:text-highContrast-primary">(Ativo)</span>
                                            )}
                                          </span>
                                        </button>
                                      )}
                                    </Menu.Item>

                                    {subSubmenu && showFontSizeControl && (
                                      <AnimatePresence>
                                        <motion.div
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          exit={{ opacity: 0, x: -10 }}
                                          transition={{ duration: 0.2 }}
                                          className="ml-6 mt-1 border-l border-white/10 pl-4 high-contrast:border-l high-contrast:border-highContrast-border"
                                        >
                                          {subSubmenu}
                                        </motion.div>
                                      </AnimatePresence>
                                    )}
                                  </div>
                                )
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  ))}

                  {/* Render user-specific options or login button */}
                  {session ? (
                    userMenuItems.map(({ name, icon: Icon, onClick }) => (
                      <div key={name} className="relative">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={onClick}
                              className={`${active ? "bg-violet-200/20 dark:bg-violet-600/20" : ""}
                                flex w-full items-center px-4 py-2 text-sm
                                text-white dark:text-gray-200
                                gap-2 transition rounded-md
                                high-contrast:text-highContrast-text
                                ${active ? "high-contrast:bg-highContrast-primary high-contrast:text-highContrast-bg" : "high-contrast:bg-highContrast-bg"}
                                `}
                            >
                              <Icon className="w-5 h-5 text-violet-400 high-contrast:text-highContrast-primary" />
                              <span className="text-gray-700 dark:text-gray-300 font-medium high-contrast:text-highContrast-text">
                                {name}
                              </span>
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    ))
                  ) : (
                    <div className="flex w-full mt-2 justify-center items-center">
                      <button
                        className="cursor-pointer high-contrast:text-highContrast-text high-contrast:hover:text-highContrast-primary"
                        onClick={() => {
                          dispatch(updateModals({ login: true }));
                        }}
                      >
                        Faça <span className="text-violet-500 high-contrast:text-highContrast-primary">Login</span>
                      </button>
                    </div>
                  )}
                </div>
              </Menu.Items>
            )}
          </AnimatePresence>
        </>
      )}
    </Menu>
  );
}