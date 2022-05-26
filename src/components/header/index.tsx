import { ImgProfile } from "../imgProfile"

export interface urlImgProp {
    urlImg: string | undefined,
    name: string | undefined
}

export function Header({ urlImg, name }: urlImgProp) {
    const defaultName = 'Anônimo'
    return (
        <header className="flex justify-between items-center w-full h-24 p-4 text-lg" >
            <span>{`Olá, ${name ?? defaultName}`}</span>
            <ImgProfile urlImg={urlImg} name={'thiago galvao'}/>
        </header>
    )
}