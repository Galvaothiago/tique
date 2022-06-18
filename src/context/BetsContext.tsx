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

interface ResponseBetsProp {
    status: number, 
    id: string
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
    allBetsSave: SaveBetsProps[],
    createAndSaveBets: (arrNumber: number[][], userId: string) => Promise<number> | null
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
        }

    }

    const transformArrNumberToString = (arrNumbers: number[][]) => {
        const arrString = arrNumbers.map(arrNumber => {

            return arrNumber.reduce((acc, number) => acc + String(number) + " - ","")
                .substring(0, arrNumber.length + (arrNumber.length * 3) - 3)
        })

        return arrString
    }

    const createAndSaveBets = async (bets: number[][], userId: string) => {
        const result = transformArrNumberToString(bets)

        try {
            const data = {
                created_at: new Date().toISOString(),
                id_user: userId,
                my_bets: result
            }

            const  { status, data: { id } } = await api.post('bets', data)

            return status

        } catch(err) {
            console.log(err)
            alert(err)
        }

        return null
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
                createAndSaveBets
            }}
        >
            { children }
        </BetsContext.Provider>
    )
}