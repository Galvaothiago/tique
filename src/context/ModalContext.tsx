import { createContext, ReactNode, useState } from "react";
import { ModalDelete } from "../components/modalDelete";

interface ModalProps {
    openModal: () => void,
    closeModal: () => void
}

interface ChildrenProp {
    children: ReactNode
}

export const ModalContext = createContext({} as ModalProps)

export function ModalProvide({ children }: ChildrenProp) {
    const [ isOpenModal, setIsOpenModal ] = useState<boolean>(false)

    const openModal = () => {
        setIsOpenModal(true)
    }

    const closeModal = () => {
        setIsOpenModal(false)
    }
    return (
        <ModalContext.Provider
            value={{
                openModal,
                closeModal
            }}
        >
            { children }
            { isOpenModal && <ModalDelete /> }
        </ModalContext.Provider>
    )
}