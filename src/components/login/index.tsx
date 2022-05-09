import { GiClover } from "react-icons/gi";
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { signInWithGoogleOrFacebook } from "../../authFIrebase";
import { UserContext } from "../../context/UserCOntext";
import { useContext } from "react";

export function Login() {
    const { login } = useContext(UserContext)
    return (
        <div className="w-screen h-screen flex flex-col bg-green-400" >
            <div className="flex items-end justify-center w-full h-80">
                <GiClover className="animate-bounce text-9xl text-green-200 drop-shadow-lg" /> 
            </div>
            <div className="flex items-center justify-center w-full h-40 text-center px-6">
                <p className="text-2xl text-green-50">Crie seus jogos da MEGA-SENA e confira de forma rápida!</p>
            </div>
            <div className="flex items-center justify-center w-full h-96">
                <div className="w-full flex flex-col items-center gap-4 p-6">
                    <div className="flex items-center max-w-2xl w-full h-16 rounded-lg px-4 bg-green-200">
                        <FaGoogle className="text-3xl" />
                        <button 
                            className="w-full h-full text-xl font-bold"
                            onClick={() => login('google')}
                        >Entrar com o Google
                        </button>
                    </div>
                    <div className="flex items-center max-w-2xl w-full h-16 rounded-lg px-4 bg-green-200">
                        <FaFacebookF className="text-3xl" />
                        <button 
                            className="w-full h-full text-xl font-bold"
                            onClick={() => login('facebook')}
                        >Entrar com o Facebook
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}