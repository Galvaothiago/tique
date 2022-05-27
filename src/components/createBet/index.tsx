import { IoClose } from 'react-icons/io5'
import { GiClover } from 'react-icons/gi'
import { AiOutlineCheck } from 'react-icons/ai'
import { useContext, useState } from 'react'

import { generateSixNumbers } from '../../utils/generateBet'
import { Warnning } from '../warnning'
import { BetsContext } from '../../context/BetsContext'
import { validateNumbers } from '../../utils/validateNumbers'
import { CloverEffect } from '../cloverEffect'

export function CreateBet() {
    const { insertBet } = useContext(BetsContext)

    const [ numbersBet, setNumbersBet ] = useState<number[]>([])
    const [ changeButtons, setChangeButtons ] = useState<boolean>(false)
    const [ showMessage, setShowMessage ] = useState<boolean>(false)
    const [ message, setMessage ] = useState<string>('')

    const showClover = numbersBet.length === 0

    const quantityNumbersAllowed = 6
    const TIME_HIDDEN = 2000

    const handleWarnningAutomatically = (message: string) => {
        setShowMessage(true)
        setMessage(message)

        setTimeout(() => {
            setShowMessage(false)
        }, TIME_HIDDEN)
    }

    const createNewBet = () => {
        setNumbersBet([])
        
        const bet = prompt('insira os números separados por vírgula. Ex: 3,23,44,54,58,60')
        
        const arrayBet = bet?.split(',')
        const finalBet = arrayBet?.map(number => Number(number))
        
        const isValidBet = validateNumbers(finalBet, quantityNumbersAllowed)
        if(isValidBet) {
            setNumbersBet(finalBet)
            setChangeButtons(true)
        }

    }

    const createBetAutomatically = () => {
        setNumbersBet([])

        const randomSixNumbers = generateSixNumbers

        setNumbersBet(randomSixNumbers)
        setChangeButtons(true)
    }

    const removeBet = () => {
        setNumbersBet([])
        setChangeButtons(false)
   
        handleWarnningAutomatically('jogo descartado!')
    }

    const addBet = () => {
        insertBet(numbersBet)
        setNumbersBet([])
        setChangeButtons(false)
        
        handleWarnningAutomatically('jogo criado com sucesso!')
    } 
    
    return (
        <section className="w-full h-60 bg-green-300">
            <h3 className="w-full text-center text-xs text-slate-500 border-b py-2 border-slave" >crie seus jogos</h3>
            <div className="flex justify-center items-center w-full h-16">
                <div className="flex items-center justify-center gap-3 mt-4">
                    {showMessage ? 
                        <Warnning content={message}/> : 
                        (showClover ? <CloverEffect size="medium"/> : numbersBet.map((number, i) => 
                    <span key={`${i}-${number}`} className="grid place-items-center w-12 h-12 font-medium bg-green-100 rounded-full text-xl">{number}</span>))}
                </div>
            </div>
            { !changeButtons ? <div className="flex items-end justify-center gap-1 pb-1 w-full h-36">
                <button className="w-44 h-14 text-xs bg-green-100 text-center uppercase cursor-pointer" onClick={createBetAutomatically}>
                    gerar automaticamente
                </button>
                <button className="w-44 h-14 text-xs bg-green-100 text-center uppercase cursor-pointer" onClick={createNewBet}>
                    criar novo jogo
                </button>
            </div> :
                <div className="flex items-end justify-center gap-1 pb-1 w-full h-36">
                    <button className="grid place-items-center w-44 h-14  bg-green-100 text-4xl text-red-400 cursor-pointer" onClick={removeBet}>
                        < IoClose />
                    </button>
                    <button className="grid place-items-center w-44 h-14 bg-green-100 text-3xl text-green-400 cursor-pointer" onClick={addBet}>
                        < AiOutlineCheck />
                    </button>
                </div> }
        </section>
    )
}