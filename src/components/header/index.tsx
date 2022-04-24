

interface urlImgProp {
    urlImg: string
}

export function Header({ urlImg }: urlImgProp) {
    return (
        <header className="flex justify-between items-center w-full h-24 p-4 text-lg" >
            <span>Olá, Thiago</span>
            <img className="w-14 h-14 p-1 rounded-full ring-2 ring-green-300 dark:ring-green-300" src={urlImg} alt="Bordered avatar"></img>
        </header>
    )
}