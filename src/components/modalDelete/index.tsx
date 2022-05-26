import { useContext } from "react"
import { BetsContext } from "../../context/BetsContext"
import { ModalContext } from "../../context/ModalContext"

export function ModalDelete() {
    const { closeModal } = useContext(ModalContext)
    const { cleanAllBets } = useContext(BetsContext)

    const handleDeleteAllBets = () => {
        cleanAllBets()
        closeModal()
    }
    return (
        <div className="flex justify-center items-center w-full h-screen bg-white/60 inset-0 fixed">
            <div className="flex flex-col items-center justify-between max-w-xs w-full h-64 bg-white pb-2 pt-6 px-2">
                <p className="text-center text-lg font-bold">Tem certeza que deseja excluir todos os seus jogos?</p>
                <div className="flex gap-1 w-full h-auto">
                    <button className="w-full h-16 rounded-md bg-red-500 text-white uppercase font-bold"
                        onClick={handleDeleteAllBets}>
                        excluir
                    </button>
                    <button className="w-full h-16 rounded-md bg-green-50 uppercase font-bold"
                        onClick={closeModal}>
                        cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}