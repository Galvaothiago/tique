import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { urlImgProp } from "../header"

export function ImgProfile({ urlImg, name }: urlImgProp) {
  const { logout } = useContext(UserContext)

  const hasImgUrl = !!urlImg
  const altText = `Imagem de perfil: ${name}`

  const pickLettersFromName = (name: string) => {
    if (!name) {
      return "A" // chosen letter A from anonymous
    }

    const letters = name?.split(" ")

    switch (letters.length) {
      case 1:
        return letters[0].charAt(0).toUpperCase()
      case 2:
        return `${letters[0].charAt(0)}${letters[1].charAt(0)}`.toUpperCase()
      default:
        return `${letters[0].charAt(0)}${letters[2].charAt(0)}`.toUpperCase()
    }
  }

  return (
    <>
      {hasImgUrl ? (
        <img
          onClick={logout}
          className="w-14 h-14 p-1 rounded-full ring-2 ring-green-300 dark:ring-green-300"
          src={urlImg}
          alt={altText}
        ></img>
      ) : (
        <div
          onClick={logout}
          className="grid place-items-center w-14 h-14 p-1 bg-slate-300 text-slate-600 font-bold text-2xl rounded-full ring-2 ring-green-300 dark:ring-green-300 cursor-pointer"
        >
          {pickLettersFromName(name)}
        </div>
      )}
    </>
  )
}
