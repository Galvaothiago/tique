const validateNumbers = (bets: number[], quantityNumbersAllowed: number) => {
    const validateLength = bets?.length < quantityNumbersAllowed || bets?.length > quantityNumbersAllowed
    if(validateLength) {
        alert('sua aposta precisa ter 6 números')
        return false
    }
    
    const removeDuplicateNumbers = new Set(bets)
    const hasDuplicateNumbers = removeDuplicateNumbers.size < quantityNumbersAllowed
    let hasInvalidNumber = false

    bets?.forEach(number => {
        if(number > 60 || number < 0 || (number % 2 != 0 && number % 2 != 1)) {
            hasInvalidNumber = true
        } 
    })

    if(!hasInvalidNumber && !hasDuplicateNumbers) {
        return true  
    } 
    
    alert('existem numeros repitidos ou invalidos, verifique e tente novamente')
    return false
}

export { validateNumbers }