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
        totalMines: 60,
        totalRows: 20,
        totalCols: 20,
    },
    {
        totalMines: 300,
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
    layMines = (difficulty: number, startingPoint: string): void => {
        const { totalCols, totalMines, totalRows } = difficulties[difficulty]
        while (this.mineFields.length < totalMines) {
            const mineId: string = `${Math.round(Math.random() * (totalRows - 1))}${Math.round(Math.random() * (totalCols - 1))}`
            console.log('(mineState) laid mine ', mineId)
            if (mineId !== startingPoint) this.mineFields.push(mineId)
            this.mineFields = this.mineFields.filter((id, index) => index === this.mineFields.indexOf(id))
        }
    }
}

export default mineState