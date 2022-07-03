import { ButtonHTMLAttributes } from "react"
import { IoTrash } from "react-icons/io5"

export function ButtonDeleteBet(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      className="flex justify-start items-center w-16 relative h-14 bg-red-50 before:content-[''] before:block after:content-[''] before:h-full before:w-5 after:absolute after:right-0 after:rounded-l-full after:bg-green-100 after:h-full after:w-5 before:absolute before:rounded-l-full before:right-10  before:bg-red-50"
      type="button"
      {...props}
    >
      <IoTrash className="text-xl absolute left-1 text-red-400" />
    </button>
  )
}
