import React, { useState, FC, ReactElement } from 'react';

const EASY = {
    title: 'Fácil',
    totalMines: (Math.random() * (5) + 8),
    totalRows: 5,
    totalCols: 8,
}
const MEDIUM = {
    title: 'Mediana',
    totalMines: (Math.random() * (5) + 8),
    totalRows: 5,
    totalCols: 8,
}
const HARD = {
    title: 'Difícil',
    totalMines: (Math.random() * (5) + 8),
    totalRows: 5,
    totalCols: 8,
}


const MineSweeper: FC = (): ReactElement => {
    const [difficulty, setDifficulty] = useState(EASY)

    return (
        <main className="">
            <header className="text-center w-full">
                <h1>
                    Buscaminas
        </h1>
                <p>Por <b>Bruno Moraless</b></p>
                <label>
                    <p>
                        Dificultad:
          </p>
                    <div>
                        <button onClick={() => { setDifficulty(EASY) }}>Fácil</button>
                        <button onClick={() => { setDifficulty(MEDIUM) }}>Media</button>
                        <button onClick={() => { setDifficulty(HARD) }}>Difícil</button>
                    </div>
                </label>
                <Game config={difficulty} />
            </header>
        </main>
    );
}
interface gameProps {
    config: {
        totalRows: number,
        totalCols: number,
        totalMines: number
    }
}

interface mineProps {
    id: string
}

const Game: FC<gameProps> = (
    { config }
): ReactElement => {
    const { totalCols, totalRows, totalMines } = config
    const [gameState, setGameState] = useState<{}>()



    const Mine: FC<mineProps> = ({ id }): ReactElement => {
        const [mineState, setMineState] = useState()
        if (gameState) {


        } else {

        }
        return (
            <button onClick={() => { }} >
                {mineState}
            </button>
        )
    }
    return (
        <div>
            {
                [...Array(totalRows)].map((row, colIndex) =>
                    <div key={colIndex}>
                        {
                            [...Array(totalCols)].map((column, mineIndex) => {
                                const mineId = `${colIndex}${mineIndex}`
                                return <Mine id={mineId} key={`${colIndex}${mineIndex}`} />
                            }
                            )
                        }
                    </div>
                )
            }

        </div>
    )
}


const getMineFieldLayout = (cols: number, rows: number, totalMines: number, startingPoint: string): string[] => {
    let mineField: string[] = []
    while (mineField.length < totalMines) {
        const mineId: string = `${Math.round(Math.random() * cols)}${Math.round(Math.random() * rows)}`
        mineId !== startingPoint && mineField.push(
            mineId
        )
        mineField = mineField.filter((id, index) => index === mineField.indexOf(id))
    }
    return mineField
}




export default MineSweeper;
