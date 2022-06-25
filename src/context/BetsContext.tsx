import { createContext, ReactNode, useState } from "react"
import { ModalAction } from "../components/modalAction"
import { api } from "../service/api"

interface SaveBetsProps {
  created_at: string
  id_bet: string
  my_bets: string[]
}

interface BetsResultsProps {
  bet_result: {
    result: string
    date: string
  }
  created_at: string
  dataRefId: string
  id_user: string
  my_bets: string[]
}

interface ResponseBetsProp {
  status: number
  id: string
}

interface BetsProps {
  allBets: number[][]
  insertBet: (arr: number[]) => void
  removeSomeBet: (arr: number[]) => void
  replaceBetsWithNewOnes: (newBets: string[]) => void
  cleanAllBets: () => void
  handleShowBetsHistory: () => void
  showBetsHistory: boolean
  getAllBetsHistory: (userId: string) => void
  allBetsSave: SaveBetsProps[]
  createAndSaveBets: (arrNumber: number[][], userId: string) => void
  updateBets: (bets: number[][], betRef: string) => void
  permitInsertBets: () => void
  blockInsertBets: () => void
}

interface ChildrenProps {
  children: ReactNode
}

export const BetsContext = createContext({} as BetsProps)

export function BetsProvider({ children }: ChildrenProps) {
  const [allBets, setAllBets] = useState<number[][]>([])
  const [allBetsSave, setAllBetsSave] = useState<SaveBetsProps[]>()
  const [showBetsHistory, setShowBetsHistory] = useState<boolean>(false)
  const [messageModalAction, setMessageModalAction] = useState<string>("")
  const [showModalAction, setShowModalAction] = useState<boolean>(false)
  const [canInsertBets, setCanInsertBets] = useState<boolean>(true)

  let bets = []

  const insertBet = (arrayBet: number[]) => {
    if (!canInsertBets) return
    bets = arrayBet

    setAllBets((oldBets) => [...oldBets, bets])
  }

  const blockInsertBets = () => {
    setCanInsertBets(false)
  }

  const permitInsertBets = () => {
    setCanInsertBets(true)
  }

  const replaceBetsWithNewOnes = (bets: string[]) => {
    const myBets = transformArrStringToNumber(bets)
    setAllBets(myBets)
  }

  const removeSomeBet = (arrayBet: number[]) => {
    const betsAfterRemove = allBets.filter((bet) => {
      return bet !== arrayBet
    })

    setAllBets(betsAfterRemove)
  }

  const cleanAllBets = () => {
    setAllBets([])
  }

  const handleShowBetsHistory = () => {
    setShowBetsHistory((oldState) => !oldState)
  }

  const getAllBetsHistory = async (userId: string) => {
    handleShowBetsHistory()

    if (!showBetsHistory) {
      const allBetsData = await api.get("/bets", { params: { userId } })
      const dataResults = []

      allBetsData.data.forEach((bet: BetsResultsProps) => {
        const data = {
          created_at: bet.created_at,
          id_bet: bet.dataRefId,
          my_bets: bet.my_bets,
        }
        dataResults.push(data)
      })

      setAllBetsSave(dataResults)
    }
  }

  const transformArrStringToNumber = (bets: string[]) => {
    const numberArr = bets.map((bet) => {
      const betToNumber = bet.split("-").map((item) => Number(item.trim()))

      return betToNumber
    })

    return numberArr
  }

  const transformArrNumberToString = (arrNumbers: number[][]) => {
    const arrString = arrNumbers
      .map((arrNumber) => {
        return arrNumber.reduce(
          (acc, number) => acc + String(number) + " - ",
          ""
        )
      })
      .map((bet) => bet.substring(0, [...bet].length - 3))

    return arrString
  }

  const updateBets = async (bets: number[][], betRef: string) => {
    const result = transformArrNumberToString(bets)

    try {
      const { status } = await api.patch("bets", {
        data: result,
        betRef,
      })

      if (status === 204) {
        setMessageModalAction("Aposta atualizada com sucesso!")
        setShowModalAction(true)

        setTimeout(() => {
          setShowModalAction(false)
        }, 1500)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const createAndSaveBets = async (bets: number[][], userId: string) => {
    const result = transformArrNumberToString(bets)

    try {
      const data = {
        created_at: new Date().toISOString(),
        id_user: userId,
        my_bets: result,
      }

      const {
        status,
        data: { id },
      } = await api.post("bets", data)

      if (status === 200) {
        setMessageModalAction("Aposta salva com sucesso!")
        setShowModalAction(true)

        setTimeout(() => {
          setShowModalAction(false)
        }, 1500)
      }
    } catch (err) {
      console.log(err)
      alert(err)
    }
  }

  return (
    <BetsContext.Provider
      value={{
        allBets,
        insertBet,
        removeSomeBet,
        replaceBetsWithNewOnes,
        cleanAllBets,
        handleShowBetsHistory,
        showBetsHistory,
        getAllBetsHistory,
        allBetsSave,
        createAndSaveBets,
        updateBets,
        blockInsertBets,
        permitInsertBets,
      }}
    >
      {children}
      {showModalAction && <ModalAction message={messageModalAction} />}
    </BetsContext.Provider>
  )
}
