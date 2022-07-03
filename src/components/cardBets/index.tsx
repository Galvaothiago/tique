import { useContext } from "react"
import { BetsContext } from "../../context/BetsContext"
import { UserContext } from "../../context/UserContext"
import { getFormatDateResult } from "../../utils/formatDate"
import { ButtonDeleteBet } from "../buttonDeleteBet"
import { CloverEffect } from "../cloverEffect"

interface CardBetsProps {
  quantity: number
  date: string
  bets: string[]
  id: string
  handleBet: (bet: string[], betRef: string) => void
  showButton: boolean
}

export function CardBets({ date, quantity, bets, handleBet, id, showButton }: CardBetsProps) {
  const formatDate = getFormatDateResult(date)

  const oneBet = quantity === 1
  const pluralOrSingularPhrase = oneBet ? "aposta" : "apostas"

  const { user } = useContext(UserContext)
  const { getInfoToDelete, handleOpenModalDelete } = useContext(BetsContext)

  const handleDelete = () => {
    getInfoToDelete(id, user.id)
    handleOpenModalDelete("deleteGroupBets")
  }

  return (
    <div className="max-w-sm w-full flex items-center">
      {showButton && <ButtonDeleteBet onClick={handleDelete} />}
      <div
        className="max-w-sm h-14 w-full flex items-center justify-between bg-gradient-to-l from-slate-100 to-green-300 pl-6 pr-2 rounded-l-full cursor-pointer"
        onClick={() => handleBet(bets, id)}
      >
        <p className="text-slate-700 text-xs font-bold">{`#${formatDate}`}</p>
        <span className="flex items-center gap-1">
          <p className="w-16 text-center leading-none font-bold text-sm break-word">{`${quantity} ${pluralOrSingularPhrase}`}</p>
          <CloverEffect animation={false} size="small" />
        </span>
      </div>
    </div>
  )
}
