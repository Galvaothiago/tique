import { GiClover } from 'react-icons/gi'

interface CloverProps {
    animation?: boolean,
    size: 'small' | 'medium' | 'large'
}

export function CloverEffect({animation = true, size}: CloverProps) {
    let newSize = ''

    switch(size) {
        case 'small':
            newSize = 'text-xl'
            break
        case 'medium':
            newSize = 'text-5xl'
            break
        case 'large':
            newSize = 'text-9xl'
            break
        default:
            newSize = 'text-5xl'
            break
    }

    return (
        <GiClover className={`${animation && 'animate-bounce'} ${newSize} text-green-500 drop-shadow-lg`} />
    )
}