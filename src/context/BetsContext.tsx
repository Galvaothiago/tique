import { createContext, ReactNode, useState } from "react";

interface BetsProps {
    allBets: number[],
    insertBet: (arr: number[]) => void
}

interface ChildrenProps {
    children: ReactNode
}

export const BetsContext = createContext({} as BetsProps)

export function BetsProvider({ children }: ChildrenProps) {
    const [ allBets, setAllBets ] = useState<number[]>([])
    let bets = []

    const insertBet = (arrayBet: number[]) => {
       bets.push(arrayBet)

       setAllBets(bets)
    }

    return (
        <BetsContext.Provider
            value={{
                allBets,
                insertBet
            }}
        >
            { children }
        </BetsContext.Provider>
    )
}