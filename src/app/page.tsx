"use client";

import LoginForm from "@/components/ModalLogin";
import ModalAddSenha from "@/components/ModalAddPassword";
import ModalSenhas from "@/components/ModalPass";
import { ApplicationState } from "@/store";
import { updateModals } from "@/store/modules/Modals/actions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalCadastro from "@/components/ModalCadastro";
import VLibras from "vlibras-nextjs";
import { IUser } from "@/store/modules/User/types";
import { loadUsersRequest, postUsersRequest } from "@/store/modules/Users/actions";
import { loadUserRequest } from "@/store/modules/User/actions";
import ModalProfile from "@/components/ModalProfile";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [strengthLevel, setStrengthLevel] = useState("weak");
  const [strength, setStrength] = useState(0);
  const [strengthText, setStrengthText] = useState("Média");
  const [copySuccess, setCopySuccess] = useState(false);
  const [showPasswords, setShowPasswords] = useState<boolean | undefined>(
    false
  );
  const [showAddPasswords, setShowAddPasswords] = useState(false);
  const passwordsOpen = useSelector(
    (state: ApplicationState) => state?.Modals.data.passwords
  );
  const users = useSelector(
    (state: ApplicationState) => state?.Users.data
  );
  const loginOpen = useSelector(
      (state: ApplicationState) => state?.Modals.data.login
    );
    const cadastroOpen = useSelector(
        (state: ApplicationState) => state?.Modals.data.cadastro
      );
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    setShowPasswords(passwordsOpen);
  }, [passwordsOpen]);

  useEffect(() => {
    if(!session) return
    dispatch(loadUserRequest(session?.user?.email));
    if (users.length > 0) {
      const cadastrado = users.find(
        (item: IUser) => item.email === session?.user?.email
      );
    if (cadastrado) return
    if (cadastrado === undefined) {
      console.log('entroooooooo0----------')
      // if(session?.tipeAuth) dispatch(postUsersRequest({email: session?.user?.email, nome: session?.user?.name, profilePic: session?.user?.image, typeAuth: "google"}));
      dispatch(postUsersRequest({email: session?.user?.email, nome: session?.user?.name, profilePic: session?.user?.image, typeAuth: "google"}));
    }
  }
  }, [session, users]);

  useEffect(() => {
    console.log('session', session)
  },[session])

  useEffect(() => {
    if (showPasswords || showAddPasswords || loginOpen || cadastroOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // limpa quando o componente desmonta
    };
  }, [showPasswords, showAddPasswords, loginOpen, cadastroOpen]);

  // Toggle theme

  // Generate password
  const generatePassword = () => {
    // Ensure at least one character type is selected
    if (!useUppercase && !useLowercase && !useNumbers && !useSymbols) {
      alert("Por favor, selecione pelo menos um tipo de caractere.");
      return;
    }
    let charset = "";
    if (useUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) charset += "0123456789";
    if (useSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
    updatePasswordStrength(newPassword);
  };

  // Update password strength indicator
  const updatePasswordStrength = (password: string) => {
    // Simple strength calculation based on length and character types
    let strength = 0;
    // Length contribution (up to 40%)
    const lengthScore = Math.min(password.length / 20, 1) * 40;
    strength += lengthScore;

    // Character type contribution (up to 60%)
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[^A-Za-z0-9]/.test(password);

    const typesCount = [
      hasUppercase,
      hasLowercase,
      hasNumbers,
      hasSymbols,
    ].filter(Boolean).length;
    const typeScore = (typesCount / 4) * 60;
    setStrength((strength += typeScore));

    // Update UI
  };

  // Copy password to clipboard
  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 1500);
    });
  };

  // Generate a password on component mount
  useEffect(() => {
    generatePassword();
    dispatch(loadUsersRequest())
  }, []);

  useEffect(() => {
    if (strength < 40) {
      setStrengthLevel("weak");
      setStrengthText("Fraca");
    } else if (strength < 70) {
      setStrengthLevel("medium");
      setStrengthText("Média");
    } else {
      setStrengthLevel("strong");
      setStrengthText("Forte");
    }
    console.log("strengthLevel", strengthLevel);
    console.log("passwordLength", passwordLength);
    console.log("strength", strength);
  }, [strengthLevel, passwordLength, strength]);

  return (
    <>
      <ModalSenhas show={showPasswords} />
      <ModalAddSenha
        show={showAddPasswords}
        onClose={() => setShowAddPasswords(false)}
        onSave={() => setShowAddPasswords(false)}
        password={password}
      />
      <LoginForm />
      <ModalCadastro />
      <ModalProfile />
      <div
        className={`min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col`}
      >
        {/* Main content */}
        <main className="flex-grow container mx-auto mt-16 px-6 md:px-12 py-8 md:py-16">
          {/* Hero section */}
          <section className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
              Crie e Salve Senhas Fortes e Seguras em Segundos
            </h2>
          </section>

          {/* Password generator card */}
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-12 transition-colors duration-300">
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100">
                Gerador de Senhas
              </h3>

              {/* Password display */}
              <div className="relative mb-6">
                <input
                  type="text"
                  value={password}
                  readOnly
                  className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-lg font-mono text-gray-900 dark:text-gray-100 transition-colors duration-300"
                />
                <button
                  onClick={copyToClipboard}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
                  aria-label="Copiar senha"
                >
                  {copySuccess ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Password strength indicator */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Força da senha:
                  </span>
                  <span
                    className={`text-sm font-medium ${
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
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 transition-colors duration-300">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      strengthLevel === "weak"
                        ? "w-1/3 bg-red-500"
                        : strengthLevel === "medium"
                        ? "w-2/3 bg-yellow-500"
                        : "w-full bg-green-500"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Password options */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Comprimento da senha: {passwordLength} caracteres
                  </label>
                  <input
                    type="range"
                    min="6"
                    max="32"
                    value={passwordLength}
                    onChange={(e) =>
                      setPasswordLength(parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 accent-violet-500"
                  />
                </div>

                <div className="grid text-center grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setUseUppercase(!useUppercase)}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                      useUppercase
                        ? "border-violet-500 bg-violet-50 dark:bg-violet-600/20"
                        : "border-gray-300 dark:border-zinc-700"
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      Letras maiúsculas (A-Z)
                    </p>
                  </div>

                  <div
                    onClick={() => setUseLowercase(!useLowercase)}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                      useLowercase
                        ? "border-violet-500 bg-violet-50 dark:bg-violet-600/20"
                        : "border-gray-300 dark:border-zinc-700"
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      Letras minúsculas (a-z)
                    </p>
                  </div>

                  <div
                    onClick={() => setUseNumbers(!useNumbers)}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                      useNumbers
                        ? "border-violet-500 bg-violet-50 dark:bg-violet-600/20"
                        : "border-gray-300 dark:border-zinc-700"
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      Números (0-9)
                    </p>
                  </div>

                  <div
                    onClick={() => setUseSymbols(!useSymbols)}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                      useSymbols
                        ? "border-violet-500 bg-violet-50 dark:bg-violet-600/20"
                        : "border-gray-300 dark:border-zinc-700"
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      Símbolos (!@#$%)
                    </p>
                  </div>
                </div>
              </div>

              {/* Generate button */}
              <button
                onClick={generatePassword}
                className="w-full py-3 px-6 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors duration-300"
              >
                Gerar Senha Segura
              </button>
              <button
                onClick={
                  session
                    ? () => setShowAddPasswords(true)
                    : () => dispatch(updateModals({ login: true }))
                }
                className="w-full mt-2 py-3 px-6 bg-violet-700 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors duration-300"
              >
                Salvar Senha
              </button>
            </div>
          </div>

          {/* Features section */}
          <section className="max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
              Por que usar senhas seguras?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300">
                <div className="text-violet-500 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Proteção Avançada
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Senhas complexas são muito mais difíceis de serem quebradas
                  por hackers e programas maliciosos.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300">
                <div className="text-violet-500 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Senhas Únicas
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Evite usar a mesma senha em vários sites. Nossa ferramenta
                  gera senhas únicas para cada serviço.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300">
                <div className="text-violet-500 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Rápido e Fácil
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Crie senhas fortes em segundos, sem precisar pensar em
                  combinações complexas por conta própria.
                </p>
              </div>
            </div>
          </section>

          {/* Tips section */}
          <section className="max-w-4xl mx-auto mb-12 bg-violet-50 dark:bg-gray-800/50 rounded-xl p-6 md:p-8 transition-colors duration-300">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Dicas para manter suas senhas seguras
            </h3>

            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-violet-500 mr-2 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Use um gerenciador de senhas para armazenar suas senhas com
                  segurança.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-violet-500 mr-2 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Ative a autenticação de dois fatores sempre que possível.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-violet-500 mr-2 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Troque suas senhas regularmente, pelo menos a cada 3-6 meses.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-violet-500 mr-2 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Nunca compartilhe suas senhas com outras pessoas, mesmo que
                  sejam de confiança.
                </span>
              </li>
            </ul>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-6 px-6 md:px-12 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  &copy; {new Date().getFullYear()} SecurePass. Todos os
                  direitos reservados.
                </p>
              </div>
              <div className="flex space-x-6">
                <a
                  href="/politicaprivacidade"
                  className="text-sm text-gray-600 hover:text-violet-500 dark:text-gray-400 dark:hover:text-violet-400 transition-colors duration-300"
                >
                  Política de Privacidade
                </a>
                <a
                  href="/termoServico"
                  className="text-sm text-gray-600 hover:text-violet-500 dark:text-gray-400 dark:hover:text-violet-400 transition-colors duration-300"
                >
                  Termos de Uso
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-violet-500 dark:text-gray-400 dark:hover:text-violet-400 transition-colors duration-300"
                >
                  Contato
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <VLibras forceOnload />
    </>
  );
}
