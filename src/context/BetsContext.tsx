import { createContext, ReactNode, useState } from "react"
import { ModalAction } from "../components/modalAction"
import { ModalDelete } from "../components/modalDelete"
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

interface InfoToDelete {
  id: string
  userId: string
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
  handleDeleteBet: (id: string, userId: string) => Promise<void>
  getInfoToDelete: (id: string, userId: string) => void
  handleOpenModalDelete: (typeModal: string) => void
  handleCloseModalDelete: () => void
  openModalAndCloseAutomatically: (message: string, type: string) => void
  updateListAllBetsHistory: (refId: string) => void
}

interface ChildrenProps {
  children: ReactNode
}

export const BetsContext = createContext({} as BetsProps)

export function BetsProvider({ children }: ChildrenProps) {
  const [allBets, setAllBets] = useState<number[][]>([])
  const [allBetsSave, setAllBetsSave] = useState<SaveBetsProps[]>()
  const [showBetsHistory, setShowBetsHistory] = useState<boolean>(false)
  const [canInsertBets, setCanInsertBets] = useState<boolean>(true)

  const [infoToDelete, setInfoToDelete] = useState<InfoToDelete>()
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [typeModalAction, setTypeModalAction] = useState<string>("")
  const [typeModalDelete, setTypeModalDelete] = useState<string>("")
  const [messageModal, setMessageModal] = useState<string>("")
  const [openModalAction, setOpenModalAction] = useState<boolean>(false)

  let bets = []
  const TIME_TO_CLOSE = 2000 // 2 seconds
  const DELAY_TO_OPEN = 500 // 1/2 second

  const handleOpenModalDelete = (typeModal: string) => {
    setOpenModalDelete(true)
    setTypeModalDelete(typeModal)
  }

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false)
  }

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
    try {
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
    } catch (err) {
      if (err.response.status === 404) {
        setAllBetsSave([])
      }
    }
  }

  const updateListAllBetsHistory = (refId: string) => {
    const betsAfterDeleting = allBetsSave.filter((bet) => {
      return bet.id_bet !== refId
    })

    setAllBetsSave(betsAfterDeleting)
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
        return arrNumber.reduce((acc, number) => acc + String(number) + " - ", "")
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
        openModalAndCloseAutomatically("Aposta atualizada com sucesso!", "success")
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

      if (status === 201) {
        openModalAndCloseAutomatically("Aposta salva com sucesso!", "success")
      }
    } catch (err) {
      openModalAndCloseAutomatically(err.message, "fail")
    }
  }

  const handleDeleteBet = async (id: string, userId: string) => {
    try {
      await api.delete("/bets", {
        params: {
          betRef: id,
          userId: userId,
        },
      })
    } catch (err) {
      openModalAndCloseAutomatically(err.message, "fail")
    }
  }

  const getInfoToDelete = (id: string, userId: string) => {
    setInfoToDelete({ id, userId })
  }

  const openModalAndCloseAutomatically = (message: string, type: string) => {
    setMessageModal(message)
    setTypeModalAction(type)

    setTimeout(() => {
      setOpenModalAction(true)
    }, DELAY_TO_OPEN)

    setTimeout(() => {
      setOpenModalAction(false)
      setMessageModal("")
    }, TIME_TO_CLOSE)
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
        handleDeleteBet,
        getInfoToDelete,
        handleOpenModalDelete,
        handleCloseModalDelete,
        openModalAndCloseAutomatically,
        updateListAllBetsHistory,
      }}
    >
      {children}
      {openModalDelete && <ModalDelete info={infoToDelete} type={typeModalDelete} />}
      {openModalAction && <ModalAction message={messageModal} type={typeModalAction} />}
    </BetsContext.Provider>
  )
}
