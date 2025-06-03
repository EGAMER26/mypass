"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "@/store";
import { updateModals } from "@/store/modules/Modals/actions";

type FormData = {
  email: string;
  password: string;
};

export default function ModalLogin() {
  const loginOpen = useSelector(
    (state: ApplicationState) => state?.Modals.data.login
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("loginOpen", loginOpen);
  }, [loginOpen]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await signIn("credentials", {
      redirect: true,
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
  };

  return (
    <AnimatePresence>
      {loginOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => dispatch(updateModals({ login: false }))}
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
              onClick={() => dispatch(updateModals({ login: false }))}
              className="absolute top-4 right-4 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition"
            />

            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
              Entrar na sua conta
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                className="w-full cursor-pointer bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Entrar
              </button>

              <div className="relative flex items-center my-4">
                <div className="flex-grow border-t border-gray-300 dark:border-zinc-600" />
                <span className="mx-2 text-sm text-gray-500 dark:text-gray-400">
                  ou
                </span>
                <div className="flex-grow border-t border-gray-300 dark:border-zinc-600" />
              </div>

              <button
                type="button"
                onClick={() => signIn("google")}
                className="w-full border cursor-pointer border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-800 dark:text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
              >
                <FcGoogle size={20} />
                Entrar com Google
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
              Ainda não tem cadastro?{" "}
              <span
                onClick={() =>
                  dispatch(updateModals({ login: false, cadastro: true }))
                }
                className="text-violet-500 hover:underline cursor-pointer"
              >
                Cadastre-se
              </span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
