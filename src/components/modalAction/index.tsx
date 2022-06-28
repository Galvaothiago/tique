interface ModalActionProp {
  message: string
  type?: "success" | "fail" | string
}

export function ModalAction({ message, type = "success" }: ModalActionProp) {
  let bg = ""
  let colorText = ""

  switch (type) {
    case "success":
      bg = "bg-green-600"
      colorText = "text-slate-100"
      break
    case "fail":
      bg = "bg-red-400"
      colorText = "text-slate-50"
      break
    default:
      bg = "bg-green-600"
      colorText = "text-slate-50"
      break
  }
  return (
    <div className="flex justify-center items-end w-full h-screen bg-white/60 inset-0 pb-28 fixed">
      <span
        className={`max-w-xs w-auto animate-appear px-8 py-4 ${colorText} ${bg}`}
      >
        {message}
      </span>
    </div>
  )
}
