import { createContext, ReactNode, useState } from "react";
import { api } from "../service/api";


interface SaveBetsProps {
    created_at: string,
    id_bet: string,
    my_bets: string[]
}

interface BetsResultsProps {
    bet_result: {
        result: string,
        date: string
    },
    created_at: string,
    dataRefId: string,
    id_user: string,
    my_bets: string[]
}

interface BetsProps {
    allBets: number[][],
    insertBet: (arr: number[]) => void,
    removeSomeBet: (arr: number[]) => void,
    replaceBetsWithNewOnes: (newBets: number[][]) => void
    cleanAllBets: () => void,
    handleShowBetsHistory: () => void,
    showBetsHistory: boolean,
    getAllBetsHistory: (userId: string) => void,
    allBetsSave: SaveBetsProps[]
}

interface ChildrenProps {
    children: ReactNode
}

export const BetsContext = createContext({} as BetsProps)

export function BetsProvider({ children }: ChildrenProps) {
    const [ allBets, setAllBets ] = useState<number[][]>([])
    const [ allBetsSave, setAllBetsSave ] = useState<SaveBetsProps[]>()
    const [ showBetsHistory, setShowBetsHistory ] = useState<boolean>(false)

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

    const handleShowBetsHistory = () => {
        setShowBetsHistory(oldState => !oldState)
    }

    const getAllBetsHistory = async (userId: string) => {
        handleShowBetsHistory()

        if(!showBetsHistory) {
            const allBetsData = await api.get('/bets', { params: { userId }})
            const dataResults = []
            
            allBetsData.data.forEach((bet: BetsResultsProps)  => {
                const data = {
                    created_at: bet.created_at,
                    id_bet: bet.dataRefId,
                    my_bets: bet.my_bets
                } 
                dataResults.push(data)
            })
            
            setAllBetsSave(dataResults)
            console.log(allBetsSave)
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
                allBetsSave
            }}
        >
            { children }
        </BetsContext.Provider>
    )
}