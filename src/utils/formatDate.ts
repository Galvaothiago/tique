export const getFormatDateResult = (date: string) => {
    const firstDate = date.split('T')
    
    const partsDate = firstDate[0].split('-')

    return `${partsDate[2]}/${partsDate[1]}/${partsDate[0]}`
}