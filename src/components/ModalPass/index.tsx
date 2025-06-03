'use client';

import React, { useEffect, useState } from 'react';
import { X, Eye, EyeOff, Copy, Trash2 } from "@geist-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import {  ISenhas } from '@/store/modules/User/types';
import { updateModals } from '@/store/modules/Modals/actions';
import { ApplicationState } from '@/store';
import { updateUserRequest } from '@/store/modules/User/actions';

interface ModalSenhasProps {
  show?: boolean;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function ModalSenhas({ show }: ModalSenhasProps) {
  const user = useSelector((state: ApplicationState) => state?.User.data);
  const dispatch = useDispatch();

  const [revealedId, setRevealedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [copied, setCopied] = useState<{ id: number | null; copied: boolean }>({ id: null, copied: false });

  useEffect(() => {
    if (user?.senhasSalvas) {
      setRevealedId(null);
      setEditingId(null);
      setEditedName("");
    }
  }, [user?.senhasSalvas, show]);

  const toggleReveal = (id: number) => {
    setRevealedId(prev => (prev === id ? null : id));
  };

  const handleDelete = (id: number) => {
    if (!user || !user.senhasSalvas) return;
    const updatedSenhas = user.senhasSalvas.filter(item => item.id !== id);
    dispatch(updateUserRequest({ ...user, senhasSalvas: updatedSenhas }));
    setRevealedId(null);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const startEditing = (item: ISenhas) => {
    if (item.id === undefined || item.nome === undefined) return;
    setEditingId(item.id);
    setEditedName(item.nome);
  };

  const saveEditedName = (id: number) => {
    if (!user || !user.senhasSalvas) return;
    const updatedSenhas = user.senhasSalvas.map(item =>
      item.id === id ? { ...item, nome: editedName } : item
    );
    dispatch(updateUserRequest({ ...user, senhasSalvas: updatedSenhas }));
    setEditingId(null);
    setEditedName("");
  };

  const senhasParaExibir = user?.senhasSalvas || [];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => dispatch(updateModals({ passwords: false }))}
        >
          <motion.div
            className="relative w-11/12 max-w-3xl py-12 bg-white/30 dark:bg-zinc-900/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <X
              size={24}
              className="absolute top-4 right-4 cursor-pointer text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition"
              onClick={() => dispatch(updateModals({ passwords: false }))}
            />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
              Senhas Armazenadas
            </h2>

            {senhasParaExibir.length === 0 ? (
              <p className="text-center text-gray-700 dark:text-gray-300">
                Nenhuma senha salva.
              </p>
            ) : (
              <motion.div
                className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar scrollbar-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {senhasParaExibir.map((item) => {
                    const id = item.id;
                    const isRevealed = revealedId === id;
                    const isEditing = editingId === id;

                    return (
                      <motion.div
                        key={id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        className="bg-white/50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl p-4 shadow hover:shadow-lg transition"
                      >
                        <div className="flex justify-between items-center pb-2">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editedName}
                              onChange={(e) => setEditedName(e.target.value)}
                              onBlur={() => saveEditedName(id)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") saveEditedName(id);
                              }}
                              className="w-2/3 px-2 py-1 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-400"
                              autoFocus
                            />
                          ) : (
                            <button
                              onClick={() => startEditing(item)}
                              className="text-lg font-semibold text-gray-800 dark:text-gray-100 hover:underline transition truncate max-w-[70%]"
                              title={item.nome}
                            >
                              {item.nome}
                            </button>
                          )}

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                if (item.senha) {
                                  handleCopy(item.senha);
                                  setCopied({ id, copied: true });
                                  setTimeout(() => setCopied({ id: null, copied: false }), 2000);
                                }
                              }}
                              className={`p-1 rounded-full bg-gray-200 ${
                                copied.id === id && copied.copied
                                  ? "dark:bg-white bg-zinc-700"
                                  : "dark:bg-zinc-700"
                              } hover:bg-gray-300 dark:hover:bg-zinc-600 transition`}
                              aria-label="Copiar senha"
                            >
                              <Copy
                                color=""
                                className={`w-5 h-5 ${
                                  copied.id === id && copied.copied
                                    ? "dark:text-black text-white"
                                    : ""
                                }`}
                              />
                            </button>
                            <button
                              onClick={() => toggleReveal(id)}
                              className="p-1 rounded-full bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
                              aria-label={isRevealed ? "Ocultar senha" : "Exibir senha"}
                            >
                              {isRevealed ? (
                                <EyeOff color="" className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                              ) : (
                                <Eye color="" className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                              )}
                            </button>
                            <button
                              onClick={() => handleDelete(id)}
                              className="p-1 rounded-full bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
                              aria-label="Excluir senha"
                            >
                              <Trash2 color="" className="w-5 h-5 text-red-600 dark:text-red-400" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">
                            Senha:
                          </span>
                          <span className="text-gray-900 dark:text-gray-100 font-mono bg-gray-100 dark:bg-zinc-700 px-2 py-1 rounded">
                            {isRevealed ? item.senha || 'N/A' : "••••••••"}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
