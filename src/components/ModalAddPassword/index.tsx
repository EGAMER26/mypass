"use client";

import React, { useEffect, useState } from "react";
import { X, Eye, EyeOff } from "@geist-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { updateModals } from "@/store/modules/Modals/actions";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "@/store";
import { updateUserRequest } from "@/store/modules/User/actions";
import { ISenhas } from "@/store/modules/User/types";
import { LoaderPinwheel } from "lucide-react";

interface ModalAddSenhaProps {
  show: boolean;
  onClose: () => void;
  onSave: () => void;
  password: string;
}

export default function ModalAddSenha({
  show,
  onClose,
  onSave,
  password,
}: ModalAddSenhaProps) {
  const [nome, setNome] = useState("");
  const [loading, setloading] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [senhasSalvas, setSenhasSalvas] = useState<ISenhas[] | undefined>([]);
  const user = useSelector(
    (state: ApplicationState) => state?.User.data
  );
  const dispatch = useDispatch();
useEffect(() => {
  setSenhasSalvas([
    ...(user?.senhasSalvas || []),
    { nome: nome, senha: password, id: Date.now() },
  ]);
},[nome])
  const handleSave = () => {
    setloading(true)
    dispatch(updateUserRequest({senhasSalvas: senhasSalvas, id: user?.id, email:user?.email}));
    setTimeout(() => {
      onSave();
      setRevealed(false);
      dispatch(updateModals({ passwords: true }));
      setNome("");
      setloading(false);
    },1000)
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-11/12 max-w-lg bg-white/40 dark:bg-zinc-900/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão fechar */}
            <X
              size={24}
              className="absolute top-4 right-4 cursor-pointer text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition"
              onClick={onClose}
            />

            {/* Título */}
            <h2 className="text-2xl font-bold text-white dark:text-gray-100 mb-4 text-center">
              Salvar Nova Senha
            </h2>

            {/* Campo para nome da senha */}
            <div className="mb-4 text-center">
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-400"
                placeholder="Nome da senha"
              />
            </div>

            {/* Campo para senha com toggle de exibição */}
            <div className="mb-6 mt-8 relative  w-full flex flex-col">
              <span className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-zinc-600 bg-transparent dark:bg-transparent text-white dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-400 pr-10">
                {revealed ? password : "•".repeat(password.length)}
              </span>
              <button
                onClick={() => setRevealed((prev) => !prev)}
                className="absolute top-[7px] right-3 p-1 rounded-full bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
                aria-label={revealed ? "Ocultar senha" : "Exibir senha"}
              >
                {revealed ? (
                  <EyeOff
                    color=""
                    className="w-5 h-5 text-gray-700 dark:text-gray-200"
                  />
                ) : (
                  <Eye
                    color=""
                    className="w-5 h-5 text-gray-700 dark:text-gray-200"
                  />
                )}
              </button>
            </div>

            {/* Botões de ação */}
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleSave()}
                className="px-4 py-2 cursor-pointer min-w-20 flex justify-center items-center bg-violet-600 text-white rounded-md hover:bg-violet-700 transition"
              >
                {loading ? <LoaderPinwheel className="animate-spin"/> : "Salvar"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
