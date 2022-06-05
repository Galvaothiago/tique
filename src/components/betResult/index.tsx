import { useContext, useEffect, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { UserContext } from '../../context/UserContext'
import { api } from '../../service/api'
import { validateNumbers } from '../../utils/validateNumbers'

export function BetResult() {
    const [ resultToVerify, setResultToVerify ] = useState<number[]>([2, 11, 20, 33, 42, 53])
    const [ newDate, setNewDate ] = useState<string>('14/05/2022')

    const  quantityNumbersAllowed = 6

    const { user } = useContext(UserContext)

    const getFormatDateResult = (date: string) => {
        const firstDate = date.split('T')
        
        const partsDate = firstDate[0].split('-')

        return `${partsDate[2]}/${partsDate[1]}/${partsDate[0]}`
    }

    const transformArray = (arr: string) => {
        const newArr = arr.split('-')

        const arrNumber = newArr.map(number => Number(number))
        return arrNumber
    }

    const createNewResult = async () => {
        const newResult = prompt("insira os números separados por vírgula. Ex: 3,23,44,54,58,60")

        if(!!newResult) {

            const arrayResult = newResult?.split(',')
            const finalResult = arrayResult?.map(number => Number(number))
            
            const resultToSave = finalResult.map(number => String(number)).join(' - ')
            const isValidBet = validateNumbers(finalResult, quantityNumbersAllowed)
    
            if(isValidBet) {
                setResultToVerify(finalResult)
                
                await api.put('/bets', {
                    params: {
                        userId: user.id
                    },
                    body: {
                        bet_result :{
                            result: resultToSave
                        } 
                    }
                })
            }
        }
    }


    useEffect(() => {
        const getResult = async() => {
            const result = await api.get('/bets', {
                params: {
                    userId: user.id
                }
            })

            const dataResult = transformArray(result.data.data.bet_result.result) 
            
            setResultToVerify(dataResult)
            setNewDate(getFormatDateResult(result.data.data.bet_result.date))
        }

        getResult()
        
    }, [])

    return (
        <section className="w-full h-52 bg-slate-100" >
            <h3 className="w-full text-center text-xs text-slate-500 border-b py-2 border-slave">resultado</h3>
            <div className="flex justify-center items-center gap-1 pt-6">
               { resultToVerify.map( (number, index) => 
                <span key={`${index}-${number}`} className="grid place-items-center text-white text-3xl font-bold w-14 h-20 rounded-lg bg-green-300 drop-shadow-xl" >{number}</span>) }
            </div>
            <div className="flex justify-between items-center mx-auto w-96 px-4 pt-8">
                <div 
                    onClick={() => {createNewResult()}}
                    className="flex items-center gap-1 text-xs font-bold uppercase cursor-pointer"
                >
                    editar
                    <AiOutlineEdit />
                </div>
                <div>
                    <span className="text-xs font-bold">{newDate}</span>    
                </div>
            </div>
        </section>
    )
}