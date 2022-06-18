interface ModalActionProp {
    message: string
}

export function ModalAction({message}: ModalActionProp) {
    return (
        <div className="flex justify-center items-end  w-full h-screen bg-white/60 inset-0 pb-28 fixed">
            <span className="animate-appear px-8 py-4 text-slate-100 bg-green-600 ">{message}</span>
        </div>
    )
}