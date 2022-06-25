interface ButtonControlBetProps {
  content: string
  funcAction: () => void
}

export function ButtonControlBet({
  content,
  funcAction,
}: ButtonControlBetProps) {
  return (
    <button
      className={`text-sm text-slate-700 mr-1 font-bold border border-solid border-green-400 p-1 cursor-pointer bg-green-50 rounded-md outline-none`}
      onClick={funcAction}
    >
      {content}
    </button>
  )
}
