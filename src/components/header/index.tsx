import { useContext } from "react"
import { UserContext } from "../../context/UserCOntext"


interface urlImgProp {
    urlImg: string,
    name: string
}

export function Header({ urlImg, name }: urlImgProp) {
    const { logout } = useContext(UserContext)

    return (
        <header className="flex justify-between items-center w-full h-24 p-4 text-lg" >
            <span>{`Olá, ${name}`}</span>
            <img 
                onClick={logout}    
                className="w-14 h-14 p-1 rounded-full ring-2 ring-green-300 dark:ring-green-300" src={urlImg} alt="Bordered avatar">
                </img>
        </header>
    )
}