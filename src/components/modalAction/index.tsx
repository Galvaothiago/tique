interface ModalActionProp {
  message: string
  type?: "success" | "fail"
}

export function ModalAction({ message, type = "success" }: ModalActionProp) {
  let bg = ""

  switch (type) {
    case "success":
      bg = "bg-green-600"
      break
    case "fail":
      bg = "bg-red-100"
      break
    default:
      bg = "bg-green-600"
      break
  }
  return (
    <div className="flex justify-center items-end  w-full h-screen bg-white/60 inset-0 pb-28 fixed">
      <span className={`animate-appear px-8 py-4 text-slate-100 ${bg}`}>
        {message}
      </span>
    </div>
  )
}
