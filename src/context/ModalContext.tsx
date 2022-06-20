import { createContext, ReactNode, useState } from "react";
import { ModalAction } from "../components/modalAction";
import { ModalDelete } from "../components/modalDelete";

interface ModalProps {
    openModal: () => void,
    closeModal: () => void,
    openModalWithMessage: (content: string) => void
}

interface ChildrenProp {
    children: ReactNode
}

export const ModalContext = createContext({} as ModalProps)

export function ModalProvide({ children }: ChildrenProp) {
    const [ isOpenModal, setIsOpenModal ] = useState<boolean>(false)
    const [ isOpenModalAction, setIsOpenModalAction ] = useState<boolean>(false)
    const [ messageModal, setMessageModal ] = useState<string>('')

    const openModal = () => {
        setIsOpenModal(true)
    }

    const closeModal = () => {
        setIsOpenModal(false)
    }

    const openModalWithMessage = (content: string) => {
        setIsOpenModalAction(true)

        setMessageModal(content)
        setTimeout(() => {
            setIsOpenModalAction(false)
            setMessageModal("")
        }, 2000)
    }
    return (
        <ModalContext.Provider
            value={{
                openModal,
                closeModal,
                openModalWithMessage
            }}
        >
            { children }
            { isOpenModal && <ModalDelete /> }
            { isOpenModalAction && <ModalAction message={messageModal} /> }
        </ModalContext.Provider>
    )
}