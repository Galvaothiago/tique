import { AiOutlineEdit } from 'react-icons/ai'

export function BetResult() {
    const fakeResult = ['2', '11', '20', '33', '42', '53']

    return (
        <section className="w-full h-52 bg-slate-100" >
            <h3 className="w-full text-center text-xs text-slate-500 border-b py-2 border-slave">resultado</h3>
            <div className="flex justify-center items-center gap-1 pt-6">
               { fakeResult.map( (number, index) => 
                <span key={`${index}-${number}`} className="grid place-items-center text-white text-3xl font-bold w-14 h-20 rounded-lg bg-green-300" >{number}</span>) }
            </div>
            <div className="flex justify-between items-center mx-auto w-96 px-4 pt-8">
                <div className="flex items-center gap-1 text-xs font-bold uppercase cursor-pointer">
                    editar
                    <AiOutlineEdit />
                </div>
                <span className="text-xs font-bold">14/04/2022</span>    
            </div>
        </section>
    )
}