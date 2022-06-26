import { createContext, ReactNode, useContext, useState } from "react"
import { ModalBetResult } from "../components/modalBetResult"
import { api } from "../service/api"
import { compareBets, MatchResultProps } from "../utils/compareBets"
import { BetsContext } from "./BetsContext"
import { UserContext } from "./UserContext"

interface ChildrenProp {
  children: ReactNode
}

interface CompareBetsProps {
  handleCompareBets: () => void
}

export const CompareBetsContext = createContext({} as CompareBetsProps)

export function CompareBetsProvider({ children }: ChildrenProp) {
  const { user } = useContext(UserContext)
  const { allBets } = useContext(BetsContext)

  const [resultBets, setResultBets] = useState<MatchResultProps[]>()
  const [showModalResult, setShowModalResult] = useState<boolean>(false)

  const handleCompareBets = async () => {
    try {
      const result = await api.get("/betResult", {
        params: {
          userId: user.id,
        },
      })

      const infoBetResult = compareBets(
        allBets,
        transformStringToArrNumber(result.data[0].result)
      )

      setShowModalResult(true)
      setResultBets(infoBetResult)
    } catch (err) {
      console.log(err.message)
    }
  }

  const transformStringToArrNumber = (str: string) => {
    const result = str?.split("-").map((item) => Number(item.trim()))

    return result
  }

  const closeModal = () => {
    setShowModalResult(false)
  }
  return (
    <CompareBetsContext.Provider
      value={{
        handleCompareBets,
      }}
    >
      {children}
      {showModalResult && (
        <ModalBetResult data={resultBets} closeModal={closeModal} />
      )}
    </CompareBetsContext.Provider>
  )
}
