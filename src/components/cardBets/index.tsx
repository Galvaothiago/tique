import { getFormatDateResult } from "../../utils/formatDate";
import { CloverEffect } from "../cloverEffect";

interface CardBetsProps {
    quantity: number,
    date?: string
}

export function CardBets({ quantity, date }: CardBetsProps) {
    const formatDate = getFormatDateResult(date)

    const oneBet = quantity === 1
    const pluralOrSingularPhrase = oneBet ? 'aposta' : 'apostas' 
    return (
        <div className="max-w-sm w-full h-16 flex items-center justify-between bg-gradient-to-l from-slate-100 to-green-300 pl-6 pr-2 rounded-l-full cursor-pointer">
            <p className="text-slate-700 text-md font-bold">{`#${formatDate}`}</p>
            <span className="flex items-center gap-1">
                <p className="w-16 text-center leading-none font-bold text-sm break-word">{`${quantity} ${pluralOrSingularPhrase}`}</p>
                <CloverEffect animation={false} size="small"/>
            </span>
        </div>
    )
}