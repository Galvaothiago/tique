import { FormEvent, useContext, useState } from "react"
import { useRouter } from "next/router"
import { GiClover } from "react-icons/gi"
import { createAccountCredentials } from "../../authFirebase"
import { validateEmail, validatePassword } from "../../utils/regexValidation"
import { checkEmailExist } from "../../utils/checkEmailExist"
import { BetsContext } from "../../context/BetsContext"

export default function CreateAccount() {
  const [email, setEmail] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [feedbackPassword, setFeedbackPassword] = useState<string>("")
  const [feedbackConfirmPassword, setFeedbackConfirmPassword] = useState<boolean>(true)
  const [feedbackEmail, setFeedbackEmail] = useState<string>("")

  const { openModalAndCloseAutomatically } = useContext(BetsContext)
  const router = useRouter()

  const handleCreateAccount = async (event: FormEvent) => {
    event.preventDefault()

    const newUser = {
      email,
      name: `${firstName} ${lastName}`,
      password,
    }

    if (checkInformationBeforeSend()) {
      await createAccountCredentials(newUser)

      openModalAndCloseAutomatically("", "success")
      router.push("/")

      return
    }

    openModalAndCloseAutomatically("Não foi possivel realizar o cadastro, tente novamente", "success")
  }

  const handleInstantPasswordValidation = (content: string) => {
    let password = content

    if (!content) {
      setFeedbackPassword("")
      return
    }

    setPassword(content)
    if (password.length >= 6) {
      const isValidPassword = validatePassword(content)

      if (isValidPassword) {
        setFeedbackPassword("")
      } else {
        setFeedbackPassword("senha precisa conter letras e numeros e pelo menos um caracter especial")
      }

      return
    }

    setFeedbackPassword("senha precisa ter no mínimo 6 caracteres")
  }

  const checkIfPasswordsAreTheSame = (content: string) => {
    if (!content) {
      setFeedbackConfirmPassword(true)
      return
    }

    setConfirmPassword(content)

    if (content === password) {
      setFeedbackConfirmPassword(true)
    } else {
      setFeedbackConfirmPassword(false)
    }
  }

  const handleCheckEmail = async (content: string) => {
    const isEmailValid = validateEmail(content)
    const TIME = 1500

    if (!content) {
      setFeedbackEmail("")
      return
    }

    setEmail(content)

    if (!isEmailValid) {
      return
    }

    setTimeout(async () => {
      const emailExist = await checkEmailExist(content)

      if (emailExist) {
        setFeedbackEmail("Email ja cadastrado!")
        return
      }

      setFeedbackEmail("")
    }, TIME)
  }

  const validateTheSamePassword = () => {
    if (password === confirmPassword) {
      return true
    }

    return false
  }

  const checkInformationBeforeSend = () => {
    if (!firstName && !lastName) {
      return false
    }

    if (!email && !feedbackEmail) {
      return false
    }

    if (!validateTheSamePassword()) {
      return false
    }

    return true
  }

  return (
    <div className="w-screen h-screen grid place-items-center px-2 bg-gradient-to-tr from-green-50 to-green-300 overflow-hidden">
      <div className="flex flex-col w-full max-w-md py-8 bg-white border border-green-500 rounded-lg drop-shadow-2xl md:px-8 lg:px-10">
        <div className="text-center mb-2 text-xl font-light text-slate-900 sm:text-2xl">
          Crie sua conta agora mesmo. É rápido!
        </div>
        <span className="justify-center text-sm text-center text-gray-500 flex-items-center">
          Já possui uma conta?
          <a href="/" target="_blank" className="text-sm ml-1 text-green-500 underline hover:text-blue-700">
            Entrar
          </a>
        </span>
        <div className="p-6 mt-8">
          <form action="#">
            <div className="flex flex-col mb-2">
              <div className="relative">
                <input
                  onChange={(e) => handleCheckEmail(e.target.value)}
                  type="email"
                  required
                  autoComplete="false"
                  id="create-account-email"
                  className={`rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 ${
                    feedbackEmail ? "focus:ring-red-800" : "focus:ring-green-500"
                  } focus:border-transparent`}
                  name="email"
                  placeholder="Email"
                />
                {feedbackEmail && <span className="text-xs ml-2 text-justify text-red-800">{feedbackEmail}</span>}
              </div>
            </div>
            <div className="flex gap-4 mb-2">
              <div className=" relative ">
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  required
                  id="create-account-first-name"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  name="First name"
                  placeholder="Primeiro nome"
                />
              </div>
              <div className="relative">
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  required
                  id="create-account-last-name"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  name="Last name"
                  placeholder="Ultimo nome"
                />
              </div>
            </div>
            <div className="flex flex-col mb-2 mt-4">
              <div className="relative mb-2">
                <input
                  onChange={(e) => handleInstantPasswordValidation(e.target.value)}
                  type="password"
                  required
                  id="create-account-password"
                  className={` rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 ${
                    feedbackPassword ? "focus:ring-red-800" : "focus:ring-green-500"
                  } focus:border-transparent`}
                  placeholder="Senha"
                />
                {feedbackPassword && <span className="text-xs ml-2 text-justify text-red-800">{feedbackPassword}</span>}
              </div>
              <div className="relative">
                <input
                  onChange={(e) => checkIfPasswordsAreTheSame(e.target.value)}
                  type="password"
                  required
                  id="create-account-password-confirm"
                  className={`rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 ${
                    !feedbackConfirmPassword ? "focus:ring-red-800" : "focus:ring-green-500"
                  } focus:border-transparent`}
                  placeholder="Repita a senha"
                />
              </div>
            </div>
            <div className="flex item-center">
              <button
                onClick={handleCreateAccount}
                type="submit"
                disabled={!checkInformationBeforeSend()}
                className={`py-3 px-4 mt-4 flex justify-center ${
                  !checkInformationBeforeSend() && "cursor-not-allowed"
                } items-center bg-slate-100 hover:bg-slate-200 focus:ring-slate-50 focus:ring-offset-slate-50 transition ease-in duration-200 text-slate-600 w-full text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg`}
              >
                <GiClover className="mr-2 text-green-500 text-2xl" />
                Criar conta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
