'use client';

import React, { useEffect, useState } from 'react';
import { X, User, Mail, Calendar, Key, Edit, Save, XCircle } from 'lucide-react'; // Importações de ícones Lucide
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '@/store';
import { updateModals } from '@/store/modules/Modals/actions';
import { updateUserRequest } from '@/store/modules/User/actions';

// Re-definir interfaces para garantir que estão importadas corretamente
interface ISenhas {
  id: number;
  nome?: string;
  senha?: string;
  createdAt?: string;
}

export interface IUser {
  id?: number;
  nome?: string | null;
  email?: string | null;
  senha?: string;
  profilePic?: string | null;
  typeAuth?: string | null; // Tipo de autenticação (ex: "google", "email/password")
  senhasSalvas?: ISenhas[];
  createdAt?: string; // Data de criação da conta
}

export default function ModalProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state: ApplicationState) => state?.User.data as IUser | null); // Casting para IUser | null

  const show = useSelector((state: ApplicationState) => state.Modals.data.profile);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    nome: user?.nome || '',
    email: user?.email || '',
  });

  // Sincroniza o formulário com os dados do usuário do Redux quando o modal é exibido ou o usuário muda
  useEffect(() => {
    if (show && user) {
      setForm({
        nome: user.nome || '',
        email: user.email || '',
      });
      setEditMode(false); // Resetar o modo de edição ao abrir o modal
    }
  }, [show, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!user) return;
    dispatch(updateUserRequest({ ...user, ...form }));
    // A desativação do modo de edição acontecerá no useEffect quando o user for atualizado pelo Redux
    // setEditMode(false); // Pode ser removido daqui se a atualização do user no Redux for rápida e consistente
  };

  const handleCancelEdit = () => {
    if (user) {
      setForm({
        nome: user.nome || '',
        email: user.email || '',
      });
    }
    setEditMode(false);
  };

  // Formata a data de criação
  const formatCreationDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return 'Data inválida';
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" // Adicionado p-4 para padding em telas pequenas
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => dispatch(updateModals({ profile: false }))}
        >
          <motion.div
            className="relative w-full max-w-lg bg-white/30 dark:bg-zinc-900/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-100 dark:border-zinc-800" // Adicionado border e padding responsivo
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão de Fechar */}
            <button
              className="absolute top-4 right-4 p-2 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
              onClick={() => dispatch(updateModals({ profile: false }))}
              aria-label="Fechar modal de perfil"
            >
              <X size={20} />
            </button>

            {/* Cabeçalho do Perfil */}
            <div className="flex flex-col items-center mb-6">
              {/* Foto de Perfil */}
              <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-violet-500 dark:border-violet-400 shadow-lg">
                {user?.profilePic ? (
                  <img
                    src={user.profilePic ?? "assets/noUser.png"}
                    alt={user.nome || 'Foto de Perfil'}
                    className="transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <User size={60} strokeWidth={1} />
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
                {user?.nome || 'Usuário Desconhecido'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                {user?.email || 'N/A'}
              </p>
            </div>

            {/* Detalhes do Perfil */}
            <div className="space-y-4 mb-6">
              {/* Nome */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <User size={16} className="mr-2 text-violet-500" /> Nome
                </label>
                {editMode ? (
                  <input
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                    placeholder="Seu nome"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white text-lg px-3 py-2 bg-gray-50 dark:bg-zinc-800/60 rounded-lg border border-gray-200 dark:border-zinc-700">
                    {user?.nome || 'Não informado'}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <Mail size={16} className="mr-2 text-violet-500" /> Email
                </label>
                {editMode ? (
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                    placeholder="seu.email@exemplo.com"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white text-lg px-3 py-2 bg-gray-50 dark:bg-zinc-800/60 rounded-lg border border-gray-200 dark:border-zinc-700">
                    {user?.email || 'Não informado'}
                  </p>
                )}
              </div>

              {/* Tipo de Autenticação (Apenas para visualização) */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <Key size={16} className="mr-2 text-violet-500" /> Tipo de Autenticação
                </label>
                <p className="text-gray-800 dark:text-white text-lg px-3 py-2 bg-gray-50 dark:bg-zinc-800/60 rounded-lg border border-gray-200 dark:border-zinc-700">
                  {user?.typeAuth ? user.typeAuth.charAt(0).toUpperCase() + user.typeAuth.slice(1) : 'Não informado'}
                </p>
              </div>

              {/* Data de Criação (Apenas para visualização) */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <Calendar size={16} className="mr-2 text-violet-500" /> Membro desde
                </label>
                <p className="text-gray-800 dark:text-white text-lg px-3 py-2 bg-gray-50 dark:bg-zinc-800/60 rounded-lg border border-gray-200 dark:border-zinc-700">
                  {formatCreationDate(user?.createdAt)}
                </p>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="mt-6 flex justify-end gap-3">
              {editMode ? (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-zinc-600 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-zinc-500 transition flex items-center gap-2"
                  >
                    <XCircle size={16} /> Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition flex items-center gap-2"
                  >
                    <Save size={16} /> Salvar
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition"
                >
                  <Edit size={16} /> Editar Perfil
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}