import { useContext } from "react"
import { BetsContext } from "../../context/BetsContext"

import { api } from "../../service/api"

interface ModalDeleteProps {
  info?: {
    id: string
    userId: string
  }
  type: string
}

export function ModalDelete({ info, type }: ModalDeleteProps) {
  const { handleDeleteBet, handleCloseModalDelete, updateListAllBetsHistory, cleanAllBets, openModalAndCloseAutomatically } =
    useContext(BetsContext)

  const excuteDeletion = () => {
    if (type === "deleteGroupBets") {
      handleCloseModalDelete()
      handleDeleteBet(info.id, info.userId)

      openModalAndCloseAutomatically("Aposta excluída", "success")
      updateListAllBetsHistory(info.id)
    } else {
      handleCloseModalDelete()
      cleanAllBets()
    }
  }

  const cancelPermission = () => {
    handleCloseModalDelete()
  }
  return (
    <div className="flex justify-center items-center w-full h-screen bg-slate-500/30 inset-0 px-6 fixed">
      <div className="flex flex-col items-center justify-between max-w-md w-full h-72 bg-slate-50 pb-2 pt-6 px-4">
        <p className="text-center text-lg font-bold">Tem certeza que deseja excluir todos os seus jogos?</p>
        <div className="flex gap-1 w-full h-auto">
          <button className="w-full h-16 rounded-md bg-red-500 text-white uppercase font-bold" onClick={excuteDeletion}>
            excluir
          </button>
          <button className="w-full h-16 rounded-md bg-green-50 uppercase font-bold" onClick={cancelPermission}>
            cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
