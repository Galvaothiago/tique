import { createContext, ReactNode, useState } from "react";

interface BetsProps {
    allBets: number[][],
    insertBet: (arr: number[]) => void,
    removeSomeBet: (arr: number[]) => void,
    replaceBetsWithNewOnes: (newBets: number[][]) => void
    cleanAllBets: () => void
}

interface ChildrenProps {
    children: ReactNode
}

export const BetsContext = createContext({} as BetsProps)

export function BetsProvider({ children }: ChildrenProps) {
    const [ allBets, setAllBets ] = useState<number[][]>([])
    let bets = []

    const insertBet = (arrayBet: number[]) => {
       bets = arrayBet

       console.log("received by params: ",arrayBet)
       console.log("all bets : ",allBets)
       setAllBets(oldBets => [...oldBets, bets])
    }

    const replaceBetsWithNewOnes = (newBets: number[][]) => {
        setAllBets(newBets)
    }

    const removeSomeBet = (arrayBet: number[]) => {
        const betsAfterRemove = allBets.filter(bet => {
           return  bet !== arrayBet
        })

        setAllBets(betsAfterRemove)
    }

    const cleanAllBets = () => {
        setAllBets([])
    }

    return (
        <BetsContext.Provider
            value={{
                allBets,
                insertBet,
                removeSomeBet,
                replaceBetsWithNewOnes,
                cleanAllBets
            }}
        >
            { children }
        </BetsContext.Provider>
    )
}