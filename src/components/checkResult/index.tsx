import { useContext, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { IoOptions } from 'react-icons/io5'
import { ModalContext } from '../../context/ModalContext'

export function CheckResult() {
    const { openModal } = useContext(ModalContext)

    const [ showButtonsDelete, setShowButtonsDelete ] = useState<boolean>(false)
    const [ showSingleButtonDelete, setShowSingleButtonDelete ] = useState<boolean>(false)

    const TIME_CLOSE_AUTOMATICALLY = 60 * 1000 //1 minute

    const hadleShowButtons = () => {
        setShowButtonsDelete(true)

        setTimeout(() => {
            setShowButtonsDelete(false)
            setShowSingleButtonDelete(false)
        }, TIME_CLOSE_AUTOMATICALLY)
    }

    const fakeFinalBets = [
        ['2', '11', '20', '33', '42', '53'],
        ['2', '11', '20', '33', '42', '53'],
        ['2', '11', '20', '33', '42', '53'],
        ['2', '11', '20', '33', '42', '53'],
        ['2', '11', '20', '33', '42', '53'],
        ['2', '11', '20', '33', '42', '53'],
        ['2', '11', '20', '33', '42', '53'],
        ['2', '11', '20', '33', '42', '53'],
        ['2', '11', '20', '33', '42', '53'],
        ['2', '11', '20', '33', '42', '53'],
        ['2', '11', '20', '33', '42', '53'],
        ['2', '11', '20', '33', '42', '53'],
        ['2', '11', '20', '33', '42', '53'],
        ['2', '11', '20', '33', '42', '53'],
        ['2', '11', '20', '33', '42', '53'],
        ['2', '11', '20', '33', '42', '53'],
        ['2', '11', '20', '33', '42', '53'],
        ['2', '11', '20', '33', '42', '53']
        
    ]

    const formatViewBet = (bet: string[]) => {
        if(bet.length === 0) return

        const INITAL_STRING = 0
        const REMOVE_FROM = 3
        
        const formatedBet = bet.reduce((acc, number) => {
            acc += `${number} - `
            return acc
        }, '')

        const finalBet = formatedBet.substring(INITAL_STRING, (formatedBet.length - REMOVE_FROM))
        return finalBet
    }

    return (
        <div className="flex flex-col w-full h-96 bg-green-100">
            <h3 className="w-full text-center text-xs text-slate-500 border-b py-2 border-slave">confira seus jogos</h3>
            { showButtonsDelete ? 
                ( !showSingleButtonDelete ? <div className="flex justify-center gap-2 w-full pb-2">
                    <button className="w-44 p-2 bg-red-400 text-slate-200 rounded-md" onClick={openModal}>excluir todos</button>
                    <button className="w-44 p-2 bg-red-300 rounded-md" onClick={() => setShowSingleButtonDelete(true)}>excluir alguns</button>
                </div> : <div className="flex justify-center items-center pb-2"><button className="w-44 p-2 bg-green-400 rounded-md">tudo ok?</button></div>) : 
                <div className="flex w-96 h-12 mx-auto items-center justify-end pr-3">
                    < IoOptions className="text-2xl cursor-pointer" onClick={hadleShowButtons}/>
                </div>}
            <div className="w-full h-full overflow-y-auto p-8">
                <div className="flex flex-col items-center gap-3 w-full h-auto py-2">
                    { fakeFinalBets.map((bet, index) => 
                        <div key={`${index}-${bet}`} className="flex items-center gap-4">
                            <span className="p-2 bg-slate-50 text-xl font-normal">{formatViewBet(bet)}</span>
                            { showSingleButtonDelete && < IoClose className="text-4xl cursor-pointer text-red-500" onClick={hadleShowButtons}/>}
                        </div>) }
                </div>
            </div>
            <div className="grid place-items-center w-full h-24 pb-2">
                <button className="w-80 h-12 bg-green-400 rounded uppercase text-xs text-slate-50">conferir jogos</button>
            </div>
        </div>
    )
}