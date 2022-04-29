import { IoClose } from 'react-icons/io5'
import { GiClover } from 'react-icons/gi'
import { AiOutlineCheck } from 'react-icons/ai'
import { useState } from 'react'

import { generateSixNumbers } from '../../utils/generateBet'
import { Warnning } from '../warnning'

export function CreateBet() {
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
    
    const validateNumbers = (bets: number[]) => {
        const validateLength = bets?.length < quantityNumbersAllowed || bets?.length > quantityNumbersAllowed
        if(validateLength) {
            alert('sua aposta precisa ter 6 números')
            return false
        }
        
        const removeDuplicateNumbers = new Set(bets)
        const hasDuplicateNumbers = removeDuplicateNumbers.size < quantityNumbersAllowed
        let hasInvalidNumber = false

        bets?.forEach(number => {
            if(number > 60 || number < 0 || (number % 2 != 0 && number % 2 != 1)) {
                hasInvalidNumber = true
            } 
        })

        if(!hasInvalidNumber && !hasDuplicateNumbers) {
            return true  
        } 
        
        alert('existem numeros repitidos ou invalidos, verifique e tente novamente')
        return false
    }

    const createNewBet = () => {
        setNumbersBet([])
        
        const bet = prompt('insira os números separados por vírgula. Ex: 3,23,44,54,58,60')
        
        const arrayBet = bet?.split(',')
        const finalBet = arrayBet?.map(number => Number(number))
        
        const isValidBet = validateNumbers(finalBet)
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
        console.log('added bet')
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
                        (showClover ? <GiClover className="animate-bounce text-5xl text-green-500 drop-shadow-lg" /> : numbersBet.map((number, i) => 
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