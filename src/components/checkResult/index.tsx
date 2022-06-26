import { useContext, useState } from "react"
import { ImFilesEmpty } from "react-icons//im"
import { AiOutlineCheck } from "react-icons/ai"
import { BiPlus } from "react-icons/bi"
import { CgTrash } from "react-icons/cg"
import { IoOptions } from "react-icons/io5"
import { BetsContext } from "../../context/BetsContext"
import { CompareBetsContext } from "../../context/CompareBestContext"
import { ModalContext } from "../../context/ModalContext"
import { UserContext } from "../../context/UserContext"
import { ButtonControlBet } from "../buttonControlBet"
import { CardBets } from "../cardBets"

export function CheckResult() {
  const { openModal } = useContext(ModalContext)

  const {
    allBets,
    allBetsSave,
    removeSomeBet,
    replaceBetsWithNewOnes,
    cleanAllBets,
    updateBets,
    createAndSaveBets,
    getAllBetsHistory,
    blockInsertBets,
    permitInsertBets,
  } = useContext(BetsContext)

  const { user } = useContext(UserContext)
  const { handleCompareBets } = useContext(CompareBetsContext)

  const [showButtonsDelete, setShowButtonsDelete] = useState<boolean>(false)
  const [showSingleButtonDelete, setShowSingleButtonDelete] =
    useState<boolean>(false)
  const [showAllBets, setShowAllBets] = useState<boolean>(false)
  const [betRefUpdate, setBetRefUpdate] = useState<string>("")
  const [canEdit, setCanEdit] = useState<boolean>(false)
  const [showButtonEdit, setShowButtonEdit] = useState<boolean>(false)
  const [isNewBet, setIsNewBet] = useState<boolean>()

  const contentButton = showAllBets ? "voltar" : "meus jogos"

  const isEmpty = allBets.length === 0
  const TIME_CLOSE_AUTOMATICALLY = 60 * 1000 * 3 // 3 minutes

  const handleShowButtons = () => {
    setShowButtonsDelete(true)
    setShowSingleButtonDelete(true)

    setTimeout(() => {
      setShowButtonsDelete(false)
      setShowSingleButtonDelete(false)
    }, TIME_CLOSE_AUTOMATICALLY)
  }

  const hiddenButtons = () => {
    setShowButtonsDelete(false)
    setShowSingleButtonDelete(false)
  }

  const sortArray = (arr: number[]) => {
    const arrToSort: number[] = arr

    return arrToSort.sort((a: number, b: number) => a - b)
  }

  const formatViewBet = (bet: number[]) => {
    if (bet.length === 0) return

    const INITAL_STRING = 0
    const REMOVE_FROM = 3

    const sortBet = sortArray(bet)

    const formatedBet = sortBet.reduce((acc: string, number: number) => {
      acc += `${String(number)} - `
      return acc
    }, "")

    const finalBet = formatedBet.substring(
      INITAL_STRING,
      formatedBet.length - REMOVE_FROM
    )
    return finalBet
  }

  const handleSaveBets = () => {
    createAndSaveBets(allBets, user.id)
    cleanAllBets()
  }

  const handleGetAllBetHistory = () => {
    setShowButtonEdit(true)
    setShowAllBets((oldState) => !oldState)

    if (!showAllBets) {
      getAllBetsHistory(user.id)
      setShowButtonEdit(false)
    }
    setCanEdit(false)
  }

  const getBetAndShowOnScreen = (bets: string[], betRef: string) => {
    replaceBetsWithNewOnes(bets)
    setShowAllBets(false)
    setBetRefUpdate(betRef)

    setIsNewBet(false)
    setShowButtonEdit(true)
    blockInsertBets()
  }

  const permitEditBet = () => {
    setCanEdit(true)
    permitInsertBets()
  }

  const handleUpdateBets = () => {
    updateBets(allBets, betRefUpdate)
  }

  const cancelActionEdit = () => {
    setCanEdit(false)
    setShowButtonEdit(true)
  }

  const prepareToCreateNewBet = () => {
    cleanAllBets()
    permitInsertBets()
    setCanEdit(false)
    setShowButtonEdit(false)
    setIsNewBet(true)
  }

  return (
    <div className="flex flex-col w-full h-96 bg-green-100">
      <h3 className="w-full text-center text-xs text-slate-500 border-b py-2 border-slave">
        confira seus jogos
      </h3>
      {showButtonsDelete ? (
        <div className="flex w-96 h-22 mx-auto mt-2 mb-2 justify-center gap-1">
          <button
            className="w-40 p-1 bg-red-100 border border-red-300 text-xs text-slate-800"
            onClick={openModal}
          >
            excluir todos
          </button>
          <button
            className="w-40 p-1 bg-emerald-50 border grid place-items-center text-green-600 border-green-400"
            onClick={hiddenButtons}
          >
            <AiOutlineCheck />
          </button>
        </div>
      ) : (
        <div className="flex w-96 h-22 mx-auto mt-2 mb-2 items-center justify-between px-3">
          <div>
            {canEdit ? (
              <ButtonControlBet
                funcAction={cancelActionEdit}
                content="cancelar"
              />
            ) : (
              <ButtonControlBet
                funcAction={handleGetAllBetHistory}
                content={contentButton}
              />
            )}
            {showButtonEdit && !canEdit && !isNewBet && (
              <ButtonControlBet funcAction={permitEditBet} content="editar" />
            )}
          </div>
          {!showAllBets && (
            <div className="flex items-center gap-2">
              <span
                className="p-1 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-700 cursor-pointer"
                onClick={prepareToCreateNewBet}
              >
                <BiPlus />
              </span>
              <IoOptions
                className="text-2xl text-slate-700 cursor-pointer"
                onClick={handleShowButtons}
              />
            </div>
          )}
        </div>
      )}
      <div className="w-full h-full mx-auto overflow-y-auto py-4 overflow-x-hidden">
        <div className="flex w-96 mx-auto flex-col items-center gap-4 px-12">
          {showAllBets ? (
            allBetsSave?.map((bet) => (
              <CardBets
                handleBet={getBetAndShowOnScreen}
                key={bet.id_bet}
                quantity={bet.my_bets.length}
                date={bet.created_at}
                bets={bet.my_bets}
                id={bet.id_bet}
              />
            ))
          ) : isEmpty ? (
            <div className="w-full mt-14 flex flex-col items-center gap-2 h-full">
              <ImFilesEmpty className="text-3xl text-slate-700" />
              <p className="uppercase text-xs text-slate-700">
                Sem jogos ainda!
              </p>
            </div>
          ) : (
            allBets.map((bet, index) => (
              <div key={`${index}-${bet}`} className="flex items-center gap-2">
                <span className="p-2 bg-slate-50 text-xl font-normal">
                  {formatViewBet(bet)}
                </span>
                {showSingleButtonDelete && (
                  <span className="p-3 rounded-lg bg-red-50">
                    <CgTrash
                      className="text-xl cursor-pointer text-red-500"
                      onClick={() => removeSomeBet(bet)}
                    />
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      {!showAllBets && (
        <div className="grid place-items-center w-full h-24 py-2">
          {canEdit ? (
            <button
              className={`w-80 h-12 border border-emerald-600 bg-gradient-to-l from-emerald-600 to-emerald-400 font-bold  ${
                isEmpty && "cursor-not-allowed"
              } rounded uppercase text-sm text-slate-50`}
              onClick={handleUpdateBets}
            >
              atualizar jogos
            </button>
          ) : (
            !isEmpty &&
            (isNewBet ? (
              <button
                className="w-80 h-12 border border-emerald-600 bg-gradient-to-l from-emerald-600 to-emerald-400 font-bold uppercase text-sm text-slate-50"
                onClick={handleSaveBets}
              >
                salvar jogos
              </button>
            ) : (
              <button
                className="w-80 h-12 bg-gradient-to-l from-slate-100 to-slate-50 border border-emerald-300 rounded uppercase text-sm font-bold text-slate-600"
                onClick={handleCompareBets}
              >
                conferir jogos
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
