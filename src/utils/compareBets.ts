export interface MatchResultProps {
  match: number
  value: number[][]
}

export const compareBets = (
  arrToCompare: number[][],
  resultModel: number[]
): MatchResultProps[] => {
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

export const mappingAllBets = (
  arrToCompare: number[][],
  resultModel: number[]
) => {
  let zeroMatch = 0
  let oneMatch = 0
  let twoMatches = 0
  let threeMatches = 0
  let fourMatches = 0
  let fiveMatches = 0
  let sixMatches = 0

  const iterator = arrToCompare.length
  let accumulatorMatches = 0

  for (let i = 0; i < iterator; i++) {
    const bets: number[] = arrToCompare[i]

    resultModel.map((number) => {
      const match = bets.includes(number)

      if (match) {
        accumulatorMatches++
      }
    })

    switch (accumulatorMatches) {
      case 0:
        zeroMatch++
        break
      case 1:
        oneMatch++
        break
      case 2:
        twoMatches++
        break
      case 3:
        threeMatches++
        break
      case 4:
        fourMatches++
        break
      case 5:
        fiveMatches++
        break
      case 6:
        sixMatches++
        break
    }

    accumulatorMatches = 0
  }

  const data = [
    {
      match: 0,
      value: zeroMatch,
    },
    {
      match: 1,
      value: oneMatch,
    },
    {
      match: 2,
      value: twoMatches,
    },
    {
      match: 3,
      value: threeMatches,
    },
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
