import { useContext, useState } from 'react'
import { IoTrash } from 'react-icons/io5'
import { IoOptions } from 'react-icons/io5'
import { ImFilesEmpty } from 'react-icons//im'
import { ModalContext } from '../../context/ModalContext'
import { BetsContext } from '../../context/BetsContext'
import { api } from '../../service/api'
import { UserContext } from '../../context/UserContext'
import { CardBets } from '../cardBets'


export function CheckResult() {
    const { openModal } = useContext(ModalContext)

    const { allBets, 
            allBetsSave, 
            removeSomeBet, 
            replaceBetsWithNewOnes,
            cleanAllBets,
            showBetsHistory,
            createAndSaveBets,
            getAllBetsHistory } = useContext(BetsContext)

    const { user } = useContext(UserContext)

    const [ showButtonsDelete, setShowButtonsDelete ] = useState<boolean>(false)
    const [ showSingleButtonDelete, setShowSingleButtonDelete ] = useState<boolean>(false)
    const [ showAllBets, setShowAllBets ] = useState<boolean>(false)
    const [ betRefUpdate, setBetRefUpdate ] = useState<string>('')

    const contentButton = showAllBets ? 'voltar' : 'meus jogos'

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
        if(bet.length === 0) return

        const INITAL_STRING = 0
        const REMOVE_FROM = 3

        const sortBet = sortArray(bet)

        const formatedBet = sortBet.reduce((acc: string, number: number) => {
            acc += `${String(number)} - `
            return acc
        }, '')

        const finalBet = formatedBet.substring(INITAL_STRING, (formatedBet.length - REMOVE_FROM))
        return finalBet
    }

    const transformArrStringToArrNumber = (arr: string) => {
        const stringValue = arr
        const arrNumber = stringValue.split('-').map(str => Number(str.trim()))

        return arrNumber
    }

    const getAllBets = async () => {
        const result = await api.get('bets', {
            params: {
                userId: user.id
            }
        })
    }

    const handleSaveBets = () => {
        createAndSaveBets(allBets, user.id)
        cleanAllBets()
    }

    const handleGetAllBetHistory = () => {
        getAllBetsHistory(user.id)
        setShowAllBets(oldState => !oldState)

    }

    const getBetAndShowOnScreen = (bets: string[], betRef: string) => {
        replaceBetsWithNewOnes(bets)
        setShowAllBets(false)
        setBetRefUpdate(betRef)
    }


    return (
        <div className="flex flex-col w-full h-96 bg-green-100">
            <h3 className="w-full text-center text-xs text-slate-500 border-b py-2 border-slave">confira seus jogos</h3>
            { showButtonsDelete ? 
                (<div className="flex w-96 h-22 mx-auto mt-1 justify-center gap-1">
                    <button className="w-40 p-1 bg-red-400 text-sm text-slate-200 rounded-md" 
                        onClick={openModal}>
                        excluir todos
                    </button>
                    <button className="w-40 p-1 bg-green-400 text-sm rounded-md" 
                        onClick={hiddenButtons}>
                        tudo ok!
                    </button>
                </div>) : 
                <div className="flex w-96 h-22 mx-auto mt-1 items-center justify-between px-3">
                    <div>
                        <span 
                            className="text-sm text-slate-700 font-bold border border-solid border-green-400 p-1 cursor-pointer bg-green-50 rounded-md"
                            onClick={handleGetAllBetHistory}>
                            {contentButton}
                        </span>
                        {  }
                    </div>
                   { !showAllBets && < IoOptions className="text-2xl cursor-pointer" onClick={handleShowButtons}/>} 
                </div> }
            <div className="w-full h-full mx-auto overflow-y-auto py-4">
                <div className="flex w-96 mx-auto flex-col items-center gap-4 py-2 px-12">
                    { showAllBets ? 
                                ( allBetsSave?.map(bet => 
                                        <CardBets
                                            handleBet={getBetAndShowOnScreen}
                                            key={bet.id_bet} 
                                            quantity={bet.my_bets.length}
                                            date={bet.created_at}
                                            bets={bet.my_bets}
                                            id={bet.id_bet}/>))
                                    : (isEmpty ? 
                                    <>
                                        < ImFilesEmpty className="text-3xl text-slate-700"/>
                                        <p className="uppercase text-sm text-slate-700">Sem jogos ainda!</p>
                                    </> : 
                                (allBets.map((bet, index) => 
                        <div key={`${index}-${bet}`} className="flex items-center gap-4">
                            <span className="p-2 bg-slate-50 text-xl font-normal">{formatViewBet(bet)}</span>
                            { showSingleButtonDelete && < IoTrash className="text-2xl cursor-pointer text-red-500" onClick={() => removeSomeBet(bet)}/>}
                        </div>)) )}
                </div>
            </div>
            <div className="grid place-items-center w-full h-24 pb-2">
                { !showAllBets &&
                        (false ? <button 
                            className={`w-80 h-12 bg-green-400 ${isEmpty && 'cursor-not-allowed'} rounded uppercase text-xs text-slate-50`}
                            onClick={handleSaveBets}>
                            salvar jogos
                        </button> : 
                        <button
                            className="w-80 h-12 bg-white border border-green-300 rounded uppercase text-xs text-slate-800"
                            >
                            conferir jogos    
                        </button>)}
            </div>
        </div>
    )
}