"use client";

import Image from "next/image";
import { Menu } from "@headlessui/react";
import { LogOut, User, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { updateModals } from "@/store/modules/Modals/actions";
import { useDispatch } from "react-redux";

const menuItems = [
  {
    name: "Perfil",
    icon: User,
    onClick: () => console.log("Perfil clicado"),
  },
  {
    name: "Configurações",
    icon: Settings,
    onClick: () => console.log("Configurações clicado"),
  },
  {
    name: "Sair",
    icon: LogOut,
    onClick: () => signOut(),
  },
];

export default function UserOptions() {
  const dispatch = useDispatch();

  const { data: session } = useSession();
  return (
    <Menu as="div" className="relative inline-block  text-left">
      {/* Botão que ativa o dropdown: aqui usamos a imagem do usuário */}
      <Menu.Button className="flex items-center p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:ring-2 hover:ring-violet-500 transition focus:outline-none">
        <Image
          src="/assets/noUser.png"
          width={32}
          height={32}
          className="rounded-full"
          alt="Ícone do usuário"
        />
      </Menu.Button>

      {/* Dropdown propriamente dito, com glassmorphism */}
      <Menu.Items className="absolute right-0 mt-2 w-48 min-h-12  origin-top-right rounded-xl bg-white/10 dark:bg-zinc-200/10 backdrop-blur-md border border-white/30 shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
        <div className="py-1 h-full">
          {session ? (
            menuItems.map(({ name, icon: Icon, onClick }) => (
              <Menu.Item key={name}>
                {({ active }) => (
                  <button
                    onClick={onClick}
                    className={`${
                      active ? "bg-violet-200/20  dark:bg-violet-600/20" : ""
                    } flex w-full items-center px-4 py-2 text-sm text-white dark:text-gray-200 gap-2 transition`}
                  >
                    <Icon className="w-5 h-5 text-violet-400" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {name}
                    </span>
                  </button>
                )}
              </Menu.Item>
            ))
          ) : (
            <div className="flex w-full h-full mt-2 justify-center items-center">
              <button className="m-0 cursor-pointer"
              onClick={() => dispatch(updateModals({ login: true }))}>
                Faça <span className="text-violet-500">Login</span>
                </button>
                </div>
          )}
        </div>
      </Menu.Items>
    </Menu>
  );
}
