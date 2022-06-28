import { createContext, ReactNode, useState } from "react"
import { ModalAction } from "../components/modalAction"
import { ModalDelete } from "../components/modalDelete"

interface ModalProps {
  openModal: () => void
  closeModal: () => void
  openModalAndCloseAutomatically: (message: string, type: string) => void
}

interface ChildrenProp {
  children: ReactNode
}

export const ModalContext = createContext({} as ModalProps)

export function ModalProvide({ children }: ChildrenProp) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenModalAction, setIsOpenModalAction] = useState<boolean>(false)
  const [messageModal, setMessageModal] = useState<string>("")
  const [typeModal, setTypeModal] = useState<string>("")

  const TIME_TO_CLOSE = 2000 // 2 seconds

  const openModal = () => {
    setIsOpenModal(true)
  }

  const closeModal = () => {
    setIsOpenModal(false)
  }
  const openModalAndCloseAutomatically = (message: string, type: string) => {
    setMessageModal(message)
    setTypeModal(type)
    setIsOpenModalAction(true)

    setTimeout(() => {
      setIsOpenModalAction(false)
      setMessageModal("")
    }, TIME_TO_CLOSE)
  }

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        openModalAndCloseAutomatically,
      }}
    >
      {children}
      {isOpenModal && <ModalDelete />}
      {isOpenModalAction && (
        <ModalAction message={messageModal} type={typeModal} />
      )}
    </ModalContext.Provider>
  )
}
