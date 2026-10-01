"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, Eye, EyeOff, Copy, Trash2 } from "@geist-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { ISenhas } from "@/store/modules/User/types";
import { updateModals } from "@/store/modules/Modals/actions";
import { ApplicationState } from "@/store";
import { updateUserRequest } from "@/store/modules/User/actions";
import { useSession } from "next-auth/react";

interface ModalSenhasProps {
  show?: boolean;
  scrollToBottom?: boolean;
  onScrolledToBottom?: () => void;
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

export default function ModalSenhas({ show, scrollToBottom, onScrolledToBottom }: ModalSenhasProps) {
  const user = useSelector((state: ApplicationState) => state?.User.data);
  const dispatch = useDispatch();

  const [revealedId, setRevealedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingDelete, setPendingDelete] = useState<ISenhas | null>(null);
  const [copied, setCopied] = useState<{ id: string | null; copied: boolean }>({
    id: null,
    copied: false,
  });
  const { data: session } = useSession();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user?.senhasSalvas) {
      setRevealedId(null);
      setEditingId(null);
      setEditedName("");
    }
  }, [user?.senhasSalvas, show]);

  useEffect(() => {
    if (!show || !scrollToBottom || !user?.senhasSalvas?.length) return;
    const frame = requestAnimationFrame(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
      onScrolledToBottom?.();
    });
    return () => cancelAnimationFrame(frame);
  }, [show, scrollToBottom, user?.senhasSalvas?.length, onScrolledToBottom]);

  const toggleReveal = (id: string) => {
    setRevealedId((prev) => (prev === id ? null : id));
  };

  const requestDelete = (item: ISenhas) => {
    setPendingDelete(item);
  };

  const confirmDelete = () => {
    if (!user || !user.senhasSalvas || !pendingDelete) return;
    const updatedSenhas = user.senhasSalvas.filter((item) => item.id !== pendingDelete.id);
    dispatch(updateUserRequest({ ...user, senhasSalvas: updatedSenhas }));
    setRevealedId(null);
    setPendingDelete(null);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const startEditing = (item: ISenhas) => {
    if (item.id === undefined || item.nome === undefined) return;
    setEditingId(item.id);
    setEditedName(item.nome);
  };

  const saveEditedName = (id: string) => {
    if (!user || !user.senhasSalvas) return;
    const updatedSenhas = user.senhasSalvas.map((item) =>
      item.id === id ? { ...item, nome: editedName } : item
    );
    dispatch(updateUserRequest({ ...user, senhasSalvas: updatedSenhas }));
    setEditingId(null);
    setEditedName("");
  };

  const senhasParaExibir = user?.senhasSalvas || [];
  const senhasFiltradas = senhasParaExibir.filter((item) =>
    (item.nome || "").toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

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

            {session ? (
              <>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Buscar senha pelo nome..."
                  aria-label="Buscar senha pelo nome"
                  className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
                {senhasParaExibir.length === 0 ? (
                  <p className="text-center text-gray-700 dark:text-gray-300">
                    Nenhuma senha salva.
                  </p>
                ) : senhasFiltradas.length === 0 ? (
                  <p className="text-center text-gray-700 dark:text-gray-300">
                    Nenhuma senha encontrada.
                  </p>
                ) : (
                  <motion.div
                    ref={listRef}
                    className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar scrollbar-hidden"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <AnimatePresence>
                      {senhasFiltradas.map((item) => {
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
                                  onChange={(e) =>
                                    setEditedName(e.target.value)
                                  }
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
                                      setTimeout(
                                        () =>
                                          setCopied({
                                            id: null,
                                            copied: false,
                                          }),
                                        2000
                                      );
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
                                  aria-label={
                                    isRevealed
                                      ? "Ocultar senha"
                                      : "Exibir senha"
                                  }
                                >
                                  {isRevealed ? (
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
                                <button
                                  onClick={() => requestDelete(item)}
                                  className="p-1 rounded-full bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
                                  aria-label="Excluir senha"
                                >
                                  <Trash2
                                    color=""
                                    className="w-5 h-5 text-red-600 dark:text-red-400"
                                  />
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">
                                Senha:
                              </span>
                              <span className="text-gray-900 dark:text-gray-100 font-mono bg-gray-100 dark:bg-zinc-700 px-2 py-1 rounded">
                                {isRevealed ? item.senha || "N/A" : "••••••••"}
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </motion.div>
                )}
              </>
            ) : (
              <div className="text-center">
                <button >
                  Faça{" "}
                  <span
                    onClick={() => {
                      dispatch(updateModals({ login: true }));
                    }}
                    className="text-violet-500 cursor-pointer"
                  >
                    Login
                  </span>{" "}
                  para poder salver senhas
                </button>
              </div>
            )}

            <AnimatePresence>
              {pendingDelete && (
                <motion.div
                  className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/60 p-6 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="delete-password-title"
                >
                  <motion.div
                    className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-zinc-900"
                    initial={{ scale: 0.95, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 10 }}
                  >
                    <h3
                      id="delete-password-title"
                      className="text-lg font-bold text-gray-900 dark:text-gray-100"
                    >
                      Excluir senha?
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      A senha <strong>{pendingDelete.nome || "selecionada"}</strong> será excluída permanentemente.
                    </p>
                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setPendingDelete(null)}
                        className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition hover:bg-gray-300 dark:bg-zinc-700 dark:text-gray-100 dark:hover:bg-zinc-600"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={confirmDelete}
                        className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
                      >
                        Excluir
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
