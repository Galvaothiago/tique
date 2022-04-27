interface WarnningProp {
    content: string
}

export function Warnning({ content }: WarnningProp) {
    return (
        <div className="bg-green-100 border border-green-700 text-green-700 px-4 py-3" role="alert">
            <p className="text-sm">{ content }</p>
        </div>
    )
}