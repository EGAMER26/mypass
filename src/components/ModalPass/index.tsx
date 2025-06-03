'use client';

import React, { useEffect, useState } from 'react';
import { X, Eye, EyeOff, Copy, Trash2 } from "@geist-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from 'react-redux';
import { loadUserRequest } from '@/store/modules/User/actions';
import { useSession } from 'next-auth/react';
import { IUser, ISenhas } from '@/store/modules/User/types';
import { updateModals } from '@/store/modules/Modals/actions';

interface ModalSenhasProps {
  show?: boolean;
}

export default function ModalSenhas({ show }: ModalSenhasProps) {
  // Seleciona o usuário (incluindo senhasSalvas) – aqui usamos mock para demonstração
  // Substitua esta parte pelo selector real quando integrar com Redux
  const dispatch = useDispatch();
  const { data: session } = useSession();

  // Mock de usuário carregado
  const mockUser: IUser = {
    id: 101,
    nome: "Carlos Andrade",
    email: "carlos.andrade@example.com",
    senha: "senhaSegura123",
    ProfilePic: "https://randomuser.me/api/portraits/men/32.jpg",
    typeAuth: "credentials",
    createdAt: "2025-06-02T10:00:00.000Z",
    senhasSalvas: [
      {
        id: 1,
        nome: "Netflix",
        senha: "netflix@123",
        createdAt: "2025-05-01T08:30:00.000Z"
      },
      {
        id: 2,
        nome: "Spotify",
        senha: "musicaTop2025",
        createdAt: "2025-05-10T14:12:00.000Z"
      },
      {
        id: 3,
        nome: "Amazon",
        senha: "compraFacil#2025",
        createdAt: "2025-05-15T19:45:00.000Z"
      },
      {
        id: 4,
        nome: "Instagram",
        senha: "insta_life!88",
        createdAt: "2025-05-20T22:00:00.000Z"
      }
    ]
  };

  // Estado que guardará as senhas localmente (pode ser substituído pelo Redux store)
  const [senhasArray, setSenhasArray] = useState<ISenhas[]>([]);

  // Estado para controlar quais senhas estão reveladas
  const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set());

  // Estado para controlar edição de nome de senha
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>("");

  useEffect(() => {
    // Simula carregamento da lista de senhas do usuário
    // Se usar Redux, dispare loadUserRequest e substitua mockUser por selector
    if (session?.user?.email) {
      dispatch(loadUserRequest(session.user.email));
      // Aqui, apenas definimos mockUser para demo:
    }
    setSenhasArray(mockUser.senhasSalvas);
  }, [dispatch, session?.user?.email]);

  // Alterna entre mostrar/ocultar senha
  const toggleReveal = (id: number) => {
    setRevealedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Exclui uma senha da lista local
  const handleDelete = (id: number) => {
    setSenhasArray(prev => prev.filter(item => item.id !== id));
    // Se usar Redux, dispare ação de exclusão aqui
  };

  // Copia senha para clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Opcional: mostrar notificação de “Copiado!”
  };

  // Inicia edição de nome de uma senha
  const startEditing = (item: ISenhas) => {
    if (!item.id || !item.nome) return;
    setEditingId(item.id);
    setEditedName(item.nome);
  };

  // Salva o novo nome e finaliza edição
  const saveEditedName = (id: number) => {
    setSenhasArray(prev =>
      prev.map(item =>
        item.id === id ? { ...item, nome: editedName } : item
      )
    );
    setEditingId(null);
    setEditedName("");
    // Se usar Redux, dispare ação de update aqui
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => dispatch(updateModals({passwords: false}))}
        >
          <motion.div
            className="relative w-11/12 max-w-3xl bg-white/30 dark:bg-zinc-900/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão de fechar */}
            <X
              size={24}
              className="absolute top-4 right-4 cursor-pointer text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition"
              onClick={() => dispatch(updateModals({passwords: false}))}
            />

            {/* Título do modal */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
              Senhas Armazenadas
            </h2>

            {/* Se não houver senhas */}
            {senhasArray.length === 0 ? (
              <p className="text-center text-gray-700 dark:text-gray-300">
                Nenhuma senha encontrada.
              </p>
            ) : (
              <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                {senhasArray.map((item) => {
                  const id = item.id ?? -1;
                  const isRevealed = revealedIds.has(id);
                  const isEditing = editingId === id;

                  return (
                    <div
                      key={id}
                      className="bg-white/50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl p-4 shadow hover:shadow-lg transition"
                    >
                      {/* Cabeçalho: nome ou input de edição, ícones de editar/excluir */}
                      <div className="flex justify-between items-center pb-2">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            onBlur={() => saveEditedName(id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                saveEditedName(id);
                              }
                            }}
                            className="w-2/3 px-2 py-1 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-400"
                            autoFocus
                          />
                        ) : (
                          <button
                            onClick={() => startEditing(item)}
                            className="text-lg font-semibold text-gray-800 dark:text-gray-100 hover:underline transition"
                          >
                            {item.nome}
                          </button>
                        )}

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopy(item.senha!)}
                            className="p-1 rounded-full bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
                            aria-label="Copiar senha"
                          >
                            <Copy color='' className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                          </button>
                          <button
                            onClick={() => toggleReveal(id)}
                            className="p-1 rounded-full bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
                            aria-label={isRevealed ? "Ocultar senha" : "Exibir senha"}
                          >
                            {isRevealed ? (
                              <EyeOff color='' className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                            ) : (
                              <Eye color='' className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(id)}
                            className="p-1 rounded-full bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
                            aria-label="Excluir senha"
                          >
                            <Trash2 color='' className="w-5 h-5 text-red-600 dark:text-red-400" />
                          </button>
                        </div>
                      </div>

                      {/* Senha: mascarada ou revelada */}
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">
                          Senha:
                        </span>
                        <span className="text-gray-900 dark:text-gray-100 font-mono bg-gray-100 dark:bg-zinc-700 px-2 py-1 rounded">
                          {isRevealed ? item.senha : "••••••••"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
