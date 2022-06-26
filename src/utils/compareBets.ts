export interface MatchResultProps {
  match: number
  value: number[][]
}

export const compareBets = (
  arrToCompare: number[][],
  resultModel: number[]
): MatchResultProps[] => {
  console.time("#1")
  const fourMatches: number[][] = []
  const fiveMatches: number[][] = []
  const sixMatches: number[][] = []

  let minimumToWinMoney = 3
  let accumulatorMatches = 0

  if (!arrToCompare) return

  const iterator = arrToCompare.length

  for (let i = 0; i < iterator; i++) {
    const bets: number[] = arrToCompare[i]

    resultModel.map((number) => {
      const match = bets.includes(number)

      if (match) {
        accumulatorMatches++
      }
    })

    if (accumulatorMatches > minimumToWinMoney) {
      switch (accumulatorMatches) {
        case 4:
          fourMatches.push(bets)
          break
        case 5:
          fiveMatches.push(bets)
          break
        case 6:
          sixMatches.push(bets)
          break
      }
    }

    accumulatorMatches = 0
  }

  const data = [
    {
      match: 4,
      value: fourMatches,
    },
    {
      match: 5,
      value: fiveMatches,
    },
    {
      match: 6,
      value: sixMatches,
    },
  ]

  return data
}
