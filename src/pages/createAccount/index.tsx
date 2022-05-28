import { GiClover } from "react-icons/gi";

export default function CreateAccount() {
    return (    
        <div className="w-screen h-screen grid place-items-center px-2 bg-green-100">
            <div className="flex flex-col w-full max-w-md py-8 bg-white rounded-lg drop-shadow-lg md:px-8 lg:px-10">
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
                                    type="email"
                                    required
                                    id="create-account-email" 
                                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" name="email" placeholder="Email"/>
                            </div>
                        </div>
                        <div className="flex gap-4 mb-2">
                            <div className=" relative ">
                                <input 
                                    type="text"
                                    required
                                    id="create-account-first-name" 
                                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" name="First name" placeholder="Primeiro nome"/>
                            </div>
                            <div className="relative">
                                <input 
                                    type="text"
                                    required 
                                    id="create-account-last-name" 
                                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" name="Last name" placeholder="Ultimo nome"/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-2 mt-4">
                            <div className="relative mb-2">
                                <input 
                                    type="password"
                                    required
                                    id="create-account-password" 
                                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Senha"/>
                            </div>
                            <div className="relative">
                                <input 
                                    type="password"
                                    required
                                    id="create-account-password-confirm" 
                                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Repita a senha"/>
                            </div>
                        </div>
                        <div className="flex item-center">
                                <button 
                                    type="submit" 
                                    className="py-3 px-4 mt-4 flex justify-center items-center bg-slate-100 hover:bg-slate-200 focus:ring-slate-50 focus:ring-offset-slate-50 transition ease-in duration-200 text-slate-600 w-full text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                        <GiClover className="mr-2 text-green-500 text-2xl"/>
                                         Criar conta
                                </button>
                        </div>
                    </form>  
                </div>
            </div>
        </div>
    )
}