import { useContext, useState } from 'react'
import { IoTrash } from 'react-icons/io5'
import { IoOptions } from 'react-icons/io5'
import { ImFilesEmpty } from 'react-icons//im'
import { ModalContext } from '../../context/ModalContext'
import { BetsContext } from '../../context/BetsContext'

export function CheckResult() {
    const { openModal } = useContext(ModalContext)
    const { allBets, removeSomeBet } = useContext(BetsContext)

    const [ showButtonsDelete, setShowButtonsDelete ] = useState<boolean>(false)
    const [ showSingleButtonDelete, setShowSingleButtonDelete ] = useState<boolean>(false)

    const isEmpty = allBets.length === 0
    const TIME_CLOSE_AUTOMATICALLY = 60 * 1000 * 3 //3 minutes

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
        const arrToSort: number[] | any = arr[0]

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

    return (
        <div className="flex flex-col w-full h-96 bg-green-100">
            <h3 className="w-full text-center text-xs text-slate-500 border-b py-2 border-slave">confira seus jogos</h3>
            { showButtonsDelete ? 
                (<div className="flex justify-center gap-2 w-full pb-2">
                    <button className="w-44 p-2 bg-red-400 text-slate-200 rounded-md" 
                        onClick={openModal}>
                        excluir todos
                    </button>
                    <button className="w-44 p-2 bg-green-400 rounded-md" 
                        onClick={hiddenButtons}>
                        tudo ok?
                    </button>
                </div>) : 
                <div className="flex w-96 h-22 mx-auto items-center justify-end pr-3">
                   { !isEmpty && < IoOptions className="text-2xl cursor-pointer" onClick={handleShowButtons}/> }
                </div> }
            <div className="w-full h-full overflow-y-auto p-8">
                <div className="flex flex-col items-center gap-3 w-full h-auto py-2">
                    { isEmpty ? <div className="flex flex-col gap-2 items-center justify-center w-72 h-32">
                                    < ImFilesEmpty className="text-3xl text-slate-700"/>
                                    <p className="uppercase text-sm text-slate-700">Sem jogos ainda!</p>
                                </div>  : (allBets.map((bet, index) => 
                        <div key={`${index}-${bet}`} className="flex items-center gap-4">
                            <span className="p-2 bg-slate-50 text-xl font-normal">{formatViewBet(bet)}</span>
                            { showSingleButtonDelete && < IoTrash className="text-2xl cursor-pointer text-red-500" onClick={() => removeSomeBet(bet)}/>}
                        </div>)) }
                </div>
            </div>
            <div className="grid place-items-center w-full h-24 pb-2">
                <button className="w-80 h-12 bg-green-400 rounded uppercase text-xs text-slate-50">conferir jogos</button>
            </div>
        </div>
    )
}