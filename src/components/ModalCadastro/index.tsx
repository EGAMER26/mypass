"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff } from "@geist-ui/icons"; // Import Eye and EyeOff icons
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ApplicationState } from "@/store";
import { updateModals } from "@/store/modules/Modals/actions";
import { postUsersRequest } from "@/store/modules/Users/actions";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoaderPinwheel } from "lucide-react";

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
    watch,
    formState: { errors },
  } = useForm<FormData>();

  // State for password strength
  const [strengthLevel, setStrengthLevel] = useState("weak");
  const [strength, setStrength] = useState(0);
  const [strengthText, setStrengthText] = useState("Fraca");

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const users = useSelector((state: ApplicationState) => state?.Users.data);
  const loading = useSelector((state: ApplicationState) => state?.Users.loading);

  // Watch the password field for changes
  const password = watch("password");
  const router = useRouter();

  // Effect to update password strength whenever the password changes
  useEffect(() => {
    if (password) {
      updatePasswordStrength(password);
    } else {
      // Reset strength when password field is empty
      setStrength(0);
      setStrengthLevel("weak");
      setStrengthText("Fraca");
    }
  }, [password]);

  // Function to update password strength indicator
  const updatePasswordStrength = (currentPassword: string) => {
    let newStrength = 0;

    // Length contribution
    const lengthScore = Math.min(currentPassword.length / 12, 1) * 40;
    newStrength += lengthScore;

    // Character type contribution
    const hasUppercase = /[A-Z]/.test(currentPassword);
    const hasLowercase = /[a-z]/.test(currentPassword);
    const hasNumbers = /[0-9]/.test(currentPassword);
    const hasSymbols = /[^A-Za-z0-9]/.test(currentPassword);

    const typesCount = [
      hasUppercase,
      hasLowercase,
      hasNumbers,
      hasSymbols,
    ].filter(Boolean).length;
    const typeScore = (typesCount / 4) * 60;
    newStrength += typeScore;

    setStrength(newStrength);

    // Update UI text and level based on strength score
    if (newStrength < 40) {
      setStrengthLevel("weak");
      setStrengthText("Fraca");
    } else if (newStrength < 70) {
      setStrengthLevel("medium");
      setStrengthText("Média");
    } else {
      setStrengthLevel("strong");
      setStrengthText("Forte");
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: FormData) => {
      const exist = users.find((value) => value.email === data.email);
      if(exist) {
        toast.error('E-mail já cadastrado',
          {theme: "dark"}
        )
        return
      }
      // setTimeout(() => {
        dispatch(postUsersRequest({nome: data.nome, email: data.email, senha: data.password, typeAuth: 'Tradicional', profilePic: ""}))
      // },1000)
      if(!loading) {
        await signIn("credentials", {
          redirect: false, // Não redireciona automaticamente, vamos lidar com o resultado
          email: data.email,
          password: data.password,
        });
        dispatch(updateModals({ cadastro: false }))
        router.push("/");
      }
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
                <div className="relative"> {/* Added relative positioning for the button */}
                  <input
                    type={showPassword ? "text" : "password"} // Dynamically set type
                    {...register("password", { required: "Senha é obrigatória" })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.password
                        ? "border-red-500"
                        : "border-gray-300 dark:border-zinc-700"
                    } bg-white dark:bg-zinc-800 text-gray-900 dark:text-white mt-1 pr-10`} 
                    placeholder="••••••••"
                  />
                  <button
                    type="button" // Important: set type to "button" to prevent form submission
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition"
                    aria-label={
                      showPassword ? "Ocultar senha" : "Exibir senha"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}

                {/* Password strength indicator */}
                <div className="mt-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-600 dark:text-gray-300">
                      Força da senha:
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        strengthLevel === "weak"
                          ? "text-red-500"
                          : strengthLevel === "medium"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {strengthText}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 transition-colors duration-300">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        strengthLevel === "weak"
                          ? "bg-red-500"
                          : strengthLevel === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${strength}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-center flex justify-center items-center bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                {loading ? <LoaderPinwheel className="animate-spin"/> : "Criar conta"}
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