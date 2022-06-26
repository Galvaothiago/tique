import { useEffect, useState } from "react"
import { IoClose } from "react-icons/io5"
import { MatchResultProps } from "../../utils/compareBets"

interface ModalBetResultProps {
  data: MatchResultProps[]
  closeModal: () => void
}

export function ModalBetResult({ data, closeModal }: ModalBetResultProps) {
  const [dataBet, setDataBet] = useState<MatchResultProps[] | null>(null)
  const isEmpty = dataBet?.length === 0

  const removeDataEmpty = () => {
    const dataFiltered = data?.filter((item) => item.value.length !== 0)

    if (!dataFiltered) {
      setDataBet(null)
      return
    }

    setDataBet(dataFiltered)
  }

  const sortArray = (arr: number[]) => {
    const arrToSort: number[] = arr

    return arrToSort.sort((a: number, b: number) => a - b)
  }

  const formatViewBet = (bet: number[]) => {
    if (bet.length === 0) return

    const INITAL_STRING = 0
    const REMOVE_FROM = 3

    const sortBet = sortArray(bet)

    const formatedBet = sortBet.reduce((acc: string, number: number) => {
      acc += `${String(number)} - `
      return acc
    }, "")

    const finalBet = formatedBet.substring(
      INITAL_STRING,
      formatedBet.length - REMOVE_FROM
    )
    return finalBet
  }

  useEffect(() => {
    removeDataEmpty()
  }, [])

  return (
    <div className="flex justify-center items-center w-full h-screen bg-slate-500/20 inset-0 p-2 fixed">
      <div className=" w-full md:h-auto h-full max-w-lg bg-white">
        <div className="flex justify-between items-center p-5 border-b bg-emerald-300">
          <h3 className="text-xl font-medium text-gray-600">Resultado</h3>
          <button
            type="button"
            className="text-slate-500 bg-transparent hover:bg-emerald-100 hover:text-gray-900 rounded-lg text-2xl p-1.5 ml-auto inline-flex items-center"
            onClick={closeModal}
          >
            <IoClose />
          </button>
        </div>
        <div className="w-full h-auto">
          {isEmpty ? (
            <div className="w-full h-80 flex flex-col items-center justify-center gap-2">
              <span>Nenhum acerto &#128533;</span>
              <button className="p-3 bg-emerald-300 text-xs mt-1 rounded-md text-slate-700">
                histórico completo
              </button>
            </div>
          ) : (
            <>
              <div className="w-full h-full  px-14 py-8 flex flex-col items-center justify-center gap-4">
                {dataBet?.map((data) => (
                  <div className="w-full h-28 bg-white flex shadow-lg">
                    <span className="w-20 h-full flex flex-col justify-center items-center gap-1 bg-emerald-50">
                      <p className="text-5xl font-medium">{data.match}</p>
                      <p className="text-xs">números</p>
                    </span>
                    <div className="w-full h-full flex flex-col items-center justify-center gap-1 p-2 overflow-y-auto">
                      {data.value.map((data) => (
                        <span className="p-2 bg-emerald-50 text-xl font-normal">
                          {formatViewBet(data)}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full py-2 mt-4 pr-8 text-right text-sm">
                <button className="p-3 bg-emerald-300 text-xs mt-1 rounded-md text-slate-700">
                  histórico completo
                </button>
              </div>
            </>
          )}
        </div>
        <div className="w-full h-12 p-4 text-sm bg-emerald-50">
          {!isEmpty && (
            <span>Parabéns, seu jogo foi premiado! &#127881; &#128184;</span>
          )}
        </div>
      </div>
    </div>
  )
}
