interface gameConfig {
    totalMines: number
    totalRows: number
    totalCols: number
}
const difficulties: gameConfig[] = [
    {
        totalMines: 10,
        totalRows: 10,
        totalCols: 10,
    },
    {
        totalMines: 200,
        totalRows: 20,
        totalCols: 20,
    },
    {
        totalMines: 1000,
        totalRows: 30,
        totalCols: 50,
    }
]

class mineState {
    layout: gameConfig
    mineFields: string[] = []
    clearedFields: string[] = []
    constructor(difficulty: number) {
        this.layout = difficulties[difficulty]
    }
    layMines = (startingPoint: string): void => {
        const { totalCols, totalMines, totalRows } = this.layout
        while (this.mineFields.length < totalMines) {
            const mineId: string = `${Math.round(Math.random() * (totalRows - 1))}${Math.round(Math.random() * (totalCols - 1))}`
            if (mineId !== startingPoint) this.mineFields.push(mineId)
            this.mineFields = this.mineFields.filter((id, index) => index === this.mineFields.indexOf(id))
        }
    }
}

const gameState = new mineState(0)

export const getState = () => gameState

export const clickField = (fieldId: string): string => {
    if (gameState.mineFields.length === 0) {
        gameState.layMines(fieldId)
    }

    if (gameState.mineFields.includes(fieldId)) {
        return 'B'
    } else {
        //return revealMines(clickedMineId)
    }

    gameState.clearedFields.push(fieldId)

    const surroundingMines = revealMines(fieldId)

    return surroundingMines === 0 ? '' : surroundingMines.toString()
}

const revealMines = (mineId: string): number => {
    let mineCount = 0
    const surroundingFields = getSurroundingFields(mineId)
    surroundingFields.map((fieldId) => {
        gameState.mineFields.includes(fieldId) && mineCount++
    })
    if (mineCount === 0) {
        surroundingFields.map(surroundingFieldId => {
            if (!gameState.clearedFields.includes(mineId) &&
                !gameState.mineFields.includes(mineId)) {
                clickField(surroundingFieldId)
            }
        }
        )
    }

    return mineCount
}

const getSurroundingFields = (mineId: string): string[] => {
    const row: number = Number(mineId.substr(0, mineId.length / 2))
    const col: number = Number(mineId.substr(mineId.length / 2, mineId.length))
    let surroundingFields: string[] = []
    for (let rowMod = -1; rowMod <= 1; rowMod++) {
        for (let colMod = -1; colMod <= 1; colMod++) {
            const fieldRow = row + rowMod
            const fieldCol = col + colMod
            if (
                fieldRow >= 0 &&
                fieldRow < gameState.layout.totalRows &&
                fieldCol >= 0 &&
                fieldCol < gameState.layout.totalCols &&
                `${fieldRow}${fieldCol}` !== mineId
            ) {
                surroundingFields.push(`${fieldRow}${fieldCol}`)
            }
        }
    }
    return surroundingFields
}