import { MdEmail } from 'react-icons/md'
import { IoLockOpen } from 'react-icons/io5'
import { FaGoogle } from 'react-icons/fa'
import { UserContext } from "../../context/UserContext";
import { FormEvent, useContext, useState } from "react";
import { CloverEffect } from '../cloverEffect';
import { ErrorLogin } from '../errorLogin';

export function Login() {
    const { login, loginWithCredentials, error } = useContext(UserContext)

    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')

    const handleLoginWithCredentials = (event: FormEvent) => {
        event.preventDefault()

        const credentials = {
            email,
            password
        }

        loginWithCredentials(credentials) 
    }

    return (
        <div className="w-screen h-screen grid place-items-center px-2 bg-green-100" >
            <div className="flex flex-col w-full max-w-md px-6 py-8 bg-white rounded-lg drop-shadow-lg md:px-8 lg:px-10">
                <div className="flex flex-col items-center justify-center gap-4 text-center text-xl font-light text-slate-700 sm:text-2xl">
                    <p>Crie seus jogos da <span className="font-bold text-green-800">MEGA-SENA</span> e confira de forma rápida!</p>
                    <CloverEffect size="medium"/>
                </div>
                <div className="mt-8">
                    <form action="#" autoComplete="off">
                        <div className="flex flex-col mb-4">
                            <div className="flex relative">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <MdEmail className="text-slate-500 text-xl"/>
                                </span>
                                <input 
                                    type="text"
                                    required
                                    id="sign-in-email" 
                                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-3 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent" 
                                    placeholder="Seu email"
                                    onChange={e => setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-4">
                            <div className="flex relative ">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <IoLockOpen className="text-slate-500 text-xl"/>
                                </span>
                                <input 
                                    type="password" 
                                    required
                                    id="sign-in-password" 
                                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-3 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent" 
                                    placeholder="Sua senha"
                                    onChange={e => setPassword(e.target.value)}/>
                            </div>
                        </div>
                        { error && <ErrorLogin content="Email e/ou senha estão incorretos!"/>}
                        <div className="flex items-center mb-6 mt-4">
                            <div className="flex ml-auto">
                                <a href="#" className="inline-flex text-xs font-medium text-slate-600 sm:text-sm hover:text-gray-700">
                                    Esqueceu sua senha?
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <button
                                onClick={handleLoginWithCredentials}
                                type="submit" 
                                className="py-3 px-4  bg-green-200 hover:bg-green-400 focus:ring-green-200 focus:ring-offset-green-200 transition ease-in duration-200 text-slate-900 w-full text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Entrar
                            </button>
                            <div className="flex item-center">
                                <button
                                    onClick={() => login()}
                                    type="button" 
                                    className="py-3 px-4 flex justify-center items-center  bg-slate-100 hover:bg-slate-300 focus:ring-slate-50 focus:ring-offset-slate-50 transition ease-in duration-200 text-slate-900 w-full text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    <FaGoogle className="text-xl mr-2" />
                                        usar conta Google
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex items-center justify-center mt-6">
                    <a href="#" target="_blank" className="inline-flex items-center text-xs font-bold text-center text-slate-600 hover:text-gray-700">
                        <span className="ml-2">
                            Ainda não possui uma conta?
                        </span>
                    </a>
                </div>
            </div>
        </div>
    )
}