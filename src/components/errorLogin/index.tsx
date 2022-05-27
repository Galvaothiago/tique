import { useContext } from 'react'
import { GrFormClose } from 'react-icons/gr'
import { UserContext } from '../../context/UserContext'

export function ErrorLogin({ content }) {
    const { removeErrorMessage } = useContext(UserContext)
    return (
        <div className="w-full flex items-center justify-center relative rounded-md py-2 bg-red-50 border-solid border border-red-200">
            <span className="text-xs text-slate-600 ">{content}</span>
            <GrFormClose 
                className="text-sm text-slate-600 absolute right-1 cursor-pointer"
                onClick={removeErrorMessage}/>
        </div>
    )
}