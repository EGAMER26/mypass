"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "@/store";
import { updateModals } from "@/store/modules/Modals/actions";

type FormData = {
  nome: string;
  email: string;
  password: string;
};

export default function ModalCadastro() {
  const cadastroOpen = useSelector(
    (state: ApplicationState) => state?.Modals.data.cadastro
  );
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Aqui você faria a requisição para a API de cadastro
    console.log("Cadastro:", data);
    // Exemplo:
    // await fetch('/api/register', { method: 'POST', body: JSON.stringify(data) });
  };

  return (
    <AnimatePresence>
      {cadastroOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => dispatch(updateModals({ cadastro: false }))}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Botão de fechar */}
            <X
              size={22}
              onClick={() => dispatch(updateModals({ cadastro: false }))}
              className="absolute top-4 right-4 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition"
            />

            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
              Criar nova conta
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nome
                </label>
                <input
                  {...register("nome", { required: "Nome é obrigatório" })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.nome
                      ? "border-red-500"
                      : "border-gray-300 dark:border-zinc-700"
                  } bg-white dark:bg-zinc-800 text-gray-900 dark:text-white mt-1`}
                  placeholder="Seu nome"
                />
                {errors.nome && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.nome.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email é obrigatório" })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 dark:border-zinc-700"
                  } bg-white dark:bg-zinc-800 text-gray-900 dark:text-white mt-1`}
                  placeholder="exemplo@email.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Senha
                </label>
                <input
                  type="password"
                  {...register("password", { required: "Senha é obrigatória" })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-300 dark:border-zinc-700"
                  } bg-white dark:bg-zinc-800 text-gray-900 dark:text-white mt-1`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Criar conta
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
              Já tem conta?{" "}
              <span
                onClick={() =>
                  dispatch(updateModals({ login: true, cadastro: false }))
                }
                className="text-violet-500 hover:underline cursor-pointer"
              >
                Faça login
              </span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
